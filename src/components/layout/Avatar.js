import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { NavDropdown, Image } from "react-bootstrap";

import { UserContext } from "../../context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const { Item, Divider } = NavDropdown;

export default function Avatar() {
  const { currentUser } = useContext(UserContext);

  const items = () => {
    if (currentUser) {
      return (
        <>
          <NavLink className="dropdown-item" to="/profile">
            My Profile
          </NavLink>
          <NavLink className="dropdown-item" to="/qrcodes">
            My QR Codes
          </NavLink>
          <Divider />
          <Item onClick={signOutUser}>Log Out</Item>
        </>
      );
    } else {
      return (
        <Item>
          <NavLink to="/">
            Sign In
          </NavLink>
        </Item>
      );
    }
  };

  return (
    <NavDropdown
      title={
        <>
          <Image alt="avatar" src={currentUser ? "https://img.freepik.com/premium-vector/cool-nerdy-pizza-cartoon-avatar-illustration_448933-122.jpg?w=1060" : "images/avatar.png"} roundedCircle />
          {currentUser ? 'Person' : 'No Person'}
        </>
      }
      id="nav-dropdown"
    >
      {items()}
    </NavDropdown>
  );
}
