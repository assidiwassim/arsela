
import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import Home from './views/Home';
import Template from './views/Template';

import Process from './views/Process';
import BuildProcess from './views/BuildProcess';
import RunProcess from './views/RunProcess';

const MyRoutes = () => {
    return (
        <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/page-template' element={< Template />}></Route>
                <Route exact path='/process' element={< Process />}></Route>
                <Route exact path='/build-process' element={< BuildProcess />}></Route>
                <Route exact path='/build-process/:id' element={< BuildProcess />}></Route>
                <Route exact path='/run-process/:id' element={< RunProcess />}></Route>
                <Route exact path='/run-process/:id/:slug' element={< RunProcess />}></Route>
        </Routes>
    )
}
 
export default MyRoutes;