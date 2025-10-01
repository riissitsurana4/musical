
import "./globals.css";
import Provider from "./provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <Provider>
          <header className="w-full p-4 sm:p-5 bg-white shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-bold text-black">Musical</h1>
              <a href="/login"
              className="px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-[#9D8CF0] text-white font-semibold text-sm sm:text-lg shadow-md hover:bg-[#8a77e8] hover:shadow-lg transition-all duration-200">
                Login
              </a>
            </div>
            <div className="clear-both"></div>
          </header>
          
          <main className="flex-1">{children}</main>

          <footer className="w-full p-4 sm:p-5 bg-white mt-auto text-center border-t border-gray-200">
            <p className="text-sm sm:text-base text-gray-600">
              Made with ❤️ by{" "}
              <a href="#" className="font-bold transition-colors duration-200 hover:text-purple-500">
                RS
              </a>
            </p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
