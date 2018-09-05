"""Module responsible for business logic for all Auth endpoints."""
from flask_starter.database.models import User
import flask_starter.repositories.users as users_repository


def add_user(username: str, email: str) -> None:
    """Add new user."""
    users_repository.add_user(username, email)


def get_user_with_username(username: str) -> User:
    """"Get user for given username and return it."""
    return users_repository.get_user_by_username(username)
