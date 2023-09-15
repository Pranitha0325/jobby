import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) => {
  const onClickLogout =() => {
    Cookies.remove("jwt_token")
    const {history} = props 
    history.replace("/login")
  }


  return (
    <>
      <nav className="nav-container">
        <div>
        <Link to="/">
          <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website logo" />
          </Link>
        </div>
        <ul className="list-items">
          <Link to="/">
          <li>Home</li>
          </Link>
          <Link to="/jobs">
          <li>Jobs</li>
          </Link>
          <li>
          <button onClick={onClickLogout} type="button" className="button">Logout</button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)