import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {ViewModelsPage} from './Pages/ViewModels'
import { AddModelPage } from "./Pages/AddModel";
import {NotFound} from './Pages/NotFound'
import { BasicNav } from './app/Navigation';
import {API_BASE_URL, ADD_MODEL_PATH, HOME_PATH} from './constants/constants'


export default function App() {
  // Check backend status
  useEffect(() => {
    fetch(API_BASE_URL, {
      method: 'GET', 
    })
      .then(response => {
        if (!response.status === 200) {
          console.log("Backend not responding")
        } 
      })
      .catch(error => {
        console.error('Backend not responding:', error);
      });
  }, []);

  return (
    <Router>
        <div className="container-xxl mt-3 justify-content-center">
            <BasicNav/>
            <Routes>
              <Route path="*" element={<NotFound/>}/> 
              <Route exact path={HOME_PATH} element={<ViewModelsPage/>}/>
              <Route exact path={ADD_MODEL_PATH} element={<AddModelPage/>}/>
            </Routes>
        </div>
    </Router>
  );
}
