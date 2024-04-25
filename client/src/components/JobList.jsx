import { SearchOutlined } from '@ant-design/icons';
import { useState } from "react";
import JobTile from "./JobTile.jsx";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        setLoading(true);
        const fetchedData = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&page=1&num_pages=5&rapidapi-key=e889705b53msh214d68d2cd90823p16404bjsn929c73099406`);
        const { data } = await fetchedData.json();

        setJobs(data);
        setLoading(false);
    };

    const handleSearchButtonClick = () => {
        if (searchQuery.trim() !== "") {
            fetchData();
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="h-screen flex flex-col items-center">
                <div className="w-1/2 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
                    <div className="ml-4 flex gap-1 items-center">
                        <SearchOutlined />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search Jobs"
                            className="text-lg p-2 focus:outline-none"
                        />
                    </div>
                    <button onClick={handleSearchButtonClick} className="bg-theme text-m mr-4 rounded-lg p-2 text-white font-medium">Search</button>
                </div>
                <div className="w-1/2 mt-10 mb-10 gap-4 overflow-auto">
                    {loading ? (
                        <h1>Loading...</h1>
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
        </>
    );
}
