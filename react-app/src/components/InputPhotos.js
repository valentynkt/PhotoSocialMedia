import React from "react";
import { TextField } from "@mui/material";
const InputPhotos = (props) => {
  return (
    <form style={{ margin: "2rem 0" }}>
      <TextField onChange={props.change} fullWidth label="Search for photos" />
    </form>
  );
};
export default InputPhotos;
