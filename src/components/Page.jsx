import Draggable from 'react-draggable';
import React from 'react';
import { useXarrow } from 'react-xarrows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const pageStyle = {
  borderRadius: '10px',
  width: '50px',
  height: '50px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

const Page = ({ initialOffset = undefined,_id,title,color,bgcolor,icon}) => {

  const updateXarrow = useXarrow();
  
  let moreStyle = {};
  if (initialOffset) moreStyle = { position: 'absolute', left: initialOffset.x, top: initialOffset.y };
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div  
        id={'page-'+_id} 
        className="page" 
        style={{ backgroundColor:bgcolor,...pageStyle, ...moreStyle }}
      >
      <FontAwesomeIcon id={'icon-'+_id}   icon={icon} style={{color:color,fontSize:22}} />
        <span  id={'span-'+_id} className='page-title'>{title}</span>
      </div>
    </Draggable>
  );
};

export default Page;