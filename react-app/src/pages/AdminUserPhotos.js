import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Admin from "../components/Admin";
import PhotoGallery from "../components/PhotoGallery";
const AdminUserPhotos = () => {
  const { id } = useParams();
  return (
    <Admin>

        <PhotoGallery userId={id} />
    </Admin>
  );
};

export default AdminUserPhotos;
