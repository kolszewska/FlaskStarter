"""Module responsible for defining all relational database models."""
from sqlalchemy import Column, Integer, String

from resourcemanager.database import Base


class User(Base):
    """Defines model for the User."""
    __tablename__ = 'users'
    id = Column(Integer, autoincrement=True, primary_key=True)
    username = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)