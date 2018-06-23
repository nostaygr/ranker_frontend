import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Header } from './Header';
import { EditSubject } from './EditSubject';
import { Subject } from './Subject';
import { Subjects } from './Subjects';
import { Login } from './Login';
import { OmniauthLogin } from './OmniauthLogin';
import { Logout } from './Logout';
import { Signup } from './Signup';
import {
  signup,
  login,
  setLogout,
  omniauthLogin,
  getSubjects,
  getSubject,
  deleteSubject,
  subjectsUpdated,
  getItems,
  deleteItem,
  getEditableItems,
  createSubject,
  createItem,
  publishItems,
} from './common';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
    };
  }

  findSubjectById(subjectId) {
    return this.state.subjects.filter(subject => subject.id === subjectId)[0];
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Subjects
                subjects={this.state.subjects}
                getSubjectsCallback={userId => getSubjects(this, userId)}
                deleteSubjectCallback={subjectId => deleteSubject(this, subjectId)}
                createSubjectCallback={(title, userId) => {
                  createSubject(this, title, userId);
                }}
              />
            )}
          />
          <Route path="/login" render={() => <Login onClick={login} />} />
          <Route path="/omniauth-login" render={() => <OmniauthLogin onClick={omniauthLogin} />} />
          <Route path="/logout" render={() => <Logout setLogout={setLogout} />} />
          <Route path="/signup" render={() => <Signup onClick={signup} />} />
          <Route
            path="/subjects/:id/edit"
            render={props => (
              <EditSubject
                items={this.state.items}
                subject={this.state.subject}
                getItemsCallback={subjectId => getEditableItems(this, subjectId)}
                getSubjectCallback={subjectId => getSubject(this, subjectId)}
                createItemsCallback={(name, subjectId) => {
                  createItem(this, name, subjectId);
                }}
                deleteItemCallback={itemId => deleteItem(this, itemId)}
                publishItemsCallback={(subjectId, isPublic) =>
                  publishItems(this, subjectId, isPublic)
                }
                {...props}
              />
            )}
          />
          <Route
            path="/subjects/:id"
            render={props => (
              <Subject
                items={this.state.items}
                subject={this.state.subject}
                getItemsCallback={subjectId => getItems(this, subjectId)}
                getSubjectCallback={subjectId => getSubject(this, subjectId)}
                createItemsCallback={(name, subjectId) => {
                  createItem(this, name, subjectId);
                }}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
