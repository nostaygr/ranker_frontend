import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class SubjectCreateForm extends React.Component {
  handleSubmit(event, onClick) {
    event.preventDefault();
    const title = event.target.title.value;
    if (!title) {
      return;
    }
    onClick(title, localStorage.getItem('userId'));

    ReactDOM.findDOMNode(event.target.title).value = '';
  }

  render() {
    return (
      <form
        id="subject"
        className="commentForm"
        onSubmit={e => this.handleSubmit(e, this.props.onClick)}
      >
        <input type="text" name="title" placeholder="title" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export class Subjects extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('login') === 'true') {
      this.props.getSubjectsCallback(localStorage.getItem('userId'));
    }
  }

  deleteSubmit(event, onClick) {
    event.preventDefault();
    onClick(event.target.subjectId.value);
  }

  render() {
    const subjects = this.props.subjects;

    if (localStorage.getItem('login') === 'true') {
      return (
        <div>
          <table>
            {subjects &&
              subjects.map(subject => (
                <tbody key={subject.id}>
                  <tr>
                    <td>
                      <Link to={`/subjects/${subject.id}/edit`}>{subject.title}</Link>
                    </td>
                    <td>
                      <form
                        id="deleteSubject"
                        className="form"
                        onSubmit={e => this.deleteSubmit(e, this.props.deleteSubjectCallback)}
                      >
                        <input type="hidden" name="subjectId" value={subject.id} />
                        <input type="submit" value="Delete" />
                      </form>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          <SubjectCreateForm
            onClick={(title, userId) => {
              this.props.createSubjectCallback(title, userId);
            }}
          />
        </div>
      );
    }
    return null;
  }
}
