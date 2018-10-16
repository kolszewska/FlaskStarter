"""Module responsible for business logic for all Auth endpoints."""
import backend.repositories.users as users_repository

from backend.database.models import User
from backend.api.exceptions import InvalidArgumentsException


def add_user(first_name: str, last_name: str, email: str) -> int:
    """Add new users."""
    user = users_repository.get_user_by_email(email)
    if user:
        raise InvalidArgumentsException('User with this e-mail already exist!')
    else:
        return users_repository.add_user(first_name, last_name, email)


def get_user_with_username(username: str) -> User:
    """"Get users for given username."""
    return users_repository.get_user_by_email(username)
