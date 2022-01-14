import React from "react";
import {
  CircularProgress,
  Typography,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const PhotoDetails = () => {

  const { id } = useParams();

  const [photo, setPhoto] = useState({
    image: null,
    user: null,
  });
  let user = JSON.parse(localStorage.getItem("user"));
  const [comment,setComment] = useState({
    text: "",
    rating: 1,
  });
  const handleChangeFunc = (event) => {
    const { name, value } = event.target
  
    setComment((prevValue) => ({
        ...prevValue,
        [name]: value,
    }))
  }
  const handleComment = (e)=>{
    e.preventDefault();
  }
  const navigate = useNavigate();
  const userDetailsFunc = (id) => {
    let path = user
      ? user.role === "user"
        ? `/user/userinfo/${id}`
        : `/admin/users/${id}`
      : `/`;
    navigate(path);
  };

  useEffect(() => {
    try {
      axios.get(`Images/${id}`).then((res) => {
        axios
          .get(`User/${res.data.personId}`)
          .then((result) =>
            setPhoto((prevValue) => ({ image: res.data, user: result.data }))
          );
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  if (photo.image && photo.user) {
    return (
      <Card>
        <CardHeader
          title={photo.image.imageTitle}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="200"
          image={`data:image/png;base64,${photo.image.imageData}`}
          alt={photo.image.imageTitle}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="blue"
            onClick={() => userDetailsFunc(photo.user.id)}
            style={{ cursor: "pointer" }}
          >
            {photo.user.firstName + " " + photo.user.secondName}
          </Typography>
          <Typography
            variant="body1"
            color="blue"
            onClick={() => userDetailsFunc(photo.user.id)}
            style={{ cursor: "pointer" }}
          >
            {photo.user.email}
          </Typography>
        </CardContent>

        <List
          sx={{ width: "100%", maxWidth: "500px", bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <form className="yourComment" onSubmit={handleComment}>
          <div className="rating">
            <input type="radio" name="rating" value="5" id="5" />
            <label for="5">☆</label>{" "}
            <input type="radio" name="rating" value="4" id="4" onChange={handleChangeFunc}/>
            <label for="4">☆</label>{" "}
            <input type="radio" name="rating" value="3" id="3" onChange={handleChangeFunc}/>
            <label for="3">☆</label>{" "}
            <input type="radio" name="rating" value="2" id="2" onChange={handleChangeFunc}/>
            <label for="2">☆</label>{" "}
            <input type="radio" name="rating" value="1" id="1" onChange={handleChangeFunc}/>
            <label for="1">☆</label>{" "}
          </div>
          <div className="d-flex flex-row add-comment-section mt-4 mb-4">
          <input
            type="text"
            className="form-control mr-3"
            placeholder="Add comment"
            name="text"
            onChange={handleChangeFunc}
            required minLength="6"
          />
          <button className="btn btn-primary" type="submit">
            Comment
          </button>
        </div>
        </form>
      
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
