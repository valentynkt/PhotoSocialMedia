import React,{ useState } from "react";
import User from "./User";
function EditProfile() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: user.firstName,
    secondName: user.secondName,
    about: user.about,
    gender: user.gender,
    email: user.email,
    phone: user.phoneNumber,
    password: "",
    confirmPassword:""
  });
  const [registered, setRegistered] = useState(false);

  const handleChangeFunc = (event) => {
    const { name, value } = event.target

    setNewUser((prevValue) => ({
        ...prevValue,
        [name]: value,
    }))
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (user.password!==user.confirmPassword) {
      setError("Confirm password and password are different")
    }
    else{
      const data = {
        FirstName: user.firstName,
        SecondName: user.secondName,
        About: user.about,
        Gender: user.gender,
        Email: user.email,
        PhoneNumber: user.phone,
        Password: user.password,
      };
      try {
        await axios.post("User/signup", data);
        setRegistered(true);
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 400) {
          setError(err.response.data.message);
        } else {
          setError("something went wrong. Please try again");
        }
        console.log("error >>>", err);
      }
    } 
  };
  if (registered) {
    return <Navigate to={"/login"} />;
  }

  return (
    <User>
      <div className="auth-inner">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <h5 class="user-name">
                      {user.firstName + " " + user.secondName}
                    </h5>
                    <h6 class="user-email">{user.email}</h6>
                  </div>
                  <div class="about">
                    <h5>About</h5>
                    <p>
                      I'm Yuki. Full Stack Designer I enjoy creating
                      user-centric, delightful and human experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="firstName">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="eMail"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="about">About</label>
                      <textarea
                        class="form-control"
                        id="about"
                        placeholder="Write About Yourself"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="gender">Gender</label>
                      <select class="form-select  mb-3">
                        <option defaultValue value="male">
                          Male
                        </option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Password</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Password</label>
                      <input
                        type="name"
                        class="form-control"
                        id="Street"
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">Confirm Password</label>
                      <input
                        type="name"
                        class="form-control"
                        id="ciTy"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </User>
  );
}
export default EditProfile;
