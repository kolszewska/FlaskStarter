"""Defining configuration for application."""
import os

base_dir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """Application configuration."""
    SECRET_KEY = 'secret'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(base_dir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
