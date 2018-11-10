"""Module responsible for business logic for all Auth endpoints."""
import resourcemanager.repositories.users as users_repository

from resourcemanager.database.models import User
from resourcemanager.api.exceptions import InvalidArgumentsException


def add_user(username: str, email: str) -> int:
    """Add new users."""
    user = users_repository.get_user_by_email(email)
    if user:
        raise InvalidArgumentsException('User with this e-mail already exist!')
    else:
        return users_repository.add_user(username, email)


def get_user_with_username(username: str) -> User:
    """"Get users for given username."""
    return users_repository.get_user_by_email(username)
