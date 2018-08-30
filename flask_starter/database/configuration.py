import logging
import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def create_connection():
    """Connect to database."""
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES,
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_connection(e=None):
    """Close connection to database."""
    db = g.pop('db', None)

    if db is not None:
        db.close()

    logging.debug('Closed database connection.')


def init_db():
    """Initialize database."""
    db = create_connection()
    with open('flask_starter/database/schema.sql') as f:
        db.executescript(f.read())


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear existing data in database and create new tables."""
    init_db()
    click.echo('Database was initialized.')


def register_db_functions(app):
    """Register db functions within application."""
    app.teardown_appcontext(close_connection)
    app.cli.add_command(init_db_command)
