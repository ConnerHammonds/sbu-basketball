import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "../../components/AdminDashboardClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions as any);

  if (!session || !session.user) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
