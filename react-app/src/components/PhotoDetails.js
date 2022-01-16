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

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState({
    image: null,
    user: null,
  });
  const [comments, setComments] = useState(null);
  let user = JSON.parse(localStorage.getItem("user"));
  const [comment, setComment] = useState({
    text: "",
    rating: 1,
  });
  const handleChangeFunc = (event) => {
    const { name, value } = event.target;

    setComment((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleComment = async (e) => {
    e.preventDefault();
    const data = {
      ImageId: parseInt(photo.image.id),
      PersonId: parseInt(user.id),
      Text: comment.text,
      Rating: parseInt(comment.rating),
    };
    await axios.post("/Comments/", data);
    window.location.reload();
  };
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
          .then((result) => setPhoto({ image: res.data, user: result.data }));
      });
      axios.get(`User/comments/imageid/${id}`).then((res) => setComments(res.data));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  if (photo.image && photo.user) {
    return (
      <Card id="PhotoDetailsCard">
        <CardHeader
          title={photo.image.imageTitle}
          subheader="September 14, 2016"
        />
        <div
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            style={{
              width: "auto",
              maxHeight: "1000px"
            }}
            image={`data:image/png;base64,${photo.image.imageData}`}
            alt={photo.image.imageTitle}
          />
        </div>
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
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          {comments.map((elem) => (
            <>
              <ListItem alignItems="flex-start" key={elem.id}>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => userDetailsFunc(elem.personId)}
                      >
                        {elem.personFullName}
                      </span>
                      <p>{elem.commentedOn}</p>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <span>{elem.text}</span>
                      </Typography>
                    </React.Fragment>
                  }
                />
                <span>{elem.rating}&#9733;</span>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
        <form className="yourComment" onSubmit={handleComment}>
          <div className="rating">
            <input
              type="radio"
              name="rating"
              value="5"
              id="5"
              onChange={handleChangeFunc}
            />
            <label htmlFor="5">☆</label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="4"
              onChange={handleChangeFunc}
            />
            <label htmlFor="4">☆</label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="3"
              onChange={handleChangeFunc}
            />
            <label htmlFor="3">☆</label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="2"
              onChange={handleChangeFunc}
            />
            <label htmlFor="2">☆</label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="1"
              onChange={handleChangeFunc}
            />
            <label htmlFor="1">☆</label>
          </div>
          <div className="d-flex flex-row add-comment-section mt-4 mb-4">
            <input
              type="text"
              className="form-control mr-3"
              placeholder="Add comment"
              name="text"
              onChange={handleChangeFunc}
              required
              minLength="6"
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
