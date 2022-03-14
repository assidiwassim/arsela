import React,{useState,useEffect} from 'react';
import { Container,Row,Breadcrumb,Col,Table,Button } from 'react-bootstrap';
import AddTemplateModal from '../modals/AddTemplateModal';
import UpdateTemplateModal from '../modals/UpdateTemplateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios  from '../axios'

const Template = () => {

    const [templates, setTemplates] = useState(null);

    useEffect(() => {
        findTemplates()
    },[]);

    const findTemplates = () => {
      axios.get('/template/all')
      .then((res)=>{
        setTemplates(res.data) 
      })
      .catch((err)=>{
        console.log('Impossible to connect to the server !')
      })
    }

     const addTemplate = (template) => {
      console.log(template)
        axios.post('/template/add',template)
        .then((res)=>{
          findTemplates()
        })
        .catch((err)=>{
            console.log('Impossible to connect to the server !')
        })
      }

      const updateTemplate = (template) => {
        axios.post('/template/update/'+template._id,template)
        .then((res)=>{
          findTemplates()
        })
        .catch((err)=>{
            console.log('Impossible to connect to the server !')
        })
      }

      const removeTemplate = (_id) => {
       axios.delete('/template/remove/'+_id)
        .then((res)=>{
          findTemplates()
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
                        All Templates
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row  >
                <Col md={{offset: 10 }} >
                        <AddTemplateModal addTemplate={addTemplate}/>
                </Col>
           
            </Row>
            <Row className='mt-2'>
            {templates &&(

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Icon</th>
                      <th>Color</th>
                      <th>BgColor</th>
                      <th>Link(slug)</th>
                      <th style={{width:200}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {templates.map((template,index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{template.title}</td>
                        <td> <FontAwesomeIcon  icon={template.icon} style={{marginRight:10}}/> <span >{template.icon}</span>  </td>
                        <td> <div style={{backgroundColor:template.color,height:20,width:20,display:'inline-block',position:'relative',top:5,marginRight:10,border:'1px solid gray'}}>  </div> {template.color} </td>
                        <td> <div style={{backgroundColor:template.bgcolor,height:20,width:20,display:'inline-block',position:'relative',top:5,marginRight:10,border:'1px solid gray'}}>  </div> {template.bgcolor} </td>
                        <td>{template.slug}</td>
                        <td>
                           <Button variant="danger" size="sm" style={{marginRight:2}}  onClick={() => removeTemplate(template._id)} >Remove</Button>
                           <UpdateTemplateModal updateTemplate={updateTemplate} data={template}/>
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
 
export default Template;