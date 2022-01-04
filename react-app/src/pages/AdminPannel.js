import React from "react";
import Admin from "../components/Admin";
import IconButton from "@material-ui/core/IconButton";
import { Edit,ClearOutlined,AccountBox,PhotoLibrary } from "@material-ui/icons";

const AdminPannel = () => {
  return (
    <Admin>
      <div class="auth-inner">
        <div class="table-title">
          <div class="row">
            <div class="col-xs-5">
              <h2>
                User <b>Management</b>
              </h2>
            </div>
            <div class="col-xs-7">
              <a href="#" class="btn btn-primary">
                <i class="material-icons">&#xE147;</i> <span>Add New User</span>
              </a>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <a href="#">Valentyn valentyn</a>
              </td>
              <td>04/10/2013 sdads</td>
              <td>valikit15@gmail.com</td>
              <td>Admin</td>
              <td>
              <IconButton color="primary">
        <Edit />
      </IconButton>
      <IconButton color="secondary">
        <ClearOutlined />
      </IconButton>
      <IconButton color="primary">
        <AccountBox />
      </IconButton>
      <IconButton color="primary">
        <PhotoLibrary />
      </IconButton>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <a href="#">Valentyn valentyn</a>
              </td>
              <td>04/10/2013 sdads</td>
              <td>valikit15@gmail.com</td>
              <td>Admin</td>
              <td>
                <a
                  href="#"
                  class="settings"
                  title="Settings"
                  data-toggle="tooltip"
                >
                  <i class="material-icons">&#xE8B8;</i>
                </a>
                <a href="#" class="delete" title="Delete" data-toggle="tooltip">
                  <i class="material-icons">&#xE5C9;</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Admin>
  );
};
export default AdminPannel;
