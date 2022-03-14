import React, { useState } from 'react';
import { Button,Modal,Form } from 'react-bootstrap';

const UpdateTemplateModal = ({updateTemplate,data}) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [template, setTemplate] = useState(data)

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true)

    if(template.title!=='' && template.icon!=='' && template.color!==''&& template.bgcolor!=='' && template.slug!=='') {
          setValid(true);
          updateTemplate(template)
          setShow(false)
      }else{
          setValid(false);
      }
    
    }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Update template</Modal.Title>
        </Modal.Header>
        {template && (
       <Form className='register-form' onSubmit={handleSubmit}>  
       <Modal.Body>
        <Form.Group className="mb-3" >
           <Form.Label>Template Title</Form.Label>
           <Form.Control type="text" placeholder='Titre page-1'  value={template.title} onChange={(e) => setTemplate((values) => ({...values,title: e.target.value}))}/>
           { submitted && template.title==='' && (
             <Form.Text className="text-danger">
             Please enter a title
             </Form.Text>
           )} 
         </Form.Group>
         <Form.Group className="mb-3" >
           <Form.Label>Icon ( <a target="_blank" href="https://fontawesome.com/search?m=free" >fontawesome Link - free version </a>)</Form.Label>
           <Form.Control type="text" placeholder='fa-solid fa-1'  value={template.icon} onChange={(e) => setTemplate((values) => ({...values,icon: e.target.value}))}/>
           { submitted && template.icon==='' && (
             <Form.Text className="text-danger">
             Please enter a fontawsome icon
             </Form.Text>
           )} 
         </Form.Group>

         <Form.Group className="mb-3" >
           <Form.Label>Color </Form.Label>
           <Form.Control type="color"  value={template.color} onChange={(e) => setTemplate((values) => ({...values,color: e.target.value}))}/>
           { submitted && template.color==='' && (
             <Form.Text className="text-danger">
             Please choose a color
             </Form.Text>
           )} 
         </Form.Group>

         <Form.Group className="mb-3" >
                <Form.Label>Icon Background Color </Form.Label>
                <Form.Control type="color"  value={template.bgcolor} onChange={(e) => setTemplate((values) => ({...values,bgcolor: e.target.value}))}/>
                { submitted && template.bgcolor==='' && (
                  <Form.Text className="text-danger">
                  Please choose a bgcolor
                  </Form.Text>
                )} 
              </Form.Group>

         <Form.Group className="mb-3" >
           <Form.Label>Link (slug) </Form.Label>
           <Form.Control type="text" placeholder='page-1'  value={template.slug} onChange={(e) => setTemplate((values) => ({...values,slug: e.target.value}))}/>
           { submitted && template.slug==='' && (
             <Form.Text className="text-danger">
             Please enter a link (slug)
             </Form.Text>
           )} 
         </Form.Group>

        
         
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
         <Button  type="submit" >
           Save Changes
         </Button>
       </Modal.Footer>
   </Form>
         )}
      </Modal>
     
    </>
  );
}
 

export default UpdateTemplateModal;