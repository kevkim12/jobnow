import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Footer from "./layout/Footer";

const workPaths = [
  {
    title: "Quick gigs",
    copy: "Pick up local projects, moving help, errands, event work, and one-off tasks that fit around your week.",
    image: "/moving-out-image.webp",
    to: "/gigs",
    cta: "Browse gigs",
    accent: "bg-teal-500",
  },
  {
    title: "Steady jobs",
    copy: "Search full-time and part-time roles with clean listings, company details, and direct application links.",
    image: "/people-working.jpeg",
    to: "/jobs",
    cta: "Search jobs",
    accent: "bg-orange-500",
  },
];

const highlights = [
  {
    icon: <SearchOutlined />,
    title: "Search in seconds",
    copy: "Jump straight into gigs or job listings with focused search tools.",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "Built for urgency",
    copy: "Spot short-term work and direct apply options without extra clutter.",
  },
  {
    icon: <CheckCircleOutlined />,
    title: "Keep track",
    copy: "Save gigs after signing in so strong matches are easy to revisit.",
  },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950">
        <img
          src="/people-working.jpeg"
          alt="People collaborating around a laptop"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/78 to-slate-950/25" />
        <div className="content-wrap relative flex min-h-[620px] items-center py-16">
          <div className="max-w-3xl text-white">
            <p className="eyebrow text-teal-300">Local work, faster</p>
            <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              JobNow
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Find flexible gigs, search longer-term roles, and move from
              looking to applying with a cleaner work marketplace.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <NavLink to="/gigs" className="primary-action bg-teal-500 text-slate-950 hover:bg-teal-400">
                <SearchOutlined />
                Find gigs
              </NavLink>
              <NavLink to="/jobs" className="secondary-action border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Search jobs
                <ArrowRightOutlined />
              </NavLink>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["2", "work modes"],
                ["24/7", "search access"],
                ["1", "saved list"],
              ].map(([value, label]) => (
                <div
                  className="rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur"
                  key={label}
                >
                  <dt className="text-2xl font-black text-white">{value}</dt>
                  <dd className="mt-1 text-xs font-semibold uppercase text-slate-300">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="content-wrap py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Choose your lane</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
            A cleaner way to move between quick cash and career search.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {workPaths.map((path) => (
            <article
              className="surface-card group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              key={path.title}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={path.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span
                  className={`absolute left-5 top-5 h-3 w-16 rounded-full ${path.accent}`}
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-black text-slate-950">
                  {path.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{path.copy}</p>
                <NavLink to={path.to} className="secondary-action mt-6">
                  {path.cta}
                  <ArrowRightOutlined />
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="content-wrap grid gap-6 py-14 md:grid-cols-3">
          {highlights.map((item) => (
            <div className="flex gap-4" key={item.title}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-slate-950 text-xl text-teal-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-wrap py-16">
        <div className="surface-card flex flex-col gap-6 bg-slate-950 p-8 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-orange-300">Ready when you are</p>
            <h2 className="mt-3 text-3xl font-black">
              Start with the work that fits today.
            </h2>
          </div>
          <NavLink to="/signup" className="primary-action bg-white text-slate-950 hover:bg-slate-100">
            Create account
            <ArrowRightOutlined />
          </NavLink>
        </div>
      </section>
      <Footer />
    </div>
  );
}
