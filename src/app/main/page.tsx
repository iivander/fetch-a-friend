import ProtectedLayout from "@/app/protected-layout";
import TopNav from "@/app/components/TopNav";
import MainContent from "@/app/components/MainContent";

export default async function Main() {
    return (
        <ProtectedLayout>
            <TopNav />
            <MainContent />
        </ProtectedLayout>
    );
}
