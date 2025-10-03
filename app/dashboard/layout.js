
import "@/app/globals.css";
import Provider from "../provider";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <Provider>
          <main className="flex-1">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
