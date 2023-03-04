import React, { useEffect } from "react";

import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardFooter,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";

import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete ???")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "750px",
        alignContent: "center",
      }}
      className="mt-5"
    >
      {userTours.length === 0 && (
        <h3 className="mt-5">
          Hello!!! No review added by {user?.result?.name}
        </h3>
      )}
      {userTours.length > 0 && (
        <>
          <hr className="rainbow hrtags" />
          <h3 className="text-center">Dashboard : {user?.result?.name}</h3>
          <hr className="rainbow hrtags" />
        </>
      )}

      <MDBRow className="row-cols-1 row-cols-md-1 g-4 m-0">
        {userTours &&
          userTours.map((item) => (
            <MDBCol key={item._id}>
              <MDBCard>
                <MDBCardImage
                  src={item.imageFile}
                  alt={item.title}
                  position="top"
                  style={{ maxWidth: "100%", height: "300px" }}
                />
                <MDBCardBody>
                  <MDBCardTitle>{item.title}</MDBCardTitle>
                  <MDBCardText>
                    <small className="text-muted">
                      {excerpt(item.description)}
                    </small>
                  </MDBCardText>
                </MDBCardBody>
                <MDBCardFooter>
                  <MDBBtn className="mt-1" tag="a" color="none">
                    <MDBIcon
                      fas
                      icon="trash"
                      style={{ color: "#dd4b39", marginLeft: "11px" }}
                      size="lg"
                      onClick={() => handleDelete(item._id)}
                    />
                  </MDBBtn>
                  <Link to={`/editTour/${item._id}`}>
                    <MDBIcon
                      fas
                      icon="edit"
                      style={{ color: "#55acee", marginLeft: "16px" }}
                      size="lg"
                    />
                  </Link>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          ))}
      </MDBRow>
    </div>
  );
};

export default Dashboard;
