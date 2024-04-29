import "./globals.css";

export const metadata = {
  title: "Tweethub",
  description: "tweethub social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className="min-h-screen flex flex-col bg-gradient-to-r from-white via-gray-100 to-blue-100 text-black">
            {children}
          </div>
    </body>
    </html>
  );
}
