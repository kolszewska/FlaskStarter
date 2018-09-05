"""Module responsible for defining all relational database models."""
from sqlalchemy import Column, Integer, String

from flask_starter.database import Base


class User(Base):
    """Defines model for the User."""
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)

    def __init__(self, username: str, email: str):
        """Initialize User."""
        self.username = username
        self.email = email

    def __repr__(self):
        """String representation for User."""
        return '<{}: {}: {}:>'.format(self.__class__.__name__, self.id, self.username)
