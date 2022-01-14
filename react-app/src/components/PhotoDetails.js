import React from 'react';
import { CircularProgress,Typography,CardContent,CardMedia,CardHeader,Card } from "@mui/material";
import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios';
const PhotoDetails = () => {
    const {id} = useParams();
    const [user,setUser] = useState(null);
    const [photo,setPhoto] = useState(null);

    useEffect(() => {
       try {
        axios.get(`Images/${id}`)
        .then(res=>{
            setPhoto(res.data);
            axios.get(`User/${res.data.personId}`).then(
                res=>setUser(res.data)
            )
         });
       } catch (error) {
        console.log(error)
       }
      }, [id])
      if(photo && user)
      {
        return (
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={photo.imageTitle}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="200"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                  <p>Valentyn Kit</p>
                  <p>valikit@gmail.com</p>
    
              </Typography>
            </CardContent>
            </Card>
        );
      }
      else return (<div><CircularProgress size={120} /></div>);
 
};

export default PhotoDetails;