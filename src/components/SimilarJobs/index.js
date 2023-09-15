import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {MdWork} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
    const {details }= props 
    const {companyLogoUrl, location, title, rating, employmentType, jobDescription} = details

    return(
      <div className="job-card">
      
        <div className="heading">
        <img src={companyLogoUrl} className="company-logo" alt="similar job company logo"/>
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
        <p>{employmentType}</p>
        </div>
        <p>Description</p>
        <p>{jobDescription}</p>
        </div>
    )

}

export default SimilarJobs
