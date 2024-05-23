import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";
import JobTile from "./JobTile";
import Footer from "./layout/Footer";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    setLoading(true);
    const fetchedData = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        searchQuery
      )}&page=1&num_pages=5&rapidapi-key=${apiKey}`
    );
    const { data } = await fetchedData.json();

    setJobs(data);
    setLoading(false);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== "") {
      fetchData();
    } else {
      message.error("Please enter a search query.");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="h-screen overflow-auto">
        <div className="flex flex-col items-center h-fit">
          <div className="flex items-center justify-between w-9/12 mt-5 bg-white border border-black rounded-lg shadow-lg lg:w-1/2 md:w-9/12 h-14">
            <div className="flex items-center w-full gap-1 ml-4">
              <SearchOutlined />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search for jobs..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchButtonClick();
                  }
                }}
                className="w-full p-2 text-lg focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearchButtonClick}
              className="p-2 mr-4 font-medium text-white rounded-lg bg-theme text-m"
            >
              Search
            </button>
          </div>
          <div className="w-9/12 gap-4 mt-10 mb-10 lg:w-1/2 md:w-10/12">
            {loading ? (
              <h1 className="text-center">Loading...</h1>
            ) : (
              jobs.map((job) => (
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
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
