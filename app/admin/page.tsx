import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("__va")?.value;

  if (!session) redirect("/admin/login");

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://veridianclinic.com";

  let stats = null;
  let error = "";

  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { Cookie: `__va=${session}` },
      cache: "no-store",
    });

    if (res.status === 401) redirect("/admin/login");
    if (res.ok) stats = await res.json();
    else error = "Unable to load stats";
  } catch {
    error = "Connection error loading stats";
  }

  return <AdminDashboardClient stats={stats} error={error} />;
}
