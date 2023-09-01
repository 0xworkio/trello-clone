import { AuthContextProvider } from "@/context/auth-context";
import { getServerSession } from "next-auth";
import Navbar from "@/components/navbar/navbar";
import Navigate from "@/components/navigate";
import { getUserById } from "@/app/(dashboard)/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!session) return <Navigate to="/login" />;

  const user = await getUserById(session.user.id);

  return (
    <AuthContextProvider user={user}>
      <Navbar />
      {children}
    </AuthContextProvider>
  );
}