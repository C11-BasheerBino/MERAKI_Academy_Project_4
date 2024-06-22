import ReactStars from "react-rating-stars-component";
import React from "react";
import axios from "axios";

const Rate = ({ collection, onUpdateSucceed }) => {
  const ratingChanged = (newRating) => {
    console.log(collection.providerId._id);
    console.log(newRating);
    axios
      .post("http://localhost:5000/rate", {
        rate: newRating,
        userId: collection.userId,
        providerId: collection.providerId._id,
      })
      .then((result) => {
        console.log(result);
        onUpdateSucceed();
      });
  };
  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  );
};

export default Rate;
