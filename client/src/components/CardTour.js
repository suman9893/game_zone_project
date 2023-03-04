import React from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBRipple,
  MDBCardFooter,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id;

  const dispatch = useDispatch();

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} others liked`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            <MDBTooltip
              tag="a"
              title={`${likes.length} Like${likes.length > 1 ? "s" : ""}`}
            >
              {likes.length} Likes
            </MDBTooltip>
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like&nbsp;&nbsp;
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 mx-2 d-sm-flex">
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage
            src={imageFile}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: "180px" }}
          />
          <a href="#nope">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple>
        <div className="top-left cardName">{name}</div>
        <span className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link key={index} to={`/tours/tag/${tag}`}>
              #{tag}{" "}
            </Link>
          ))}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter>
          <MDBBtn
            style={{ float: "center", marginRight: "5px" }}
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please Login/SignUp" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
