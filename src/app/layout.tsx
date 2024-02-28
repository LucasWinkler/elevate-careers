import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import HeadsUp from "@/components/heads-up";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Reach New Heights in Your Career - ElevateCareers",
  description:
    "Discover curated job listings sourced from Indeed. With intuitive search features, elevate your career effortlessly. Join us today and soar to new heights!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </head>
      <body className="flex min-h-screen flex-col leading-relaxed antialiased">
        <Header />
        <HeadsUp />
        <main className="bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
