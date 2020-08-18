import React from 'react';
import './SidebarOption.css';
import { useHistory } from 'react-router-dom';
import db from '../../Database/firebase';
// 여기서 props보내는것 잘 보기
// icon이 올수도 있고 안올수도 있기때문에 조건부 랜더링 사용

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const history = useHistory();
  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name');
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };
  return (
    <div
      className='sidebarOption'
      onClick={addChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon className='sidebarOption__icon' />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className='sidebarOption__channel'>
          <span className='sidebarOption__hash'>#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
