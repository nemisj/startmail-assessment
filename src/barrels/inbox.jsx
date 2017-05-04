import React from 'react';  
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Grid from '../components/grid.jsx';

import styles from './inbox.sass';

import { load as loadMessages, getMessagesByMailbox } from '../redux/ducks/messages.js';

class Mailbox extends React.Component {
  renderEmailItem() {
    if (this.props.emailId) {
      return (
        <div>Email: {this.props.emailId}</div>
      );
    }
    return null;
  }

  componentDidMount() {
    this.props.loadMessages(this.props.mailboxId);
  }

  render() {
    const emails = this.props.messagesState.messages.map(message => ({
      from: message.origin.from[0].name,
      subject: message.subject,
      createdAt: message.received
    }));

    const viewer = this.renderEmailItem();
    let viewerPane = null;
    if (viewer) {
      viewerPane = <div className="col">{viewer}</div>
    }

    return (
      <div className={`container-fluid full-height`}>
        <div className="row full-height">
          <div className="col no-gutters">
            <Grid items={emails} onClick={this.onClick} />
          </div>
          {viewerPane}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  messagesState: getMessagesByMailbox(props.mailboxId, state)
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: (id) => dispatch(loadMessages(id))
});

const ConnectedMailbox= connect(
  mapStateToProps,
  mapDispatchToProps
)(Mailbox);

export default ConnectedMailbox;
