import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import AllJobs from '../AllJobs'

//

import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiProfileContents = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: 'INPROGRESS',
  failure: 'FAILURE'
}
const apiJobsComponent = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: 'INPROGRESS',
  failure: 'FAILURE'
}

class Jobs extends Component {
  state = {profileDetails:{},
           jobDetails:[],
           searchInput:"", 
           apiProfileStatus:apiProfileContents.initial,
           apiJobStatus:apiJobsComponent.initial,
           checkBoxStatus:[],
           radioStatus:""}

  componentDidMount () {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({apiProfileStatus:apiProfileContents.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = ("https://apis.ccbp.in/profile")
    const options = {
      headers : {
        Authorization : `Bearer ${jwtToken}`
      },
      method:"GET"
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profile = data.profile_details
    const updatedData = {
      name: profile.name,
      profileImageUrl: profile.profile_image_url,
      shortBio: profile.short_bio
    }
    if (response.ok===true){
      this.setState({profileDetails:profile, apiProfileStatus:apiProfileContents.success})
    }else{
      this.setState({apiProfileStatus:apiProfileContents.failure})
    }

  }

  getJobsList = async () => {
    this.setState({apiJobStatus:apiJobsComponent.inProgress})
    const jwtToken = Cookies.get("jwt_token")
    const {checkBoxStatus, radioStatus, searchInput} = this.state
    const url =`https://apis.ccbp.in/jobs?employment_type=${checkBoxStatus}&minimum_package=${radioStatus}&search=${searchInput}`
    const options = {
      headers : {
        Authorization : `Bearer ${jwtToken}`
      },
      method:"GET"
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const jobs = data.jobs
    if (response.ok===true){
      this.setState({jobDetails:jobs, apiJobStatus:apiJobsComponent.success})
    }else{
      console.log("yes")
      this.setState({apiJobStatus:apiJobsComponent.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioStatus:event.target.id}, this.getJobsList)
  }

  onGetInputOption = event => {
    const {checkBoxStatus} = this.state
    const inputNotInList = checkBoxStatus.filter(eachItem=>eachItem===event.target.id)
    if (inputNotInList.length===0){
      console.log("true")
      this.setState(prevState=>({checkBoxStatus:[...prevState.checkBoxStatus, event.target.id]}), this.getJobsList)
    }else{
      console.log("false")
      const filteredData = checkBoxStatus.filter(eachItem=> eachItem!==event.target.id)
      this.setState(prevState=>({checkBoxStatus:filteredData}), this.getJobsList)
    }
  }
  

  onGetProfileView = () => {
    const {profileDetails, apiProfileStatus} = this.state 
    if (apiProfileStatus==="SUCCESS") {
      const {name, profile_image_url, short_bio} = profileDetails

      return(
        <div className="profile">
        <img src={profile_image_url} alt="profile" />
        <h1>{name}</h1>
        <p>{short_bio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div>
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetryProfile}>
      Retry 
      </button>
    </div>
  )

  renderLodingView = () => {
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="White" height="50" width="50" />
    </div>
  }

  onRenderProfileStatus = () => {
    const {apiProfileStatus} = this.state 
    switch (apiProfileStatus) {
      case (apiProfileContents.success):
        return this.onGetProfileView()
      case (apiProfileContents.inProgress):
        return this.renderLodingView()
      case (apiProfileContents.failure): 
        return onGetProfileFailureView ()
    }
  }

  onGetJobView = () => {
    const {jobDetails} = this.state
    const noJobs = jobDetails.length===0
    return (
      <div>
      {noJobs ? (
        <div>
          <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs"/>
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
        ) : (
        <ul className="list-items">
          {jobDetails.map((item)=>(
            <li key={item.id} >
          <AllJobs jobDetailsList={item} key={item.id}/>
          </li>   
          ))}
          </ul>
          )}
      </div>
    )
  }

  onRetryJobs = () => {
    this.getJobsList()
  }

  onGetJobFailureView = () => {
    return (
      <div>
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" />
      <button type="button" onClick={this.onRetryJobs}>
          Retry 
      </button>
      </div>
    )

  }

  onRenderJobStatus = () => {
    const {apiJobStatus} = this.state 
    switch (apiJobStatus) {
      case (apiJobsComponent.success):
        return this.onGetJobView()
      case (apiJobsComponent.inProgress):
        return this.renderLodingView()
      case (apiJobsComponent.failure): 
        return onGetJobFailureView ()
    }
  }

  getSearchInput = event => {
    this.setState({searchInput:event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getJobsList()

  }

  onClickEnter = event => {
    if (event.target.value==="Enter"){
      this.getJobsList()
    }
  }


  render () {
    return (
      <div>
        <Header />
        <div className="bg-container-jobs">
        <div>
        {this.onRenderProfileStatus()}
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map((type)=>(
            <li key={type.employmentTypeId}>
            <input id={type.employmentTypeId} type ="checkbox" onChange={this.onGetInputOption} />
            <label htmlFor={type.employmentTypeId} > {type.label} </label>
            </li>
          ))}
        </ul>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map((item)=>(
            <li key={item.label}>
            <input type="radio" name="option" id={item.salaryRangeId} onChange={this.onGetRadioOption}/>
            <label htmlFor={item.salaryRangeId}>{item.label}</label>
            </li>
          ))}
        </ul>
        </div>
        <div>
        <div>
          <input onChange={this.getSearchInput} onKeyDown={this.onClickEnter} className="search-icon" type="search" placeholder="Search" />
          <button className="search-icon" type="button" data-testid="searchButton" onClick={this.onSubmitSearchInput}>
            <BsSearch className="search-icon" />
          </button>
          </div>
           {this.onRenderJobStatus()}
        </div>
        </div>  
      </div>
    )
  }

  
}

export default Jobs