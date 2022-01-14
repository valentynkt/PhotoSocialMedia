import React from "react";
import {
  CircularProgress,
  Typography,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const PhotoDetails = () => {
  const { id } = useParams();

  const [photo, setPhoto] = useState({
    image: null,
    user: null,
  });
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const userDetailsFunc=(id) =>{
    let path=user?user.role==='user'?`/user/userinfo/${id}`:`/admin/users/${id}`:`/`;
    navigate(path);
  }

  useEffect(() => {
    try {
      axios.get(`Images/${id}`).then((res) => {
        axios.get(`User/${res.data.personId}`)
          .then((result) =>
            setPhoto((prevValue) => ({ image:res.data, user: result.data }))
          );
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  if (photo.image && photo.user) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={photo.image.imageTitle} subheader="September 14, 2016" />
        <CardMedia
          component="img"
          height="200"
          image={`data:image/png;base64,${photo.image.imageData}`}
          alt={photo.image.imageTitle}
        />
        <CardContent>
          <Typography variant="body1" color="blue" onClick={() => userDetailsFunc(photo.user.id)} style={{cursor : 'pointer'}}>
            {photo.user.firstName+" "+photo.user.secondName}
          </Typography>
          <Typography variant="body1" color="blue" onClick={() => userDetailsFunc(photo.user.id)} style={{cursor : 'pointer'}}>
            {photo.user.email}
          </Typography>
        </CardContent>
      </Card>
    );
  } else
    return (
      <div>
        <CircularProgress size={120} />
      </div>
    );
};

export default PhotoDetails;
