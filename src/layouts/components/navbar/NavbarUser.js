import React from "react"
import * as Icon from "react-feather"
import { connect } from "react-redux"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import userImg from "../../../assets/img/user.png"
import { history } from "../../../history"
import { LogoutAction } from '../../../redux/actions/auth'

const UserDropdown = props => {
  return (
    <DropdownMenu right>
      <DropdownItem tag="a" onClick={() => props.logout()} >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    suggestions: [],
  }

  logout() {
    this.props.LogoutAction();
    history.push("/login")
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.auth.name}
              </span>
              <span className="user-status">{this.props.auth.role}</span>
            </div>
            <span data-tour="user">
              <img
                src={userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} logout={() => this.logout()} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { LogoutAction })(NavbarUser);
