"""Module responsible for defining all relational database models."""
from sqlalchemy import Column, Integer, String

from backend.database import Base


class User(Base):
    """Defines model for the User."""
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(80), unique=False, nullable=False)
    last_name = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)

    def __init__(self, first_name: str, last_name: str, email: str):
        """Initialize User."""
        self.first_name = first_name
        self.last_name = last_name
        self.email = email

    def __repr__(self):
        """String representation for User."""
        return '<{}: {}: {}:>'.format(self.__class__.__name__, self.id, self.email)
