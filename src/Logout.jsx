import history from './history';

export function Logout(props) {
  props.setLogout();
  history.push('/');
  return null;
}
