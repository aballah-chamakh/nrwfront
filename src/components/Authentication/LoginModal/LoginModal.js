import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './loginmodal-scss.scss';
import { HOST_URL, TRANS_COMAPANY_LOGIN_ERROR } from '../../../../config';
import Modal from 'react-bootstrap/Modal'
import jwt_decode from "jwt-decode";
import $ from "jquery"

class LoginModal extends React.Component {
  state = {
    form: { email: '', password: '' },
  }
  handleSubmit = (credentials, { setSubmitting, resetForm }) => {
    console.log("Host url => " + HOST_URL)
    axios.post(HOST_URL + '/api/token/', credentials).then(res => {
      let token = res.data.access;
      let refreshToken = res.data.refresh;
      let decoded_token = jwt_decode(token)

      localStorage.setItem('token', token)
      localStorage.setItem('refresh_token', refreshToken)
      this.props.trans_company_login()
      let trans_company_slug = decoded_token.trans_company_slug
      this.props.history.push('/trans_company/' + trans_company_slug + '/')
    }).catch(err => {

      $(".trans-company-login-error").show(200).css('display', 'flex').delay(5000).hide(200)
      resetForm()
      setSubmitting(false)

    })


  }

  validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  })
  close = () => {
    $(".trans-company-login-error").hide(200)
  }

  render() {
    return (
      <Modal show={this.props.loginModalVisibility} onHide={this.props.close} animation={true}  >
        <div class='trans-company-login-container'>
          <div class="alert alert-danger trans-company-login-error" role="alert">
            <p>{STUDENT_LOGIN_ERROR}</p>
            <i class="material-icons" onClick={this.close} >close</i>
          </div>
          <div class='trans-company-login-form'>
            <p class="trans-company-login-form-title">Connectez-vous à votre compte</p>
            <Formik
              onSubmit={this.handleSubmit}
              initialValues={this.state.form}
              validationSchema={this.validationSchema}
            >
              {({ errors, isSubmitting, touched }) => (
                <Form style={{ width: "100%" }}>

                  <div class='form-group'>
                    <label htmlFor='email' >Email</label>
                    <div>
                      <Field class={errors.email && touched.email ? 'form-control  is-invalid' : 'form-control'} name="email" id="email" placeholder="Email" />
                      <div class="invalid-feedback">
                        {errors.email && touched.email ? <p>{errors.email}</p> : null}
                      </div>
                    </div>
                  </div>
                  <div class='form-group '>
                    <label htmlFor='password' >mot de passe</label>
                    <div>
                      <Field class={errors.password && touched.password ? 'form-control  is-invalid' : 'form-control'} name="password" type="password" id="password" placeholder="mot de passe" />
                      <div class="invalid-feedback">
                        {errors.password && touched.password ? <p>{errors.password}</p> : null}
                      </div>
                    </div>
                  </div>
                  <center>
                    <button type='submit' class="login-modal-btn" disabled={isSubmitting}>login</button>
                  </center>
                </Form>


              )}

            </Formik>

          </div>
        </div>
      </Modal>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    trans_company_login: () => dispatch({ type: 'trans_company_login' }),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginModal));
