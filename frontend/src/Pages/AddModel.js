import React, { useState } from 'react';

import { Loading } from '../app/Loader';
import { API_ADD_MODEL } from '../constants/constants';


function AddModelForm() {
    const [modelDetails, setModelDetails] = useState({
      datasetName: '',
      runDatetime: '',
      modelMetric: '',
      modelPath: '',
      trainingLoss: '',
      validationLoss: '',
      notes: '',
      favorite: false,
    });
  
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setModelDetails({
        ...modelDetails,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSuccessMessage('');
      setErrorMessage('');
      setIsLoading(true); 
  
      try {
        const response = await fetch(API_ADD_MODEL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modelDetails),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
  
        setSuccessMessage('Model added successfully!');
      } catch (error) {
        console.error("Error during fetch: ", error);
        setErrorMessage("Error adding model, please try again later");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="container-sm mt-1 d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className='row justify-content-center'>
          <div className='col-5 border bg-secondary-dark rounded-3 p-3'>
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                    {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                    {successMessage}
                    </div>
                )}
                <div className="form-group mb-2">
                    <label htmlFor="datasetName">Dataset Name</label>
                    <input type="text" className="form-control" id="datasetName" name="datasetName" placeholder={"e.g. 'Mnist'"} value={modelDetails.datasetName} onChange={handleChange} required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="runDatetime">Run Datetime</label>
                    <input type="text" className="form-control" id="runDatetime" name="runDatetime" placeholder={"e.g. '2024-02-19 17:00:00'"} value={modelDetails.runDatetime} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="modelMetric">Model Metric</label>
                    <input type="text" className="form-control" id="modelMetric" name="modelMetric" placeholder={"e.g. 'euclidean'"} value={modelDetails.modelMetric} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="modelPath">Model Path</label>
                    <input type="text" className="form-control" id="modelPath" name="modelPath" placeholder={"e.g. '/path/to/model/on/disk'"} value={modelDetails.modelPath} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="trainingLoss">Training Loss</label>
                    <input type="number" className="form-control" id="trainingLoss" name="trainingLoss" placeholder={'e.g. 0.134'} value={modelDetails.trainingLoss} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="validationLoss">Validation Loss</label>
                    <input type="number" className="form-control" id="validationLoss" name="validationLoss" placeholder={'e.g. 0.264'} value={modelDetails.validationLoss} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="notes">Notes</label>
                    <textarea className="form-control" id="notes" name="notes" value={modelDetails.notes} onChange={handleChange}></textarea>
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="favorite" name="favorite" checked={modelDetails.favorite} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="favorite">Favorite</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <Loading/> : 'Add Model'}
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  


function AddModelPage() {
    return (
    <>
        <div className="d-flex justify-content-center align-items-center mt-2">
            <h1>Add Model</h1>
        </div>
        <AddModelForm/>
    </>)
}

export {AddModelPage}