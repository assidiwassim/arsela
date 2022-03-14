import React from 'react';
import { Container,Row,Breadcrumb,Table } from 'react-bootstrap';


const Home = () => {


    return (
          <Container  className="p-4" fluid>   
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item >Home</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row className='mt-2'>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Entreprise</th>
                      <th>Date de livraison</th>
                      <th>Projet</th>
                      <th>Nom et prénom</th>
                      <th>Poste</th>
                    </tr>
                  </thead>
                  <tbody>
               
                      <tr>
                        <td>Arsela technologie</td>
                        <td>14-03-2022</td>
                        <td>Teste technique </td>
                        <td>Assidi Wassim </td>
                        <td>Développeur full-stack Js </td>
                      </tr>    
                 
                   
                  </tbody>
                </Table>
<hr/>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{witdh:300}}>Pages</th>
                      <th>Fonctionnalité</th>
                    </tr>
                  </thead>
                  <tbody>
               
                      <tr>
                        <td>Page Home</td>
                        <td></td>
                      </tr>    

                      <tr>
                        <td>All Process</td>
                        <td></td>
                      </tr>   

                      <tr>
                        <td>All Templates</td>
                        <td></td>
                      </tr>  

                      <tr>
                        <td>Create Process</td>
                        <td></td>
                      </tr>   

                    
                   
                  </tbody>
                </Table>
                
            </Row>
        </Container>
    )
}
 
export default Home;