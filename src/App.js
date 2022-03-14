import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './MyRoutes';
import { Navbar,Container,Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas} from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas)

function App() {

  return (
    <Router>
        <Navbar className='navbar-custom' bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="#home">[Test technique]</Navbar.Brand>
          <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/process">
            <Nav.Link >All Process</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/page-template">
            <Nav.Link  >All Templates</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
          <LinkContainer to="/build-process">
            <Nav.Link className='btn outline-primary btn-start-process'>Create a Process</Nav.Link>
            </LinkContainer>
          </Nav>
          </Container>
        </Navbar>
        <MyRoutes/>
  </Router>
  );
}

export default App;
