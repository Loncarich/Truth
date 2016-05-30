import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LoginHeader from './login_header';
import Paper from 'material-ui/Paper';
import { cyan100, lightBlue50, teal50 } from 'material-ui/styles/colors';

class Signup extends Component {
  handleFormSubmit(formProps){
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage && this.props.errorMessage !== 'Incorrect Login Information') {
      return (
        <div className= 'alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { username, password, passwordConfirm }} = this.props;
    const style = {
      height: 750,
      //backgroundColor: teal50
    };

    return (
      <div>
        <LoginHeader value={1} />
        <Paper style= {style} zDepth= {4}>
        <div className= 'centered-Login'>
        <form onSubmit= {handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className= 'form-group' >
            <TextField halfWidth hintText= 'Username' { ...username }/>
            {username.touched && username.error && <div className= 'error'>{username.error}</div>}
          </fieldset>
          <fieldset className= 'form-group'>
            <TextField halfWidth type= 'password' hintText= 'Password' { ...password }/>
            {password.touched && password.error && <div className= 'error'>{password.error}</div>}
          </fieldset>
          <fieldset className= 'form-group'>
            <TextField halfWidth type='password' hintText= 'Confirm Password' { ...passwordConfirm }/>
            {passwordConfirm.touched && passwordConfirm.error && <div className= 'error'>{passwordConfirm.error}</div>}
          </fieldset>
          {this.renderAlert()}
          <RaisedButton type='submit' label= 'Sign Up' primary= {true}/>      
          <Link to= '/login'>
           <FlatButton label='Login' secondary= {true} />
          </Link>
        </form>
        </div>
        </Paper>
      </div>
      );
  }
}

function validate(formProps) {
  const errors= {};

  if(!formProps.username) {
    errors.username = 'Please enter a username';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  if(formProps.username && formProps.username.indexOf('.') !== -1) {
    errors.username= 'Username must not contain periods';
  }

  if(formProps.password && formProps.password.indexOf('.') !== -1) {
    errors.password= 'Password must not contain periods';
  }

  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);