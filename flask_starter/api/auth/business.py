"""Module responsible for business logic for all Auth endpoints."""
from flask_starter.database.models import User
import flask_starter.repositories.users as users_repository


def add_user(user: User) -> int:
    """Add new user."""
    u = get_user_with_username(user.username)
    if not u:
        return users_repository.add_user(user.username, user.email)
    else:
        raise Exception


def get_user_with_username(username: str) -> User:
    """"Get user for given username and return it."""
    return users_repository.get_user_by_username(username)
