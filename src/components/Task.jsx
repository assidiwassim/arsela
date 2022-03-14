
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Task = ({_id,title,color,bgcolor,icon}) => {

    const taskStyle = {
        borderRadius: '10px',
        width: '50px',
        height: '50px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    };

    return (
        <div 
            id={'task-'+_id}  
            className="task" 
            style={{ backgroundColor:bgcolor,...taskStyle}} 
            onDragStart={(e) =>
                e.dataTransfer.setData("task_id", _id)
            }
            draggable
            title={title}
        >
            <FontAwesomeIcon  icon={icon} style={{color:color,fontSize:22}} />
        </div>
    )
}

export default Task;