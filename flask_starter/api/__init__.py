"""Module responsible for defining API."""
from flask import Flask

from flask_starter.config import Config
from flask_starter.database import db_session, init_db
from flask_starter.api.auth.service import auth_blue_print

# Definition of application
app = Flask(__name__, instance_relative_config=True)
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(auth_blue_print)

# Initialize database
init_db()


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == '__main__':
    app.run()
