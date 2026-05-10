import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Veridian Inbox",
  description: "Veridian Clinic admin inbox",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "VC Inbox",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/admin-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#111009",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
