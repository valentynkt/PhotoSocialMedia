import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ImageList, ImageListItem } from "@material-ui/core";
const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get("Images");
    const data = await response.data;
    setPhotos(data);
  };

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
        <ImageList cellHeight={350} cols={3}>
          {photos.map((image) => (
            <ImageListItem key={image.id} cols={(image.width/1200/2).toFixed(0)}>
              <img
                src={`data:image/png;base64,${image.imageData}`}
                alt={image.imageTitle}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
};
export default PhotoGallery;
