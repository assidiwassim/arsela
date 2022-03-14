import React,{useState,useEffect} from 'react';
import { Container,Row,Breadcrumb,Button,Col,Form } from 'react-bootstrap';
import { useNavigate,useParams  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios  from '../axios'


const RunProcess = () => {

const navigate = useNavigate();
let { id,slug } = useParams();

const [constructorHasRun, setConstructorHasRun] = useState(false);
const [processId, setProcessId] = useState(id);
const [process, setProcess] = useState(null);

const [currentPage, setCurrentPage] = useState(null);
const [nextPages, setNextPages] = useState(null);
const [nextPage, setNextPage] = useState(null);
const [theEnd, setTheEnd] = useState(false);

const constructor = () => {
  if (constructorHasRun) return;
  findOneProcess()
  setConstructorHasRun(true);
};

useEffect(() => {
  constructor();
},[]);

const findOneProcess = () => {
  axios.get('/process/find/'+processId)
  .then((res)=>{
    if(res.data){
      setProcess(res.data)
      getStartPage(res.data)
    }
  })
  .catch((err)=>{
    console.log('Impossible to connect to the server !')
  })
}

const getStartPage = (_process) => {
  
  let arr_link_start_counts =[]
  let count = 0
  _process.links.forEach(link1 =>{
     count=0
    _process.links.forEach(link2 =>{
        if(link1.start===link2.end){count++}
    })
    arr_link_start_counts.push({_id:link1._id,start:link1.start,end:link1.end,title:link1.title,count:count})
  });

  let startLink = arr_link_start_counts.find(link =>link.count===0)
  let startPage = _process.pages.find(page =>page._id===startLink.start)
  setCurrentPage(startPage)

  let MyLinks = _process.links.filter(link => link.start === startPage._id );
  if(MyLinks && MyLinks.length>0){
    let arr_next_pages =[]
    MyLinks.forEach(link =>{
      let page = _process.pages.find(page =>page._id===link.end)
      arr_next_pages.push(page)
    })
    setNextPages(arr_next_pages)
  }else{
    setTheEnd(true)
    console.log("The End !")
  }
 
  
  navigate('/run-process/'+processId+'/'+startPage.slug);
}

  const goToNextPage = () =>{
 
    if(nextPage){
      setCurrentPage(nextPage) 
      let MyLinks = process.links.filter(link => link.start === nextPage._id );
      if(MyLinks && MyLinks.length>0){
        let arr_next_pages =[]
        MyLinks.forEach(link =>{
          let page = process.pages.find(page =>page._id===link.end)
          arr_next_pages.push(page)
        })
        setNextPages(arr_next_pages)
      }else{
        setTheEnd(true)
      }
      
      navigate('/run-process/'+processId+'/'+nextPage.slug);
    }

  }

  const goToHome = () =>{
      navigate('/');
  }
  
  const handleNextPageChange = (e) =>{
    if(nextPages){
      setNextPage(nextPages.find(nextpage =>nextpage._id===e.target.value))
    }else{
      setNextPage(null)
    }

  }

    return (
          <Container  className="p-4" fluid>   
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item >Home</Breadcrumb.Item>
                    <Breadcrumb.Item >Run Process</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            {currentPage && nextPages && (
              <Row className='mt-2'>
                  <Col md={12}>
                      <h1>{currentPage.title}</h1>
                  </Col>
                  <Col md={12}>
                      <p>Form content ...</p>
                  </Col>
                {!theEnd && (
                  <Col md={12}>
                    <Form.Select defaultValue="" onChange={e => handleNextPageChange(e)}>
                    <option value="null"  >choose the next page ?</option>
                    {nextPages.map((page,index) => (
                      <option key={index} value={page._id} >{page.title}</option>
                    ))}
                    </Form.Select>
                  </Col>
                )}
                {!theEnd && (
                <Col md={12}>
                    <Button  variant="primary" className='mt-2' onClick={goToNextPage}>Go to Next page</Button>
                </Col>
                 )}

                {theEnd && (
                <Col md={12}>
                    <Button  variant="primary" className='mt-2' onClick={goToHome}>Done ! Go to Home page !</Button>
                </Col>
                 )}
              </Row>
            )}
        </Container>
    )
}
 
export default RunProcess;