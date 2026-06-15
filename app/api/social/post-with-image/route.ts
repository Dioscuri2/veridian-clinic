import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { getLinkedInTokens } from "@/lib/socialPost";

async function uploadImageToLinkedIn(
  token: string,
  personUrn: string,
  imageBuffer: Buffer,
  mimeType: string
): Promise<string> {
  // Step 1: Register the upload
  const registerRes = await fetch("https://api.linkedin.com/v2/assets?action=registerUpload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: personUrn,
        serviceRelationships: [{ relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" }],
      },
    }),
  });

  if (!registerRes.ok) {
    const err = await registerRes.text();
    throw new Error(`LinkedIn register upload failed: ${err}`);
  }

  const registerData = await registerRes.json();
  const assetUrn: string = registerData.value.asset;
  const uploadUrl: string =
    registerData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;

  // Step 2: Upload the binary
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: imageBuffer,
  });

  if (!uploadRes.ok) {
    throw new Error(`LinkedIn image upload failed: ${uploadRes.status}`);
  }

  return assetUrn;
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;
  const imageUrl = formData.get("imageUrl") as string | null;

  if (!content?.trim()) {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }

  const tokens = await getLinkedInTokens();
  if (!tokens || tokens.expires_at < Date.now()) {
    return NextResponse.json({ error: "LinkedIn not connected or token expired" }, { status: 401 });
  }

  const { access_token: token, person_urn: personUrn } = tokens;

  let assetUrn: string | null = null;

  if (imageFile || imageUrl) {
    let imageBuffer: Buffer;
    let mimeType: string;

    if (imageFile) {
      imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      mimeType = imageFile.type || "image/jpeg";
    } else {
      const imgRes = await fetch(imageUrl!);
      if (!imgRes.ok) throw new Error("Failed to fetch image from URL");
      imageBuffer = Buffer.from(await imgRes.arrayBuffer());
      mimeType = imgRes.headers.get("content-type") || "image/jpeg";
    }

    assetUrn = await uploadImageToLinkedIn(token, personUrn, imageBuffer, mimeType);
  }

  // Build post body
  const shareContent: Record<string, unknown> = {
    shareCommentary: { text: content },
    shareMediaCategory: assetUrn ? "IMAGE" : "NONE",
  };

  if (assetUrn) {
    shareContent.media = [{ status: "READY", media: assetUrn }];
  }

  const postRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: personUrn,
      lifecycleState: "PUBLISHED",
      specificContent: { "com.linkedin.ugc.ShareContent": shareContent },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });

  if (!postRes.ok) {
    return NextResponse.json({ ok: false, error: await postRes.text() }, { status: 502 });
  }

  return NextResponse.json({ ok: true, postId: postRes.headers.get("x-restli-id") });
}
