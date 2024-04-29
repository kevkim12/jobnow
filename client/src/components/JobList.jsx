// Worked on by Alvis Zou
/*
This page is a page where users can search for jobs and fetches job postings from an API. Once users click the search button, it will display the job postings related to their search. 
It will display the company's name, job title, whether it is full time or part time, and the location. If users want to apply to a specific job, there is an apply button that will redirect
them to the site where they can apply. 
*/
import { SearchOutlined } from '@ant-design/icons';
import { useState } from "react";
import JobTile from "./JobTile";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY

    // Fetches job postings from rapidAPI
    const fetchData = async () => {
        setLoading(true);
        const fetchedData = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&page=1&num_pages=5&rapidapi-key=${apiKey}`,);
        const { data } = await fetchedData.json();

        setJobs(data);
        setLoading(false);
    };
    // Function for when the search button is clicked. If statement is to make sure that the user has searched for something before fetching.
    const handleSearchButtonClick = () => {
        if (searchQuery.trim() !== "") {
            fetchData();
        }
    };
    // Function that takes care of when the user updates their search. 
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    // Returns what will be displayed on the page
    return (
        <div className='h-86.7 overflow-auto'>
            <div className="h-fit flex flex-col items-center">
                <div className="w-1/2 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
                    {/*Search bar */}
                    <div className="w-full ml-4 flex gap-1 items-center">
                        <SearchOutlined />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search Jobs"
                            className="w-full text-lg p-2 focus:outline-none"
                        />
                    </div>
                    {/*Search button */}
                    <button onClick={handleSearchButtonClick} className="bg-theme text-m mr-4 rounded-lg p-2 text-white font-medium">Search</button>
                </div>
                {/*Job postings */}
                <div className="w-1/2 mt-10 mb-10 gap-4">
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
        </div>
    );
}