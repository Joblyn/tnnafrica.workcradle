import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";
import { defaultAuthState } from "../../../../actions/auth";
// import * as ActionTypes from "../../../../actions/Types";
// import {logOutAction} from '../../../../actions/logOutAction'
import avatar from "./../../../../images/avatars/portrait.jpg";

export default function UserActions() {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     visible: false
  //   };

  //   this.toggleUserActions = this.toggleUserActions.bind(this);
  //   // this.logout = this.logout.bind(this);
  // }
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(defaultAuthState);
    window.localStorage.clear();
    return <Redirect to="/" />;
  };

  const toggleUserActions = () => {
    setVisible((state) => !state);
  };

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar rounded-circle mr-2"
          src={avatar}
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">{user && user.name}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible} style={{left: 0}}>
        {/* <DropdownItem tag={Link} to="profile">
          <i className="material-icons">&#xE7FD;</i> Profile
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/"
          className="text-danger"
          onClick={logout}
        >
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
}
// }
