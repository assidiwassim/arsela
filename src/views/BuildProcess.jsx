import '../styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState,useEffect } from 'react';
import { Xwrapper } from 'react-xarrows';
import Page from '../components/Page';
import Task from '../components/Task';
import Link from '../components/Link';
import axios  from '../axios'
import { useNavigate,useParams  } from 'react-router-dom';
import UpdatePageModal from '../modals/UpdatePageModal';

const BuildProcess = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [pages, setPages] = useState([]);
  const [links, setLinks] = useState([]);
 
  const [processId, setProcessId] = useState(id ? id: Date.now().toString());
  const [processTitle, setProcessTitle] = useState(null);

  const [selectedFirstPageId, setSelectedFirstPageId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [addConnection, setAddConnection] = useState(false);

  const [pageToUpdate, setPageToUpdate] = useState(null);
  
  const constructor = () => {
    if (constructorHasRun) return;
    findTemplates()
    findOneProcess()
    setConstructorHasRun(true);
  };
 
  useEffect(() => {
    constructor();
    document.addEventListener('mousedown', handleClickInComponent);
    return () => document.removeEventListener('mousedown', handleClickInComponent);
  });

  const findTemplates = () => {
    axios.get('/template/all')
    .then((res)=>{
      setTasks(res.data) 
    })
    .catch((err)=>{
      console.log('Impossible to connect to the server !')
    })
  }

  const findOneProcess = () => {
    axios.get('/process/find/'+processId)
    .then((res)=>{
      if(res.data){
        setProcessTitle(res.data.title)
        setPages(res.data.pages)
        setLinks(res.data.links)
      }
    })
    .catch((err)=>{
      console.log('Impossible to connect to the server !')
    })
  }

  const handleClickInComponent = e => {


    let MySelectedPage = pages.find(page => e.target.id.includes(page._id) || e.target.parentElement.id.includes(page._id) );
    let MySelectedLink = links.find(link => e.target.id.includes(link._id) || e.target.parentElement.id.includes(link._id) );

    let actions = ["WorkingSpaceNav","addConnection","removePage","removeConnection","editConnection","UpdatePage"]

      if (MySelectedPage || MySelectedLink || actions.includes(e.target.id)) {
      
        if(MySelectedPage){

          setPageToUpdate(MySelectedPage)

          setSelectedPageId(MySelectedPage._id)
          /*** create link ***/
          if(addConnection&&selectedFirstPageId&&MySelectedPage._id && (selectedFirstPageId!==MySelectedPage._id)){

            let newLink = {
              _id:Date.now().toString(),
              title:"",
              start:selectedFirstPageId,
              end:MySelectedPage._id
            }

            let redundancyCheck = links.findIndex(link => (link.start === newLink.start && link.end === newLink.end) || (link.start === newLink.end && link.end === newLink.start) );
            if(redundancyCheck){
              setLinks([...links, newLink]);
            }
           
            setSelectedFirstPageId(null)
            setSelectedPageId(null)
          }
          setSelectedLinkId(null)
        }else if (MySelectedLink){
          setSelectedLinkId(MySelectedLink._id)
          setSelectedFirstPageId(null)
          setSelectedPageId(null)
        }

      }else{
          setSelectedFirstPageId(null)
          setSelectedPageId(null)
          setSelectedLinkId(null)
      }
  };


  const handleAddConnection = () =>{
    if(selectedPageId){
      if(pages.length>1){
        setSelectedFirstPageId(selectedPageId)
        setAddConnection(true)
        setSelectedPageId(null)
      }else{
        alert("You must have more than one page !")
      }  
    }else{
        alert("You must select a page !")
    }
  };

  const handleRemoveConnection = () =>{
    if(selectedLinkId){
      let MyLinks = links.filter(link => link._id !== selectedLinkId );
      setLinks(MyLinks)
      setSelectedPageId(null)
      setSelectedLinkId(null)
    }else{
      alert("You must select a link !")
    }
  }


  const handleEditConnection = () =>{
        if(selectedLinkId){
        let MyLink = links.find(link => link._id === selectedLinkId );
        let newTitle = prompt("Enter connection name: ",MyLink.title);
        if(newTitle){
          MyLink.title=newTitle
          let MyLinks = links
          let MyLinkIndex = links.findIndex(link => link._id === selectedLinkId);
          MyLinks[MyLinkIndex] = MyLink;
          setLinks(MyLinks)
        
          setSelectedPageId(null)
          setSelectedLinkId(null)
        
        }
    }else{
      alert("You must select a link !")
    }
  }

  const updatePage = (page) =>{

    if(pageToUpdate){
      let MyPages = pages
      let MyPageIndex = pages.findIndex(page => page._id === pageToUpdate._id);
      MyPages[MyPageIndex] = page;
      setPages(MyPages)
      setPageToUpdate(null)
    }else{
      alert("You must select a page !")
    }
    
  }
  const handleRemovePage = () =>{

    if(selectedPageId){
      let MyPages = pages.filter(page => page._id !== selectedPageId);
      setPages(MyPages)
      let MyLinks = links.filter(link => link.start !== selectedPageId &&  link.end !== selectedPageId);
      setLinks(MyLinks)

      setSelectedPageId(null)
      setSelectedLinkId(null)
   
    }else{
      alert("You must select a page !")
    }
  }

  const handleDropTasks = (e) => {
    let task_id = e.dataTransfer.getData("task_id");
    let task = tasks.find(task => task._id === task_id);
    if (task) {

      let { x, y } = e.target.getBoundingClientRect();
      let initialOffset = { x: e.clientX - x +58 , y: e.clientY - y +18 };

      let newPage = {
        _id:Date.now().toString(),
        title:task.title,
        icon:task.icon,
        color:task.color,
        bgcolor:task.bgcolor,
        slug:task.slug,
        initialOffset:initialOffset
      };
 
      setPages([...pages, newPage]);
    }
  };


  const handleSaveProcess = (e) => {
      
    let newTitle = prompt("Enter process name: ",processTitle? processTitle:"process-"+processId);
 
    if(newTitle){

      let process ={
        _id:processId,
        title:newTitle,
        pages:pages,
        links:links
      } 

      axios.post('/process/insert-or-update',process)
      .then((res)=>{
        if(res.data){
          setProcessId(process._id)
          setProcessTitle(process.title)
          navigate('/build-process/'+process._id);
        }
      })
      .catch((err)=>{
          console.log('Impossible to connect to the server !')
      })
    }
  }

  return (
    <div className="appContainer">
            <Xwrapper>

                <div 
                  id="toolBarContainer" 
                  className="toolBarContainer"              
                 >
                    <label>Tools</label>
                    {tasks.map((task,index) => (
                      <Task key={index} _id={task._id} title={task.title} color={task.color} bgcolor={task.bgcolor}  icon={task.icon}/>
                    ))}
                </div>

                <div
                 id="WorkingSpaceContainer" 
                 className="WorkingSpaceContainer"
                 onDragOver={(e) => e.preventDefault()}
                 onDrop={handleDropTasks}
                 >
                  
                   <div
                     id="WorkingSpaceNav" 
                     className="WorkingSpaceNav"
                   >
                    {!selectedLinkId && (<button id="addConnection" className="btn btn-secondary btn-sm addConnection" onClick={handleAddConnection}>Add connection</button>)}
                    {!selectedLinkId &&(<button id="removePage" className="btn btn-secondary btn-sm removePage"   onClick={handleRemovePage}>Remove page</button>)}
                    {!selectedLinkId && pageToUpdate &&( <UpdatePageModal  updatePage={updatePage}  pageToUpdate={pageToUpdate}/>)}
                    
                    {selectedLinkId&&(<button id="removeConnection" className="btn btn-secondary btn-sm removeConnection" onClick={handleRemoveConnection}>Remove connection</button>)}
                    {selectedLinkId&&(<button id="editConnection" className="btn btn-secondary btn-sm editConnection" onClick={handleEditConnection}>Edit connection</button>)}   
                    
                    <button id="saveProcess" className="btn btn-primary btn-sm saveProcess" onClick={handleSaveProcess}>Save process</button>
                  
                   </div>

                    {pages.map((page,index) => (
                      <Page key={index} _id={page._id} initialOffset={page.initialOffset} title={page.title} color={page.color} bgcolor={page.bgcolor} icon={page.icon} />
                    ))}

                    {links.map((link,index) => (
                      <Link
                      key={index}
                      _id={link._id}
                      start={'page-'+link.start}
                      end={'page-'+link.end}
                      title={link.title}
                      selectedLinkId={selectedLinkId}
                       />
                    ))}
    
                </div>

            </Xwrapper>
         
        </div>
  );
}

export default BuildProcess;