import ReactStars from "react-rating-stars-component";
import React from "react";
import axios from "axios";

 
const Rate = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating)
       axios.post("http://localhost:5000/rate",{rate:newRating,userId:"6664901a407bb6f78e4c1039",providerId:"66747728915246a4151a4108"}).then((result)=>{
        console.log(result)
       })
    }
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
)}

export default Rate