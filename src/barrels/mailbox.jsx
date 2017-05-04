import React from 'react';  
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Grid from '../components/grid.jsx';

import styles from './mailbox.sass';

import { load as loadMessages, getMessagesByMailbox } from '../redux/ducks/messages.js';

class Mailbox extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  findeCurrentEmail() {
    const emailId = this.props.emailId;
    let emailItem = null;
    if (emailId) {
      this.props.messagesState.messages.some(message => {
        if (String(message.id) === String(emailId)) {
          emailItem = message;
          return true;
        }
      });
    }

    return emailItem;
  }

  renderEmailItem() {
    const emailItem = this.findeCurrentEmail();
    if (emailItem) {
      const to = emailItem.origin.reply_to[0] || {};
      return (
        <div className={`container-fluid full-height`}>
          <div className="row">
            <div className="col">
              <span className={styles.subject}>{emailItem.subject}</span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              Time: {moment(emailItem.received).format('dddd, DD MM YYYY, hh:mm A')}
            </div>
          </div>
          <div className="row">
            <div className="col">
              From: {emailItem.origin.from[0].name}
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.loadMessages(this.props.mailboxId);
  }

  onClick(item) {
    const history = this.props.history;
    const match = this.props.match;
    const origin = match.url.replace(/\/view.*/, '');
    history.push(`${origin}/view/${item}`);
  }

  render() {
    const emails = this.props.messagesState.messages.map(message => ({
      id: message.id,
      from: message.origin.from[0].name,
      subject: message.subject,
      createdAt: message.received
    }));

    const viewer = this.renderEmailItem();
    let viewerPane = null;
    if (viewer) {
      viewerPane = <div className="col">{viewer}</div>
    }

    const selected = [];
    if (this.props.emailId) {
      selected.push(this.props.emailId);
    }

    return (
      <div className={`inbox ${styles.inbox} container-fluid full-height`}>
        <div className="row full-height">
          <div className="col no-gutters">
            <Grid items={emails} selected={selected} onClick={this.onClick} />
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

export default withRouter(ConnectedMailbox);
