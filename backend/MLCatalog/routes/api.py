from flask import Flask, jsonify
import flask
import MLCatalog

@MLCatalog.app.route('/api/v1/', methods=['GET'])
def get_status():
    return jsonify({'message': 'API Responsive'}), 200


@MLCatalog.app.route("/api/v1/models/", methods=['GET'])
def get_models():
    connection = MLCatalog.model.get_db()
    cur = connection.execute(
        "SELECT * FROM Models"
    )
    models = cur.fetchall() or flask.abort(404)
    return models