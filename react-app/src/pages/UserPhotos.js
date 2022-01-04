import React from "react";
import PhotoGallery from "../components/PhotoGallery";
import User from "../components/User";
const UserPhotos=() => {
    let user = JSON.parse(localStorage.getItem("user"));
 return(
 <User>
     <PhotoGallery userId={user.id}/>
 </User>
 );
}
export default UserPhotos;