import "./globals.css";

export const metadata = {
  title: "Musical YSWS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <header className="w-full p-5 bg-white shadow-md">
          <h1 className="float-left text-4xl font-bold text-black">Musical</h1>
          <button className="float-right px-8 py-3 rounded-full bg-[#9D8CF0] text-white font-semibold text-lg shadow-md hover:bg-[#8a77e8] hover:shadow-lg transition-all duration-200">
            <a href="/login">Login</a>
          </button>
        </header>
        <main>{children}</main>

        <footer className="w-full p-5 bg-white mt-auto text-center">
          <p className="text-gray-600">Made with ❤️ by <a href="#" className="font-bold transition-colors duration-200 hover:text-purple-500">RS</a> </p>
        </footer>
      </body>
    </html>
  );
}
