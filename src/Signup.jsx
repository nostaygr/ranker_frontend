import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import 'whatwg-fetch';
import { signup } from './common';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameErrorText: '',
      emailErrorText: '',
      passwordErrorText: '',
    };
  }

  onTextFieldChange(event) {
    if (event.target.value) {
      this.setState({
        [`${event.target.name}ErrorText`]: '',
      });
    }
  }

  validate(items) {
    let isValid = true;
    for (const item in items) {
      if (!items[item]) {
        this.setState({
          [`${item}ErrorText`]: `${item} is invalid`,
        });
        isValid = false;
      } else {
        this.setState({
          [`${item}ErrorText`]: '',
        });
      }
    }

    return isValid;
  }

  handleSubmit(event, onClick) {
    // ボタンを押すことによる遷移を抑制
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (!this.validate({ name, email, password })) {
      return;
    }
    onClick(name, email, password);

    // valueを空にする
    ReactDOM.findDOMNode(event.target.name).value = '';
    ReactDOM.findDOMNode(event.target.email).value = '';
    ReactDOM.findDOMNode(event.target.password).value = '';
  }

  render() {
    return (
      <form
        id="signup"
        className="commentForm"
        onSubmit={event => this.handleSubmit(event, this.props.onClick)}
      >
        <TextField
          name="name"
          placeholder="name"
          errorText={this.state.nameErrorText}
          onChange={this.onTextFieldChange.bind(this)}
        />
        <br />
        <TextField
          name="email"
          placeholder="email"
          errorText={this.state.emailErrorText}
          onChange={this.onTextFieldChange.bind(this)}
        />
        <br />
        <TextField
          name="password"
          placeholder="password"
          errorText={this.state.passwordErrorText}
          onChange={this.onTextFieldChange.bind(this)}
        />
        <br />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export function Signup(props) {
  return <SignupForm onClick={props.onClick} />;
}
