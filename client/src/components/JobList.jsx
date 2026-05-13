import { SolutionOutlined, SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";
import JobTile from "./JobTile";
import Footer from "./layout/Footer";

const popularSearches = ["Warehouse", "Retail", "Remote support"];

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchData = async (query = searchQuery) => {
    setLoading(true);

    try {
      const fetchedData = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
          query
        )}&page=1&num_pages=5&rapidapi-key=${apiKey}`
      );
      const { data } = await fetchedData.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      message.error("Unable to load jobs right now.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== "") {
      fetchData();
    } else {
      message.error("Please enter a search query.");
    }
  };

  const handlePopularSearch = (query) => {
    setSearchQuery(query);
    fetchData(query);
  };

  return (
    <div className="page-shell">
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="content-wrap py-12">
            <div className="max-w-2xl">
              <p className="eyebrow">Job search</p>
              <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
                Search roles with a sharper view.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Find full-time, part-time, and remote opportunities with direct
                application links.
              </p>
            </div>

            <div className="search-panel mt-8">
              <div className="flex min-h-12 flex-1 items-center gap-2 rounded-md bg-slate-50 px-3">
                <SearchOutlined className="text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by role, company, or keyword"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchButtonClick();
                    }
                  }}
                  className="search-input"
                />
              </div>
              <button onClick={handleSearchButtonClick} className="primary-action">
                <SearchOutlined />
                Search
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {popularSearches.map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => handlePopularSearch(query)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-teal-300 hover:bg-teal-50 hover:text-slate-950"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="content-wrap py-10">
          {jobs.length > 0 && (
            <div className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-500">
              <SolutionOutlined className="text-teal-600" />
              {jobs.length} roles found
            </div>
          )}

          {loading ? (
            <div className="surface-card py-16 text-center">
              <p className="text-xl font-black text-slate-950">
                Searching listings...
              </p>
              <p className="mt-2 text-slate-600">
                Pulling fresh job results for your search.
              </p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid gap-5">
              {jobs.map((job) => (
                <JobTile
                  key={job.job_id}
                  name={job.employer_name}
                  logo={job.employer_logo}
                  apply={job.job_apply_link}
                  jobType={job.job_employment_type}
                  jobTitle={job.job_title}
                  city={job.job_city}
                  state={job.job_state}
                  country={job.job_country}
                />
              ))}
            </div>
          ) : (
            <div className="surface-card py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-slate-950 text-2xl text-teal-300">
                <SolutionOutlined />
              </div>
              <p className="mt-5 text-xl font-black text-slate-950">
                Start with a job search.
              </p>
              <p className="mt-2 text-slate-600">
                Try a role, company, skill, or one of the quick searches above.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
