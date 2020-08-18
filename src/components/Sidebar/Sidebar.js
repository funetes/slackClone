import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarOption from '../SidebarOption';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { useStateValue } from '../../context/StateProvider';

import db from '../../Database/firebase';
function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    db.collection('rooms').onSnapshot(snapShot => {
      setChannels(
        snapShot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__info'>
          <h2>Clever Programmer</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      {/*  여기서 props보내는것 잘 보기 */}
      {/* compoent가 prop으로 보내질때는 첫글자를 대문자로 쓴다. */}
      <SidebarOption Icon={InsertCommentIcon} title='Threads' />
      <SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
      <SidebarOption Icon={DraftsIcon} title='Saved items' />
      <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
      <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
      <SidebarOption Icon={AppsIcon} title='Apps' />
      <SidebarOption Icon={FileCopyIcon} title='File browser' />
      <SidebarOption Icon={ExpandLessIcon} title='Show less' />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title='Show more' />
      <hr />
      {/* addChannelOption props로 컴포넌트에 추가적인 일을 하게 할수 있음. */}
      <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' />

      {/* Connent to dB and list all the channels */}
      {/* <SidebarOption ... /> */}
      {channels.map(channel => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
