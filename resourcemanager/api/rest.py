"""Module responsible for defining API."""
import os

from flask import Flask, Blueprint, jsonify
from authlib.flask.client import OAuth
from loginpass import create_flask_blueprint
from loginpass import GitHub

from resourcemanager.api import api
from resourcemanager.api.auth.service import auth_ns
from resourcemanager.api.oauth2 import config_oauth
from resourcemanager.api.users.service import users_ns
from resourcemanager.database import session, init_db

OAUTH_BACKENDS = [
    GitHub,
]

# Definition of application
app = Flask(__name__)

# Use configuration file
app.config.from_pyfile('config.py')


class Cache(object):
    def __init__(self):
        self._data = {}

    def get(self, k):
        return self._data.get(k)

    def set(self, k, v, timeout=None):
        self._data[k] = v

    def delete(self, k):
        if k in self._data:
            del self._data[k]


oauth = OAuth(app, Cache())


@app.route('/')
def index():
    tpl = '<li><a href="/{}/login">{}</a></li>'
    lis = [tpl.format(b.OAUTH_NAME, b.OAUTH_NAME) for b in OAUTH_BACKENDS]
    print(tpl)
    return '<ul>{}</ul>'.format(''.join(lis))


def handle_authorize(remote, token, user_info):
    return jsonify(user_info)


for backend in OAUTH_BACKENDS:
    bp = create_flask_blueprint(backend, oauth, handle_authorize)
    app.register_blueprint(bp, url_prefix='/{}'.format(backend.OAUTH_NAME))


def initialize_app(flask_app):
    # Register blueprints
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)

    # Add namespaces
    api.add_namespace(auth_ns)
    api.add_namespace(users_ns)

    flask_app.register_blueprint(blueprint)

    # Configure OAuth2.0
    # config_oauth(api)

    # Initialize database
    init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    session.remove()


if __name__ == '__main__':
    initialize_app(app)
    app.run(debug=True)
