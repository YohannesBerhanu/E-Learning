import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { callAPI } from "services/directCall";
import { UpdateMainBuffer } from "store/States/Buffer/";
import { AddStudent } from "store/States/Students/";
import { AuthenticateUser, SetUserDetails, setUserID } from "store/States/User";
import { PostUser } from "store/States/User/action";
import SignUp from "./Signup";

const Loader = ({
  AuthenticateUser,
  SetUserDetails,
  setUserID,
  UpdateMainBuffer,
}) => {
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState("");

  const _postUser = async (signUpData) => {
    callAPI(AddStudent(signUpData), "postStudent", (studentData) => {
      callAPI(
        PostUser({
          ...signUpData,
          externalID: studentData._id,
        }),
        "postUser",
        (userData) => {
          AuthenticateUser();
          SetUserDetails(userData);
          setUserID(userData._id);
          UpdateMainBuffer({ studentData });
          setRedirect("/");
        }
      );
    });
  };

  return redirect.length > 0 ? (
    <Redirect to={redirect} />
  ) : (
    <SignUp submit={_postUser} />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  AuthenticateUser: () => dispatch(AuthenticateUser()),
  SetUserDetails: (data) => dispatch(SetUserDetails(data)),
  setUserID: (_id) => dispatch(setUserID(_id)),
  UpdateMainBuffer: (data) => dispatch(UpdateMainBuffer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
