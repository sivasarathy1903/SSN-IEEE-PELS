import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollRestoration } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-body-md overflow-x-hidden">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
