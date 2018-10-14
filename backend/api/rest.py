"""Module responsible for defining API."""
import os

from flask import Flask, Blueprint

from backend.database import session, init_db
from backend.api.auth.service import auth_ns
from backend.api.users.service import users_ns
from backend.api import api

# Definition of application
app = Flask(__name__)

# Use configuration file
app.config.SECRET_KEY = os.environ.get('RESOURCE_MANAGER_SECRET_KEY')


def initialize_app(flask_app):
    # Register blueprints
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)

    # Add namespaces
    api.add_namespace(auth_ns)
    api.add_namespace(users_ns)

    flask_app.register_blueprint(blueprint)

    # Initialize database
    init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    session.remove()


if __name__ == '__main__':
    initialize_app(app)
    app.run(debug=True)
