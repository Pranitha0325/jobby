import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {MdWork} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import "./index.css"

const apistatusComponant = {
    initial: "INITIAL",
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE"
}

class JobItemDetails extends Component {
    state = {jobDetails:[], similarJobDetails:[], apiStatus:apistatusComponant.success}

    componentDidMount () {
        this.getJobDetails()
    }

    getJobDetails = async () => {
        this.setState({apiStatus:apistatusComponant.inProgress})
        const jwtToken = Cookies.get('jwt_token')
        console.log(jwtToken)
        const {history} = this.props
        const path = history.location.pathname
        const url = `https://apis.ccbp.in${path}` 
         const options = {
             headers : {
          Authorization : `Bearer ${jwtToken}`
           },
      method:"GET"
    }
        const response = await fetch(url, options)
        const data = await response.json()
        const similarJobs = data.similar_jobs
        const formatedData = [data.job_details].map((details) => ({
            companyLogoUrl: details.company_logo_url,
            companyWebsiteUrl: details.company_website_url,
            employmentType: details.employment_type,
            id:details.id,
            jobDescription: details.job_description,
            lifeAtCompany: details.life_at_company,
            location:details.location,
            packagePerAnnum:details.package_per_annum,
            rating:details.rating,
            skills:details.skills.map((skill)=>(
              {
                imageUrl: skill.image_url,
                name: skill.name,
              }
            )),
            title:details.title,
        }))
        console.log(formatedData)
        const formatedSimilarJobsData = similarJobs.map((item)=>(
            {
            companyLogoUrl: item.company_logo_url,
            employmentType: item.employment_type,
            id:item.id,
            jobDescription: item.job_description,
            location: item.location,
            rating: item.rating,
            title: item.title,
            }
        ))
        if (response.ok===true) {
            this.setState({jobDetails:formatedData, similarJobDetails: formatedSimilarJobsData, apiStatus:apistatusComponant.success})
        }else{
            this.setState({apiStatus:apistatusComponant.failure})
        }   
    }

  onGetJobView = () => {
    const {jobDetails, similarJobDetails} = this.state
    if (jobDetails.length >=1) {
      const {id, lifeAtCompany, skills, companyLogoUrl,jobDescription, companyWebsiteUrl, title, rating, location, employmentType, packagePerAnnum} = jobDetails[0]
      console.log(skills[0])
    
    return (
      <div className="job-card">
        <div className="heading">
        <img src={companyLogoUrl} className="company-logo" alt="job details company logo"/>
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
        <p>{packagePerAnnum}</p>
        </div>
        <h1>Description</h1>
        <a href={companyWebsiteUrl}>
        Visit
        </a>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul className="skills">
          {skills.map((item)=>(
          <li key={item.name} >
          <img src={item.imageUrl} alt="name" />
          <p>{item.name}</p>
          </li>
        ))}
        </ul>
        <h1>Life at Company</h1>
        <div className="life-at-company">
        <p>{lifeAtCompany.description}</p>
        <img src={lifeAtCompany.image_url} alt="life at company" />
        </div>
        <h1>Similar Jobs</h1>
        <ul>
        {similarJobDetails.map((item)=>(
          <li key={item.id} >
          <SimilarJobs details={item} key={item.id} />
          </li>
        ))}
        </ul>
    </div>  
    )
    }

  }

  onRetryJobs =() => {
    this.getJobDetails()
  }

  onGetJobFailureView = () => {
    return (
      <div>
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetryJobs}>
          Retry 
      </button>
      </div>
    )
  }

  renderLodingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="White" height="50" width="50" />
      </div>
    )
  }

  onRenderJobDetails = () => {
    const {apiStatus} = this.state 
    switch (apiStatus) {
      case (apistatusComponant.success):
        return this.onGetJobView()
      case (apistatusComponant.inProgress):
        return this.renderLodingView()
      case (apistatusComponant.failure): 
        return onGetJobFailureView ()
    }
  }

  render(){
    return(
    <div >
    <Header />
    <div className="bg-container-jobDetails">
    {this.onRenderJobDetails()}
    </div>
    </div>
  )
  }
}

export default JobItemDetails