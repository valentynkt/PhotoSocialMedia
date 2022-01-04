import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ImageList, ImageListItem,ImageListItemBar } from "@material-ui/core";
import InputPhotos from "./InputPhotos";
const PhotoGallery = (props) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData,setformData] = useState('');

  const fetchData = async (input) => {
    setLoading(true);
    if(props.userId){

      if (!input) {
        const response = await axios.get("Images/userphotos/"+props.userId);
        const data = await response.data;
        setPhotos(data);
      }
      else{
        const response = await axios.get("Images/userphotos/"+props.userId+"/"+input);
        const data = await response.data;
        setPhotos(data);
      }
    }
    else{
      if (!input) {
        const response = await axios.get("Images");
        const data = await response.data;
        setPhotos(data);
      }
      else{
        const response = await axios.get("Images/bytitle/"+input);
        const data = await response.data;
        setPhotos(data);
      }
    }
  };

  const handleChange=(event)=>{
    setformData(event.target.value);
    console.log(formData);
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    fetchData(formData);
    setLoading(false);
  }
  const findUserById= async (id) =>{
    const response = await axios.get("User/"+id);
    const user = await response.data;
    return user;
  }
  useEffect(() => {
    (async () => {
      await fetchData();
      console.log("In useEffect: "+photos);
      setLoading(false);
    })()

    return () => {
        console.log("Returned: "+photos);
    }
  }, [])

  if (loading) return <CircularProgress size={120} />;
  else
    return (
      <div>
        <InputPhotos change={handleChange} submit={handleSubmit}/>
        <ImageList rowHeight={350} cols={2}>
          {photos.map((image) => (
            <ImageListItem key={image.id}>
              <img
                src={`data:image/png;base64,${image.imageData}`}
                alt={image.imageTitle}
              />
              <ImageListItemBar key={image.id} title={image.imageTitle} subtitle={("Person id: "+image.personId)}/>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
};
export default PhotoGallery;
