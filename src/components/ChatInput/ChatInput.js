import React, { useState } from 'react';
import './ChatInput.css';
import { useStateValue } from '../../context/StateProvider';
import db from '../../Database/firebase';
import firebase from 'firebase';

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();
  const sendMessage = e => {
    e.preventDefault();
    console.log('skdjskjdk');
    if (channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
  };
  const onChange = e => {
    setInput(e.target.value);
  };
  return (
    <div className='chatInput'>
      <form>
        <input
          vlaue={input}
          onChange={onChange}
          placeholder={`Message #${channelName}`}
        />
        <button type='submit' onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
