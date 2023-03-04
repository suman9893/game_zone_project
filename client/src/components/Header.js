import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();

  const token = user?.token;

  if (token) {
    const decodedtoken = decode(token);
    if (decodedtoken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(!show);
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "black" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand
          className="navtitle"
          href="/"
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: "26px",
            marginLeft: "20px",
          }}
        >
          Game Zone
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "white" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5
                style={{
                  textAlign: "center",
                  marginTop: "25px",
                  cursor: "pointer",
                  color: "#808080",
                }}
              >
                Welcome <span className="rainbow">{user?.result?.name}</span>
              </h5>
            )}

            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Review</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>

          <form
            className="d-flex input-group w-auto"
            style={{ marginTop: "-5px" }}
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              className="form-control"
              placeholder="BGMI,GTA V..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-white" type="submit">
              Search
            </button>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
