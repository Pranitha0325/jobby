import {Component} from 'react'
import {Link} from 'react-router-dom'


import Header from '../Header'
import './index.css'

class Home extends Component {
  onClickFindJobs =() => {
    const {history} = this.props 
    history.replace("/jobs")
  }
  render () {
  return(
    <div className="bg-container-home">
      <Header />
        <div className="card">
          <h1>Find The Job That Fits Your Life</h1>
          <p>Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential</p>
          <Link to="/jobs">
          <button onClick={this.onClickFindJobs} type="button" className="button">Find Jobs</button>
          </Link>
        </div>
    </div>
  )
  }
}

export default Home