"""Module responsible for defining API."""
from flask import Flask, Blueprint

from server.config import Config
from server.database import session, init_db
from server.api.auth.service import auth_ns
from server.api import api

# Definition of application
app = Flask(__name__)

# Use configuration file
app.config.from_object(Config)


def initialize_app(flask_app):
    # Register blueprints
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)

    # Add namespaces
    api.add_namespace(auth_ns)

    flask_app.register_blueprint(blueprint)

    # Initialize database
    init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    session.remove()


if __name__ == '__main__':
    initialize_app(app)
    app.run(debug=True)
