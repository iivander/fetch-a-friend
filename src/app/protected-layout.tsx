import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

// Reusable component to protect server-side routes by redirecting to login if the user is not authenticated
export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const session = await auth();

    if (!session || new Date(session.expires) < new Date()) {
        redirect("/login");
    }

    return children;
}