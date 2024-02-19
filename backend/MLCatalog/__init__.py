import flask
from flask_cors import CORS 

FRONTEND_URL = "http://localhost:3000" 

app = flask.Flask(__name__)
app.config.from_object('MLCatalog.config')
CORS(app, resources={r"/*": {"origins": FRONTEND_URL}}) 

import MLCatalog.routes  # noqa: E402  pylint: disable=wrong-import-position
import MLCatalog.model  # noqa: E402  pylint: disable=wrong-import-position