"""Module responsible for defining API."""
import os
from typing import Any

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from flask_starter.database.configuration import register_db_functions
from flask_starter.api.auth.service import auth_blue_print


def create_app(test_config=None) -> Any:
    """Create and configure application."""
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(auth_blue_print)

    @app.route('/hello')
    def hello():
        return 'Hello'

    return app
