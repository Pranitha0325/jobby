import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state ={username:"", passwod:""}

  onChangeUsername = event => {
    this.setState({username:event.target.value})
  }

  onChangePassword = event => {
    this.setState({password:event.target.value})
  }

  onSubmitSuccess = (jwtToken) => {
    const {history} = this.props 
    Cookies.set("jwt_token", jwtToken , {expires:30})
    history.replace("/")
  }

  onSubmitFailure = (errMsg) => {
    console.log(errMsg)
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state 
    const userDetails = {username, password}
    const url ="https://apis.ccbp.in/login"
    const options ={
      method: "POST",
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    const data = await response.json();
    if (response.ok ===true) {
      this.onSubmitSuccess(data.jwt_token);
    }else{
      this.onSubmitFailure(data.error_msg)
    }

  }

  render () {
    const {username, password} = this.state
    const token = Cookies.get("jwt_token")
    if (token!==undefined){
      const {history} = this.props 
      history.replace("/")
    }
    return (
        <div className="bg-container">
          <div className="login-card">
          <img  src="https://assets.ccbp.in/frontend/react-js/logo-img.png " alt="website logo" />
          <form onSubmit={this.onSubmit}>
          <div className="input-items">
            <label id="username">USERNAME</label>
            <input onChange={this.onChangeUsername} className="input" htmlFor="username" type="text" value={username}  /> 
          </div>
          <div className="input-items">
            <label id="password">PASSWORD</label>
            <input onChange={this.onChangePassword} className="input" htmlFor="password" type="password" /> 
          </div>
          <button className="button" type="submit" >Login</button>
          </form>
          </div>
        </div>
    )
  }

}

export default withRouter(Login)