import AsideNavbarDashboard from "@/components/AsideDashboardNavbar";

export default function AdminLayout({ children }) {
    return (
        <>
            <AsideNavbarDashboard />
            <main>{children}</main>
        </>
    );
}