import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import IntakesClient from "./IntakesClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function IntakesPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("__va")?.value) redirect("/admin/login");
  return <IntakesClient />;
}
