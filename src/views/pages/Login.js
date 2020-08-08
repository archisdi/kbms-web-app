import React from "react";
import { Lock, Mail } from "react-feather";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import "../../assets/scss/pages/authentication.scss";
import { history } from "../../history";
import axios from "../../http";
import { LoginAction } from "../../redux/actions/auth";
import { ToastContainer, toast } from "react-toastify";

class Login extends React.Component {
  state = {
    username: "archisdi",
    password: "archisdi",
    is_loading: false,
  };

  async login() {
    this.toggleLoading();
    await axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        this.toggleLoading();
        this.props.LoginAction(res.data);
        history.push("/");
      })
      .catch(() => {
        this.toggleLoading();
        toast.error("Invalid Credential", {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          toastId: "login",
        });
      });
  }

  toggleLoading() {
    this.setState({
      is_loading: !this.state.is_loading,
    });
  }

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Card className="rounded-1">
          <CardBody>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Col lg={12}>
                <br></br>
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                  <div className="form-control-position">
                    <Mail size={15} />
                  </div>
                  <Label>Username</Label>
                </FormGroup>
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <div className="form-control-position">
                    <Lock size={15} />
                  </div>
                  <Label>Password</Label>
                </FormGroup>
                <Button.Ripple
                  className="btn-block"
                  type="relief"
                  color="danger"
                  onClick={() => this.login()}
                  block={true}
                >
                  {this.state.is_loading ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    "Login"
                  )}
                </Button.Ripple>
              </Col>
            </Form>
          </CardBody>
          <ToastContainer />
        </Card>
      </Row>
    );
  }
}

export default connect(null, { LoginAction })(Login);
