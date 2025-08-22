import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata = {
  title: "Civil Engineer App",
  description: "All-in-one tool for civil engineers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
