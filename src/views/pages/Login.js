import React from "react"
import { Lock, Mail } from "react-feather"
import { connect } from "react-redux"
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Row } from "reactstrap"
import "../../assets/scss/pages/authentication.scss"
// import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { history } from "../../history"
import axios from '../../http'
import { LoginAction } from '../../redux/actions/auth'

class Login extends React.Component {
  state = {
    username : "archisdi",
    password: "archisdi"
  }

  async login() {
    await axios.post('/auth/login', { username: this.state.username, password: this.state.password })
      .then(res => {
        this.props.LoginAction(res.data);
        history.push("/");
      })
      .catch(() => {
        // alert
      })
  }

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Card className="rounded-0 mt-0 px-2">
                      <CardBody>
                        <Form onSubmit={e => e.preventDefault()}>
                          <br/>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input type="text" placeholder="Username" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Username</Label>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                            <div className="form-control-position">
                              <Lock size={15} />
                            </div>
                            <Label>Password</Label>
                          </FormGroup>
                          {/* <FormGroup className="d-flex justify-content-between align-items-center">
                            <Checkbox color="primary" icon={<Check className="vx-icon" size={16} />} label="Remember me" />
                          </FormGroup> */}
                          <div className="d-flex justify-content-center">
                            <Button.Ripple type="relief" color="danger" onClick={() => this.login()} block={true}>
                                Login 
                            </Button.Ripple>
                          </div>
                        </Form>
                      </CardBody>
                </Card>
      </Row>
    )
  }
}

export default connect(null, { LoginAction })(Login);
