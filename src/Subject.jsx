import React from 'react';
import ReactDOM from 'react-dom';
import { createItem } from './common';

export class Subject extends React.Component {
  componentDidMount() {
    this.props.getItemsCallback(this.props.match.params.id);
    this.props.getSubjectCallback(this.props.match.params.id);
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
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      );
    }
    // FIXME: 表示しない場合も loading... と表示されてしまう
    return <div>loading...</div>;
  }
}
