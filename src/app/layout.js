import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" text-slate-200">
        <div className="">{children}</div>
      </body>
    </html>
  );
}
