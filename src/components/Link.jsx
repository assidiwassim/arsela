
import React, { useState } from 'react';
import Xarrow from 'react-xarrows';

const Link = ({_id,start,end,title, selectedLinkId}) => {

 const [state, setState] = useState({ color: 'gray' });
 const defProps = {
   passProps: {
     className: 'xarrow',
     id:'link-'+_id,
     onMouseEnter: () => setState({ color: 'IndianRed' }),
     onMouseLeave: () => setState({ color: 'gray' }),
     cursor: 'pointer',
   },
   labels:{ middle: title },
   strokeWidth:2,
   path:"grid",
   gridBreak:'20%',
   curveness:2,
   animateDrawing:0.3
 };
 let color = state.color;
   if(selectedLinkId===_id){
       color='red'
   }
 return <Xarrow {...{start,end, ...defProps, ...state, color }} />;
}

export default Link;