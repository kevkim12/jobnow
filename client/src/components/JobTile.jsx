import { Button } from 'antd';

export default function JobTile(job) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center gap-16">
                <img src={job.logo} alt={job.name} className="h-20 w-20 ml-4" />
                <div>
                    <h3 className="text-xl font-semibold">{job.name}</h3>
                    <p className="text-gray-600">{job.jobType === "FULLTIME" ? "Full-Time" : "Part-Time"}</p>
                    <p className="text-gray-800">{job.jobTitle}</p>
                    <p className="text-gray-800">
                        {job.city && job.city + (job.state ? ', ' : '')}
                        {job.state && job.state + (job.country ? ', ' : '')}
                        {job.country && job.country}
                    </p>
                </div>
            </div>
            <Button type="primary" onClick={() => window.open(job.apply, '_blank')} >Apply here!</Button>
        </div>
    );
}
