// app/admin/layout.tsx
import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/admin-header";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
