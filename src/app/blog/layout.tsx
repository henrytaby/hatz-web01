import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Henry Taby",
  description: "Artículos técnicos sobre desarrollo de software, Jamstack y arquitectura.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
