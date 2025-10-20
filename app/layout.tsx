import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "@/public/globals.css";

export const metadata: Metadata = {
  title: "Blessed",
  description: "A note-taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
