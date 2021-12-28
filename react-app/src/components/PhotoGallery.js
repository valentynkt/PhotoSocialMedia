import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ImageList,ImageListItem } from '@material-ui/core';
const PhotoGallery=() => {
    const [photos,setPhotos] = useState([]);
    const [loading,setLoading] = useState(true);
    const fetchData=async() => {
        setLoading(true);
        const response=await axios.get("Images");
        const data=await response.data;
        setPhotos(data);
        setLoading(false);
    }
    useEffect(() => {
     fetchData();
     console.log(photos);
    },[]); 
   if(loading) return <CircularProgress size={120}/>
   else return (
   <div>
       {/* <ImageList>
           {photos.map(image => {
               <ImageListItem>
                 <img src="https://photos.com/images/rendered/default/framed-print/images-medium-5/fuji-mountain-in-autumn-doctoregg.jpg?imgWI=36&imgHI=24&sku=CRQ13&mat1=PM918&mat2=&t=2&b=2&l=2&r=2&off=0.5&frameW=0.875" alt={image.imageTitle}/>
               </ImageListItem>
           })}
       </ImageList> */}
        <ImageList>
        <img src="https://photos.com/images/rendered/default/framed-print/images-medium-5/fuji-mountain-in-autumn-doctoregg.jpg?imgWI=36&imgHI=24&sku=CRQ13&mat1=PM918&mat2=&t=2&b=2&l=2&r=2&off=0.5&frameW=0.875" alt="asd"/>
        </ImageList>
   </div>
   );
}
export default PhotoGallery;