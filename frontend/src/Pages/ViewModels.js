import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchModelsAsync } from '../features/models/modelSlice';
import { Loading } from '../app/Loader';
import { generateQueryString, parseQueryString } from '../app/utils';
import { API_UPDATE_MODEL, API_DELETE_MODEL } from '../constants/constants';


function FilterInput({placeholder="", targetColumn, handleFilterChange, value="", favoriteToggleFilter}){
    const larger_columns = ['datasetName', 'runDatetime', 'notes']
    
    return (
        <div className={`col${larger_columns.includes(targetColumn) ? '-2' : ''} `}>
            <div className="input-group">
                <span className="input-group-text">
                <i className="bi bi-search"></i>
                </span>
                {(targetColumn === "favorite") ? 
                    (
                    <form id="yesNoForm" className='bg-white border-top border-bottom border-right ps-2 pe-2 rounded-right'>
                        <input type="checkbox" id="yes" name="yesNoChoice" value="yes" onClick={() => favoriteToggleFilter('yes')} />
                        <label className="ps-1" htmlFor="yes">Yes</label><br/>
                        <input type="checkbox" id="no" name="yesNoChoice" value="no" onClick={() => favoriteToggleFilter('no')} />
                        <label className="ps-1" htmlFor="no">No</label>
                    </form>
                      ) : 
                    (
                    <input
                        className="form-control"
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => handleFilterChange(e, targetColumn)}
                    />)
                }
            </div>
        </div>
    )
}


function ModelsGrid({ models, toggleFavoriteUpdate, deleteModel }) {
    return (
        <>
        {models.map((model, index) => (
          <div className={`row align-items-center border ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`} key={index}>
            <div className="col-2 d-flex align-items-center">
                <span 
                    className="btn d-flex align-items-center me-4" 
                    aria-label="Toggle Favorite" 
                >
                    <i className="bi bi-trash ms-1" onClick={() => deleteModel(model.modelID)}></i>
                    
                </span>
                {model.datasetName}
            </div>
            <div className="col">{model.modelMetric}</div>
            <div className="col">{model.modelPath}</div>
            <div className="col">{model.trainingLoss && model.trainingLoss.toFixed(3)}</div>
            <div className="col">{model.validationLoss && model.validationLoss.toFixed(3)}</div>
            <div className="col-2">{model.runDatetime}</div>
            <div className="col-2">{model.notes}</div>
            <div className="col">
                <button 
                    className="btn" 
                    onClick={() => toggleFavoriteUpdate(model.modelID, model.favorite)}
                    aria-label="Toggle Favorite" 
                >
                    {model.favorite === 1 ? (
                    <i className="bi bi-star-fill"></i> 
                    ) : (
                    <i className="bi bi-star"></i> 
                    )}
                </button>
                </div>         
            </div>
        ))}
        </>
    );
  }


