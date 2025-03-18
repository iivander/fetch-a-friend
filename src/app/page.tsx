import { redirect } from "next/navigation";

// I didn’t set this as the login page because we might want to use it as a home page with some information in the future.
export default async function HomePage() {
    redirect("/login");
}
