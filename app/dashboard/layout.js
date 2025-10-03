
import "@/app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        
          <main className="flex-1">{children}</main>

          <footer className="w-full p-4 sm:p-5 bg-white mt-auto text-center border-t border-gray-200">
            <p className="text-sm sm:text-base text-gray-600">
              Made with ❤️ by{" "}
              <a href="#" className="font-bold transition-colors duration-200 hover:text-purple-500">
                RS
              </a>
            </p>
          </footer>
        
      </body>
    </html>
  );
}
