import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";
import "@/public/globals.css";
import { locales } from "@/config";

//用于在构建时静态生成路由
//不使用的话，Next.js 将在运行时动态渲染
//每次请求都需要服务器计算，性能较差
//使用后，Next.js 会在构建时生成所有指定的静态页面
//提升性能，减少服务器负担
export async function generateStaticParams() {
  return locales.map((lng: string) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Blessed",
  description: "A note-taking app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
