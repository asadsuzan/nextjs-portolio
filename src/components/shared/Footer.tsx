'use client'
import Link from "next/link";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Download,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:your@email.com",
      icon: Mail,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/your-profile",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/your-username",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/your-handle",
      icon: Twitter,
    },
  ];

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
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">About</h3>
            <p className="text-sm">
              A passionate developer creating meaningful digital experiences.
            </p>
            <button
              onClick={handleDownloadCV}
              className="flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download CV
            </button>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Stay Connected</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Navigate</h3>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-sm hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5 mr-2" />
              Back to Top
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;