"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  FolderIcon,
  BookOpenIcon,
  MailIcon,
//   LayoutDashboardIcon,
  DownloadIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Projects", href: "/projects", icon: FolderIcon },
    { name: "Blog", href: "/blog", icon: BookOpenIcon },
    { name: "Contact", href: "/contact", icon: MailIcon },
  ];

//   const dashboardLinks = [
//     { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
//     { name: "Blogs", href: "/dashboard/blogs" },
//     { name: "Projects", href: "/dashboard/projects" },
//     { name: "Messages", href: "/dashboard/messages" },
//   ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const handleDownloadCV = () => {
    // Replace with your actual CV path
    const cvUrl = "/cv.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "portfolio-cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">Developer</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex md:ml-10 md:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      isActive(item.href)
                        ? "text-blue-600 underline"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadCV}
              className="hidden md:flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download CV
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </div>
                </Link>
              );
            })}

      

            <button
              onClick={handleDownloadCV}
              className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download CV
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;