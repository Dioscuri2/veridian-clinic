import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TranscribeClient from "./TranscribeClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TranscribePage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("__va")?.value) redirect("/admin/login");
  return <TranscribeClient />;
}
