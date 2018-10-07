"""Module responsible for business logic for all Auth endpoints."""
from backend.database.models import User
import backend.repositories.users as users_repository


def add_user(username: str, email: str) -> int:
    """Add new users."""
    u = get_user_with_username(username)
    if not u:
        return users_repository.add_user(username, email)
    else:
        raise Exception


def get_user_with_username(username: str) -> User:
    """"Get users for given username and return it."""
    return users_repository.get_user_by_username(username)
