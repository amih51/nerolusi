import Navbar from "@/components/navbar/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="size-full flex flex-row">
      <Navbar />
      <div className="p-12">{children}</div>
    </body>
  );
}
