// app/dashboard/layout.tsx
"use client";

import {  useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  BookOpen,
  Mail,
  Menu,
  X,

  HomeIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: Folder,
    },
    {
      name: "Blogs",
      href: "/dashboard/blogs",
      icon: BookOpen,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: Mail,
    },
 
    {
      name: "Back To Portfolio",
      href: "/",
      icon: HomeIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 p-2 z-50 bg-white rounded-lg shadow-sm"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
           
        </nav>
       <div className="fixed left-0 bottom-0 w-full flex justify-center p-2">
       <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
           Sign Out
          </button>
       </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-4 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
      </main>
    </div>
  );
}