function FilterModelsGrid() {
    const dispatch = useDispatch();

    const {loading, error, models, queryString} = useSelector(state => state.models);
    const current_filters = parseQueryString(queryString)

    const [sortDirection, setSortDirection] = useState('');
    const [sortedColumn, setSortedColumn] = useState('');

    const deleteModel = async (id) => {
        if (window.confirm('Are you sure you want to delete this model?')) {
            try {
                const response = await fetch(API_DELETE_MODEL + id + "/", {
                    method: 'DELETE',
                });
        
                if (!response.ok) {
                    throw new Error(`Error deleting model: ${response.status}`);
                }
                const query_string = generateQueryString(current_filters);
                dispatch(fetchModelsAsync(query_string));
            } catch (error) {
                console.error('Error during DELETE fetch:', error);
            }
        }
    }

    const handleFilterChange = (e, targetColumn) => {
        const cur_text = e.target.value;
        current_filters[targetColumn] = targetColumn === "favorite" && cur_text ? (cur_text[0].toLowerCase() === "y" ? 1 : 0) : cur_text;
        const query_string = generateQueryString(current_filters);
        dispatch(fetchModelsAsync(query_string));
    }

    const favoriteToggleFilter = (selectedId) => {
        let checkboxes = document.querySelectorAll('input[name="yesNoChoice"]');
        checkboxes.forEach((checkbox) => {
          if (checkbox.id !== selectedId) {
            checkbox.checked = false;
          }
        });

        let yesChecked = document.getElementById('yes').checked;
        let noChecked = document.getElementById('no').checked;
        current_filters["favorite"] = yesChecked ? 1 : noChecked ? 0 : "";

        const query_string = generateQueryString(current_filters);
        dispatch(fetchModelsAsync(query_string));
    }

    const toggleFavoriteUpdate = async (id, oldToggleValue) => {
        const newFavoriteValue = oldToggleValue === 1 ? 0 : 1; 
        const API_UPDATE_MODEL_ROUTE = API_UPDATE_MODEL + id + "/";
        try {
            const response = await fetch(API_UPDATE_MODEL_ROUTE, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favorite: newFavoriteValue }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const query_string = generateQueryString(current_filters);
            dispatch(fetchModelsAsync(query_string));
        } catch (error) {
            console.error('Error updating model favorite status:', error);
        }
    };

    const handleSort = (columnName) => {
        let newSortDirection = sortDirection === '' ? 'asc' : sortDirection === 'asc' ? 'desc' : '';
        if (sortedColumn === columnName) {
          if (newSortDirection === ""){
            setSortedColumn('')
          }
          setSortDirection(newSortDirection)
        } else {
          setSortedColumn(columnName);
          setSortDirection('asc');
          newSortDirection = 'asc'
        }
        current_filters['sort_by'] = columnName
        current_filters['sort_order'] = newSortDirection
        const query_string = generateQueryString(current_filters)
        dispatch(fetchModelsAsync(query_string));
    };


    const SortColumnLabel = ({title, targetColumn}) => {
        return (
            <>
                {title}
                {sortedColumn === targetColumn ? (
                    sortDirection === 'asc' ? (
                    <i className="bi bi-arrow-up"></i>
                    ) : (
                    <i className="bi bi-arrow-down"></i>
                    )
                ) : (
                    <>
                    <i className="bi bi-arrow-up"></i>
                    <i className="bi bi-arrow-down"></i>
                    </>
                )}
            </>
        )
    }

    return (
        <div className="container-xl mt-3 text-center border border-dark">
          <div className="row font-weight-bold bg-dark text-light align-items-center py-2">
            <div className="col-2 btn text-light ms-2" onClick={() => handleSort('datasetName')}>
                <SortColumnLabel title={"Dataset Name"} targetColumn={"datasetName"}/>
            </div>
            <div className="col btn text-light" onClick={() => handleSort('modelMetric')}>
                <SortColumnLabel title={"Metric"} targetColumn={"modelMetric"}/>
            </div>
            <div className="col btn text-light" onClick={() => handleSort('modelPath')}>
                <SortColumnLabel title={"Path"} targetColumn={"modelPath"}/>
            </div>
            <div className="col btn text-light" onClick={() => handleSort('trainingLoss')}>
                <SortColumnLabel title={"Training Loss"} targetColumn={"trainingLoss"}/>
            </div>
            <div className="col btn text-light" onClick={() => handleSort('validationLoss')}>
                <SortColumnLabel title={"Validation Loss"} targetColumn={"validationLoss"}/>
            </div>
            <div className="col-2 btn text-light" onClick={() => handleSort('runDatetime')}>
                <SortColumnLabel title={"Run Datetime"} targetColumn={"runDatetime"}/>
            </div>
            <div className="col-2">Notes</div>
            <div className="col">Favorite</div>
          </div>
          <div className="row align-items-center py-2 bg-secondary-dark">
            <FilterInput value={current_filters['datasetName']} placeholder={"Filter"} targetColumn="datasetName" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['modelMetric']} placeholder={"Filter"} targetColumn="modelMetric" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['modelPath']} placeholder={"Filter"} targetColumn="modelPath" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['trainingLoss']} placeholder={"Filter"} targetColumn="trainingLoss" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['validationLoss']} placeholder={"Filter"} targetColumn="validationLoss" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['runDatetime']} placeholder={"Filter"} targetColumn="runDatetime" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['notes']} placeholder={"Filter"} targetColumn="notes" handleFilterChange={handleFilterChange}/>
            <FilterInput value={current_filters['favorite']} placeholder={"Filter"} targetColumn="favorite" handleFilterChange={handleFilterChange} favoriteToggleFilter={favoriteToggleFilter}/>
          </div>
          {loading && <div className='my-3'><Loading/></div>}
          {!loading && error && <div className="alert alert-danger mt-3" role="alert">Error fetching models, please try again later {error.message}</div>}
          {!loading && !error && models.length > 0 ? (
            <ModelsGrid models={models} toggleFavoriteUpdate={toggleFavoriteUpdate} deleteModel={deleteModel}/>
          ) : !loading && !error && (
            <div>No models to display</div>
          )}
        </div>
    );
}
  

export function ViewModelsPage() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchModelsAsync(''))
  }, [dispatch])

  return (
    <div className='mb-5'>
      <div className="d-flex justify-content-center align-items-center mt-2">
          <h1>Models</h1>
      </div>
      <FilterModelsGrid/>
    </div>
  );
}
