import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { callAPI } from "services/directCall";
import { AuthenticateUser, SetUserDetails, setUserID } from "store/States/User";
import { LoginBody } from "store/States/User/action";
import Logo from "../../Assets/logo_transparent.png";

const SignIn = ({ AuthenticateUser, SetUserDetails, setUserID }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState("");
  const [errorText, setErrorText] = useState("");
  const loginUser = () => {
    callAPI(
      LoginBody({
        ...userInfo,
      }),
      "login",
      (userData) => {
        if (userData.error) {
          setErrorText("Incorrect email or password");
        } else {
          AuthenticateUser();
          SetUserDetails(userData);
          setUserID(userData._id);
          // setRedirect("/")
          window.location.reload();
        }
      }
    );
  };

  return redirect.length > 0 ? (
    <Redirect to={redirect} />
  ) : (
    <div className="authContainer">
      <img width="100" height="100" src={Logo} />
      <CardHeader className="bg-background">Sign In</CardHeader>
      <CardBody>
        <FormGroup>
          <Label>Email</Label>
          <Input
            placeholder="email"
            onChange={({ currentTarget: { value } }) =>
              setUserInfo({
                ...userInfo,
                email: value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            placeholder="password"
            type="password"
            onChange={({ currentTarget: { value } }) =>
              setUserInfo({
                ...userInfo,
                password: value,
              })
            }
          />
        </FormGroup>
        <p style={{ color: "red" }}>{errorText}</p>
        <Col align="center">
          <Button onClick={loginUser}>Login</Button>
        </Col>
      </CardBody>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  AuthenticateUser: () => dispatch(AuthenticateUser()),
  SetUserDetails: (userData) => dispatch(SetUserDetails(userData)),
  setUserID: (_id) => dispatch(setUserID(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
