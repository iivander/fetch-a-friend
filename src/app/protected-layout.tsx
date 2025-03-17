import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Reusable component to redirect any page to login if not logged in (only to be used with server component)
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return <>{children}</>;
}
