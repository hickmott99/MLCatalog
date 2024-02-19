from flask import Flask, jsonify, request
import flask
import MLCatalog

@MLCatalog.app.route('/api/v1/', methods=['GET'])
def get_status():
    return jsonify({'message': 'API Responsive'}), 200


@MLCatalog.app.route("/api/v1/model/<int:modelID>/", methods=['DELETE'])
def delete_model(modelID):
    connection = MLCatalog.model.get_db()
    cur = connection.cursor()
    
    cur.execute("SELECT 1 FROM Models WHERE modelID = ?", (modelID,))
    if cur.fetchone() is None:
        return jsonify({"error": "Model not found"}), 404
    
    try:
        cur.execute("DELETE FROM Models WHERE modelID = ?", (modelID,))
        connection.commit()
        
        if cur.rowcount == 0:
            return jsonify({"error": "Deletion failed"}), 500
        return jsonify({"message": "Model deleted successfully"}), 200
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        abort(500) 


@MLCatalog.app.route("/api/v1/model/<int:modelID>/", methods=['PUT'])
def update_model(modelID):
    data = request.get_json()
    
    connection = MLCatalog.model.get_db()
    cur = connection.cursor()
    cur.execute("SELECT 1 FROM Models WHERE modelID = ?", (modelID,))
    if cur.fetchone() is None:
        return jsonify({"error": "Model not found"}), 404
    
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
    
    try:
        cur.execute(query, query_params)
        connection.commit()
        
        if cur.rowcount == 0:
            # No rows were updated, which should not happen as we check model existence earlier
            return jsonify({"error": "Update failed"}), 500
        
        return jsonify({"message": "Model updated successfully", "modelID": modelID}), 200
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        abort(500)


@MLCatalog.app.route("/api/v1/model/", methods=['POST'])
def add_model():
    data = request.get_json()
    
    required_fields = ['datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'favorite']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
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
    
    try:
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
    connection = MLCatalog.model.get_db()
    
    query = "SELECT * FROM Models"
    query_params = []
    
    allowed_toggle_fields = ['modelID', 'datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'notes', 'favorite']
    # Filtering
    filter_conditions = []
    for column in allowed_toggle_fields:
        if column in request.args:
            # Adjust the condition to use LIKE with wildcards
            if column in ['datasetName', 'modelPath', 'modelMetric', 'notes']:  # Columns you want case-insensitive comparison
                filter_conditions.append(f"{column} LIKE ? COLLATE NOCASE")
            else:
                filter_conditions.append(f"{column} LIKE ?")
            query_params.append(f"%{request.args[column]}%")  # Add % before and after the search term
    
    if filter_conditions:
        query += " WHERE " + " AND ".join(filter_conditions)

    
    # Sorting TODO: add per column sort order functionality
    sort_by_fields = request.args.getlist('sort_by')

    order_by_clause = []
    sort_order = request.args.get('sort_order', 'ASC').upper() 
    for field  in sort_by_fields:
        if field in allowed_toggle_fields:
            order_by_clause.append(f"{field} {sort_order}")
    
    if order_by_clause:
        query += " ORDER BY " + ", ".join(order_by_clause)

    cur = connection.execute(query, query_params)
    models = cur.fetchall()
    
    return jsonify(models)

# @MLCatalog.app.route("/api/v1/models/", methods=['GET'])
# def get_models():
#     connection = MLCatalog.model.get_db()
    
#     query = "SELECT * FROM Models"
#     query_params = []
    
#     allowed_toggle_fields = ['modelID', 'datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'notes', 'favorite']
#     # Filtering
#     filter_conditions = []
#     for column in allowed_toggle_fields:
#         if column in request.args:
#             # Adjust the condition to use LIKE with wildcards
#             filter_conditions.append(f"{column} LIKE ?")
#             query_params.append(f"%{request.args[column]}%")  # Add % before and after the search term
    
#     if filter_conditions:
#         query += " WHERE " + " AND ".join(filter_conditions)

    
#     # Sorting TODO: add per column sort order functionality
#     sort_by_fields = request.args.getlist('sort_by')

#     order_by_clause = []
#     sort_order = request.args.get('sort_order', 'ASC').upper() 
#     for field  in sort_by_fields:
#         if field in allowed_toggle_fields:
#             order_by_clause.append(f"{field} {sort_order}")
    
#     if order_by_clause:
#         query += " ORDER BY " + ", ".join(order_by_clause)

#     cur = connection.execute(query, query_params)
#     models = cur.fetchall()

#     if not models:
#         flask.abort(404)
    
#     return jsonify(models)



# @MLCatalog.app.route("/api/v1/models/", methods=['GET'])
# def get_models():
#     connection = MLCatalog.model.get_db()
    
#     query = "SELECT * FROM Models"
#     query_params = []
    
#     allowed_toggle_fields = ['modelID', 'datasetName', 'runDatetime', 'modelMetric', 'modelPath', 'trainingLoss', 'validationLoss', 'notes', 'favorite']
#     # Filtering
#     filter_conditions = []
#     for column in allowed_toggle_fields:
#         if column in request.args:
#             filter_conditions.append(f"{column} = ?")
#             query_params.append(request.args[column])
    
#     if filter_conditions:
#         query += " WHERE " + " AND ".join(filter_conditions)

    
#     # Sorting TODO: add per column sort order functionality
#     sort_by_fields = request.args.getlist('sort_by')

#     order_by_clause = []
#     sort_order = request.args.get('sort_order', 'ASC').upper() 
#     for field  in sort_by_fields:
#         if field in allowed_toggle_fields:
#             order_by_clause.append(f"{field} {sort_order}")
    
#     if order_by_clause:
#         query += " ORDER BY " + ", ".join(order_by_clause)

#     cur = connection.execute(query, query_params)
#     models = cur.fetchall()

#     if not models:
#         flask.abort(404)
    
#     return jsonify(models)

    # Test

    # 4 results
    # http://127.0.0.1:8000/api/v1/models/?datasetName=GPT-3

    # 3 results
    # http://127.0.0.1:8000/api/v1/models/?datasetName=GPT-3&favorite=1

    # 3 results dif ordering
    # http://127.0.0.1:8000/api/v1/models/?datasetName=GPT-3&favorite=1&sort_by=trainingLoss

    # 3 results opposite ordering of just before
    # http://127.0.0.1:8000/api/v1/models/?datasetName=GPT-3&favorite=1&sort_by=trainingLoss&sort_order=DESC


