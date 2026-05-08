import {
  BankOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useState } from "react";

function formatJobType(jobType) {
  if (!jobType) {
    return "Role type not listed";
  }

  return jobType
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function JobTile(job) {
  const [logoFailed, setLogoFailed] = useState(false);
  const location = [job.city, job.state, job.country].filter(Boolean).join(", ");
  const companyInitial = (job.name || "J")[0].toUpperCase();

  return (
    <article className="surface-card overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
          {job.logo && !logoFailed ? (
            <img
              src={job.logo}
              alt={`${job.name} logo`}
              onError={() => setLogoFailed(true)}
              className="h-12 w-12 object-contain"
            />
          ) : (
            <span className="text-2xl font-black text-slate-950">
              {companyInitial}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <BankOutlined />
                {job.name || "Company not listed"}
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">
                {job.jobTitle || "Untitled role"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                job.apply && window.open(job.apply, "_blank", "noopener,noreferrer")
              }
              disabled={!job.apply}
              className="primary-action min-w-32 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              Apply
              <ExportOutlined />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
              <ClockCircleOutlined className="text-teal-600" />
              {formatJobType(job.jobType)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
              <EnvironmentOutlined className="text-orange-600" />
              {location || "Location not listed"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
