"""Module responsible for defining API."""
from flask import Flask, Blueprint
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from authlib.flask.client import OAuth
from loginpass import create_flask_blueprint, GitHub

from resourcemanager.api import api
from resourcemanager.api.auth.service import auth_ns, handle_oauth2_authorization
from resourcemanager.api.users.service import users_ns
from resourcemanager.api.resources.service import resources_ns
from resourcemanager.database import session, init_db
from resourcemanager.repositories.tokens import is_jti_blacklisted

# Definition of application
app = Flask(__name__)

# Use configuration file
app.config.from_pyfile('config.py')

oauth = OAuth(app)
jwt = JWTManager(app)
CORS(app)


def initialize_app(flask_app):
    # Register blueprints
    blueprint = Blueprint('api', __name__, url_prefix='/api')

    api.init_app(blueprint)

    # Add namespaces
    api.add_namespace(auth_ns)
    api.add_namespace(users_ns)
    api.add_namespace(resources_ns)

    flask_app.register_blueprint(blueprint)

    # Create blueprint for GitHub
    github_blueprint = create_flask_blueprint(GitHub, oauth, handle_oauth2_authorization)
    app.register_blueprint(github_blueprint, url_prefix='/github')

    # Configure OAuth2.0
    oauth.init_app(app)

    # Initialize database
    init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    session.remove()


if __name__ == '__main__':
    initialize_app(app)
    app.run(debug=True, host='0.0.0.0')
