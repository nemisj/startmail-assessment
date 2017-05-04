import { load, getMailBoxItem, getMessagesByMailbox, _filterMailboxMessagses, LOAD, LOAD_SUCCESS } from '../../src/redux/ducks/messages.js';

describe('reducers/messages.spec.js', () => {
  it('should dispatch correct result', () => {
    const dispatch = sinon.spy();
    const loadFnc = load('the-id');
    const state = {
      mailboxes: {
        data: []
      }
    };

    return loadFnc(dispatch, () => state)
      .then(() => {
        expect(dispatch).to.be.calledTwice;
        const args1 = dispatch.getCall(0).args[0];
        expect(args1).to.be.deep.equal({
          type: LOAD,
          mailboxId: 'the-id'
        });

        const args2 = dispatch.getCall(1).args[0];
        expect(args2).to.have.property('type').and.be.equal(LOAD_SUCCESS);
      });
  });

  it('should filter mailboxes correctly', () => {
    const state = {
      mailboxes: {
        data: [
          {
            id: 'the-id',
            messages: [ '1', '3' ]
          }, 
          {
            id: 'the-id-two',
            messages: [ '2', '4' ]
          }
        ]
      }
    };
    const messages = [
      { id: '1', name: 'three-one' },
      { id: '2', name: 'two-one' },
      { id: '3', name: 'three-two' },
      { id: '4', name: 'one-one' }
    ];

    const result = _filterMailboxMessagses('the-id', messages, state);
    expect(result).to.be.deep.equal([
      { id: '1', name: 'three-one' },
      { id: '3', name: 'three-two' }
    ]);
  });
});
