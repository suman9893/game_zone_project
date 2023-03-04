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
  MDBCardFooter,
} from "mdb-react-ui-kit";

import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../redux/features/tourSlice";
import { excerpt } from "../utility/index";

const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "600px",
        alignContent: "center",
        marginTop: "80px",
      }}
    >
      <h3>Reviews with Tag : {tag}</h3>
      <hr className="hrtags" />
      <MDBRow className="row-cols-1 row-cols-md-1 g-4 m-0">
        {tagTours &&
          tagTours.map((item) => (
            <MDBCol key={item._id}>
              <MDBCard>
                <MDBCardImage
                  src={item.imageFile}
                  alt={item.title}
                  position="top"
                  style={{ maxWidth: "100%", height: "300px" }}
                />
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    <small className="text-muted">
                      {excerpt(item.description, 45)}
                    </small>
                  </MDBCardText>
                </MDBCardBody>
                <MDBCardFooter>
                  <div style={{ float: "left" }}>
                    <MDBBtn
                      size="sm"
                      rounded
                      color="info"
                      onClick={() => navigate(`/tour/${item._id}`)}
                    >
                      Read More
                    </MDBBtn>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          ))}
      </MDBRow>
    </div>
  );
};

export default TagTours;
