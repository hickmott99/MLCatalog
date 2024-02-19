from flask import Flask, jsonify, request
import flask
import MLCatalog


@MLCatalog.app.route('/api/v1/', methods=['GET'])
def get_status():
    """Endpoint to check the responsiveness of the API."""
    return jsonify({'message': 'API Responsive'}), 200


@MLCatalog.app.route("/api/v1/model/<int:modelID>/", methods=['DELETE'])
def delete_model(modelID):
    """Endpoint to delete a specific model from the database."""
    connection = MLCatalog.model.get_db()
    cur = connection.cursor()
    
    # verify model exists
    cur.execute("SELECT 1 FROM Models WHERE modelID = ?", (modelID,))
    if cur.fetchone() is None:
        return jsonify({"error": "Model not found"}), 404

    try: # attempt deletion
        cur.execute("DELETE FROM Models WHERE modelID = ?", (modelID,))
        connection.commit()

        if cur.rowcount == 0: # No rows were deleted
            return jsonify({"error": "Deletion failed"}), 500

        return jsonify({"message": "Model deleted successfully"}), 200
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        flask.abort(500) 


@MLCatalog.app.route("/api/v1/model/<int:modelID>/", methods=['PUT'])
def update_model(modelID):
    """Endpoint to update the details of a specific model."""
    data = request.get_json()
    
    # verify model exists
    connection = MLCatalog.model.get_db()
    cur = connection.cursor()
    cur.execute("SELECT 1 FROM Models WHERE modelID = ?", (modelID,))
    if cur.fetchone() is None:
        return jsonify({"error": "Model not found"}), 404
    
    # build query string
    updates = []
    query_params = []
    
    for column in ['datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'notes', 'favorite']:
        if column in data:
            updates.append(f"{column} = ?")
            query_params.append(data[column])
    
    if not updates:
        return jsonify({"error": "No fields provided for update"}), 400
    
    query_params.append(modelID)
    query = f"UPDATE Models SET {', '.join(updates)} WHERE modelID = ?"
    
    try: # attempt update
        cur.execute(query, query_params)
        connection.commit()

        if cur.rowcount == 0: # No rows were updated
            return jsonify({"error": "Update failed"}), 500

        return jsonify({"message": "Model updated successfully", "modelID": modelID}), 200
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        flask.abort(500)


@MLCatalog.app.route("/api/v1/model/", methods=['POST'])
def add_model():
    """Endpoint to add a new model to the database."""
    data = request.get_json()
    
    # verify existence of DB fields
    required_fields = ['datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'favorite']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    # build query
    query = """
    INSERT INTO Models (datasetName, runDatetime, modelMetric, modelPath, trainingLoss, validationLoss, notes, favorite) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """
    query_params = [
        data['datasetName'],
        data['runDatetime'],
        data['modelMetric'],
        data['modelPath'],
        data['trainingLoss'],
        data['validationLoss'],
        data.get('notes', ''),
        data['favorite']
    ]
    
    try: # attempt insertion
        connection = MLCatalog.model.get_db()
        cur = connection.cursor()

        cur.execute(query, query_params)
        connection.commit()
        
        model_id = cur.lastrowid
        return jsonify({"message": "Model added successfully", "modelID": model_id}), 201

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        flask.abort(500)  


@MLCatalog.app.route("/api/v1/models/", methods=['GET'])
def get_models():
    """Fetches models from the database, allowing attribute-based filtering and sorting."""
    connection = MLCatalog.model.get_db()
    
    # initial query
    query = "SELECT * FROM Models"
    query_params = []
    
    allowed_toggle_fields = ['modelID', 'datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'notes', 'favorite']
    # Filtering - build query
    filter_conditions = []
    for column in allowed_toggle_fields:
        if column in request.args:
            # Adjust the condition to use LIKE with wildcards to match partial fields
            if column in ['datasetName', 'modelPath', 'modelMetric', 'notes']: 
                filter_conditions.append(f"{column} LIKE ? COLLATE NOCASE")
            else:
                filter_conditions.append(f"{column} LIKE ?")
            query_params.append(f"%{request.args[column]}%")
    
    if filter_conditions:
        query += " WHERE " + " AND ".join(filter_conditions)

    # Sorting - build query TODO: add per column sort order functionality
    sort_by_fields = request.args.getlist('sort_by')
    order_by_clause = []
    sort_order = request.args.get('sort_order', 'ASC').upper() 
    for field  in sort_by_fields:
        if field in allowed_toggle_fields:
            order_by_clause.append(f"{field} {sort_order}")
    
    if order_by_clause:
        query += " ORDER BY " + ", ".join(order_by_clause)

    try: # attempt query
        cur = connection.execute(query, query_params)
        models = cur.fetchall()
        return jsonify(models)
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        flask.abort(500) 
