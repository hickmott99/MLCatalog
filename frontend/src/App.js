import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useDispatch} from 'react-redux'


// Pages
import {ViewModelsPage} from './Pages/ViewModels'
import { AddModelPage } from "./Pages/AddModel";
import {Home} from './Pages/Home'
import {NotFound} from './Pages/NotFound'

// Global Components
import { BasicNav } from './app/Navigation';
import {GlobalModal} from './features/modal/Modal'

// Redux actions
import { showModal } from "./features/modal/modalSlice";

// Constants
import {API_BASE_URL, ADD_MODEL_PATH, VIEW_MODEL_PATH, HOME_PATH} from './constants/constants'


export default function App() {
  const dispatch = useDispatch();

  // Check backend status
  useEffect(() => {
    fetch(API_BASE_URL, {
      method: 'GET', 
    })
      .then(response => {
        console.log(response)
        if (!response.status === 200) {
          dispatch(showModal({title:"Error", message: "Backend not responding"}));
        } 
      })
      .catch(error => {
        console.error('Error fetching API:', error);
        dispatch(showModal({title:"Error", message: "Backend not responding"}));
      });
  }, []);

  return (
    <Router>
        <div className="container mt-3 justify-content-center">
            <BasicNav/>
            <Routes>
              <Route path="*" element={<NotFound/>}/> 
              <Route exact path={HOME_PATH} element={<Home/>}/>
              <Route exact path={ADD_MODEL_PATH} element={<AddModelPage/>}/>
              <Route exact path={VIEW_MODEL_PATH} element={<ViewModelsPage/>}/>     
            </Routes>
            <GlobalModal/>
        </div>
    </Router>
  );
}

