import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

function getLinks() {
  if (localStorage.getItem('login') === 'true') {
    return [
      {
        path: '/',
        name: 'Home',
      },
      {
        path: '/logout',
        name: 'Logout',
      },
      {
        path: '/signup',
        name: 'SignUp',
      },
    ];
  }
  return [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/login',
      name: 'Login',
    },
    {
      path: '/signup',
      name: 'SignUp',
    },
  ];
}

const buttonStyle = {
  color: 'white',
  marginTop: 5,
};

export class Header extends React.Component {
  render() {
    const linkComponent = getLinks().map(({ path, name }, key) => (
      <FlatButton
        label={name}
        key={key}
        style={buttonStyle}
        containerElement={<Link to={path} />}
      />
    ));

    return (
      <header>
        <AppBar
          title={
            <img
              src="/images/ranker_only_text.png"
              width="80px"
              alt="Ranker"
              style={{ position: 'relative', top: '15%' }}
            />
          }
          iconElementLeft={
            <IconButton containerElement={<Link to="/" />}>
              <ActionHome />
            </IconButton>
          }
          iconElementRight={<div>{linkComponent}</div>}
        />
      </header>
    );
  }
}
