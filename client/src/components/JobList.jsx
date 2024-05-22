import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";
import JobTile from "./JobTile";
import Footer from "./layout/Footer";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY

    const fetchData = async () => {
        setLoading(true);
        const fetchedData = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&page=1&num_pages=5&rapidapi-key=${apiKey}`,);
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
            <div className='h-screen overflow-auto'>
                <div className="h-fit flex flex-col items-center">
                    <div className="lg:w-1/2 md:w-9/12 w-9/12 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
                        <div className="w-full ml-4 flex gap-1 items-center">
                            <SearchOutlined />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                placeholder="Search for jobs..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchButtonClick();
                                    }
                                }}
                                className="w-full text-lg p-2 focus:outline-none"
                            />
                        </div>
                        <button onClick={handleSearchButtonClick} className="bg-theme text-m mr-4 rounded-lg p-2 text-white font-medium">Search</button>
                    </div>
                    <div className="lg:w-1/2 md:w-10/12 w-9/12 mt-10 mb-10 gap-4">
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