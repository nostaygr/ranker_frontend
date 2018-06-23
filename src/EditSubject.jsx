import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { createItem } from './common';

class ItemCreateForm extends React.Component {
  handleSubmit(event, subjectId, onClick) {
    event.preventDefault();
    const name = event.target.name.value;
    if (!name) {
      return;
    }
    onClick(name, subjectId);

    ReactDOM.findDOMNode(event.target.name).value = '';
  }

  render() {
    return (
      <form
        id="subject"
        className="commentForm"
        onSubmit={e => this.handleSubmit(e, this.props.subjectId, this.props.onClick)}
      >
        <input type="text" name="name" placeholder="name" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

class ItemPublishButton extends React.Component {
  handleSubmit(event, subjectId, isPublic, onClick) {
    event.preventDefault();
    onClick(subjectId, isPublic);
  }

  render() {
    return (
      <form
        id="itemPublishButton"
        className="commentForm"
        onSubmit={e =>
          this.handleSubmit(e, this.props.subjectId, this.props.isPublic, this.props.onClick)
        }
      >
        <input type="submit" value={this.props.isPublic ? '非公開にする' : '公開する'} />
      </form>
    );
  }
}

export class EditSubject extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('login') === 'true') {
      this.props.getItemsCallback(this.props.match.params.id);
      this.props.getSubjectCallback(this.props.match.params.id);
    }
  }

  deleteItem(event, onClick) {
    event.preventDefault();
    onClick(event.target.itemId.value);
  }

  render() {
    const subject = this.props.subject;
    const items = this.props.items;
    if (subject) {
      return (
        // item を表示する
        <div>
          <div>{`${subject.title} [${subject.is_public ? '公開' : '非公開'}]`}</div>
          <table>
            {items &&
              items.map(item => (
                <tbody key={item.id}>
                  <tr>
                    <td>
                      {item.rank}:{item.name}
                    </td>
                    <td>
                      <form
                        id="deleteItem"
                        className="form"
                        onSubmit={e => this.deleteItem(e, this.props.deleteItemCallback)}
                      >
                        <input type="hidden" name="itemId" value={item.id} />
                        <input type="submit" value="Delete" />
                      </form>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          <ItemCreateForm
            subjectId={subject.id}
            onClick={(name, subjectId) => {
              this.props.createItemsCallback(name, subjectId);
            }}
          />
          <Link to={`/subjects/${subject.id}`}>プレビュー</Link>
          <ItemPublishButton
            subjectId={subject.id}
            isPublic={subject.is_public}
            onClick={(subjectId, isPublic) => {
              this.props.publishItemsCallback(subjectId, isPublic);
            }}
          />
        </div>
      );
    }
    return <div>loading...</div>;
  }
}
