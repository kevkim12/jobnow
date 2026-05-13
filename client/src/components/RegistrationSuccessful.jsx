import { CheckCircleFilled, LoginOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Footer from "./layout/Footer";

export default function RegistrationSuccessful() {
  return (
    <div className="page-shell">
      <main className="content-wrap flex min-h-[calc(100vh-5rem)] items-center justify-center py-16">
        <section className="surface-card max-w-xl p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-teal-100 text-4xl text-teal-700">
            <CheckCircleFilled />
          </div>
          <p className="eyebrow mt-7">Account ready</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">
            Registration successful.
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Your JobNow account has been created. Log in to start saving gigs
            and managing your shortlist.
          </p>
          <NavLink to="/login" className="primary-action mt-8">
            Login
            <LoginOutlined />
          </NavLink>
        </section>
      </main>
      <Footer />
    </div>
  );
}
