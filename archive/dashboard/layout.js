
import "@/app/globals.css";
import Provider from "../provider";
import Header from "./header";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <Provider>
          <Header />
          <main className="flex-1">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
