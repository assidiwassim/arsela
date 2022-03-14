import React,{useState,useEffect} from 'react';
import { Container,Row,Breadcrumb,Col,Table,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios  from '../axios'

const Process = () => {

    const [process, setProcess] = useState(null);

    useEffect(() => {
        findProcess()
    },[]);

    const findProcess = () => {
      axios.get('/process/all')
      .then((res)=>{
        setProcess(res.data) 
      })
      .catch((err)=>{
        console.log('Impossible to connect to the server !')
      })
    }


    const onDeleteProcess = (_id) => {

        axios.delete('/process/remove/'+_id)
        .then((res)=>{
            findProcess()
        })
        .catch((err)=>{
            console.log('Impossible to connect to the server !')
        })
    }

    

    return (
          <Container  className="p-4" fluid>   
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item >Home</Breadcrumb.Item>
                    <Breadcrumb.Item >
                        All Process
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row  >
                <Col md={{offset: 10 }} >
                <Link to="/build-process">
                  <Button style={{width:'100%'}} variant="primary" >Create a Process</Button>
                </Link>
                </Col>
           
            </Row>
            <Row className='mt-2'>
            {process &&(

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th style={{width:300}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {process.map((p,index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{p.title}</td>
                        <td>
                           <Button variant="danger" size="sm" style={{marginRight:2}} onClick={() => onDeleteProcess(p._id)} >Remove</Button>
                           <Link to={'/build-process/'+p._id}>
                            <Button variant="primary" size="sm" style={{marginRight:2}} >Update Process</Button>
                            </Link>
                            <Link to={'/run-process/'+p._id}>
                            <Button variant="primary" size="sm" >Run Process</Button>
                            </Link>
                        </td>
                      </tr>    
                    ))}
                   
                  </tbody>
                </Table>
                 )}
            </Row>
        </Container>
    )
}
 
export default Process;