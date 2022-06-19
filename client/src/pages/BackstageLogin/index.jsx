import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import LoginHeader from "../../components/BackstageAdminLoginHeader";

function Login() {
  return (
    <>
      <div><LoginHeader/></div>
      <div >
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center  mt-5">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-muted">Welcome!</h1>
                  <p className="text-muted">
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container>
        <Form className="col-lg-6 offset-lg-3">
          <div className="mb-3 mt-3">
            <label for="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
          </div>
          <div className="mb-3">
            <label for="pwd" className="form-label">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"/>
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="remember"/> Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary col-md-12 ">Submit</button>
        </Form>
        </Container>
      </div>
    </>
  );
}

export default Login;
