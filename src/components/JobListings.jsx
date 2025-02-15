import { useState, useEffect } from 'react';
import jobs from '../jobs.json';
import JobListing from './JobListing';

// JobListings component to display a list of job listings
const JobListings = ({isHome =false}) => {
  const[jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const fetchJobs = async () => {
      try{
        const res = await fetch('https://localhost:8000/jobs');
        const data = await res.json();
        setJobs(data);
        
      } catch (error){
        console.error(error,': Error fetchin data ');
        
      }
    };
  }, []);


  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <JobListing
              key={job.id}
              job={job}
              showFullDescription={showFullDescription}
              toggleDescription={toggleDescription}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;