import {withRouter} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {MdWork} from 'react-icons/md'

import './index.css'

const AllJobs = props =>{
    const{jobDetailsList} = props
    console.log(jobDetailsList)
    const {company_logo_url, employment_type, title, rating, location, package_per_annum, job_description} = jobDetailsList

    const getJobDetails = () => {
        const {id} = jobDetailsList
        const {history} = props 
        history.replace(`/jobs/${id}`)

    }
    return (
        <div>
        <button onClick={getJobDetails}>
        <div className="job-card">
        <div className="heading">
        <img src={company_logo_url} className="company-logo" alt="company logo"/>
        <div>
        <h1 className="title">{title}</h1>
        <div className="stars">
        <AiFillStar className="star"/>
        <p>{rating}</p>
        </div>
        </div>
        </div>
        <div className="location">
        <MdLocationOn />
        <p>{location}</p>
        <MdWork />
        <p>{employment_type}</p>
        <p>{package_per_annum}</p>
        </div>
        <h1>Description</h1>
        <p>{job_description}</p>
        </div>
        </button>
        </div>
    )
}

export default withRouter(AllJobs)