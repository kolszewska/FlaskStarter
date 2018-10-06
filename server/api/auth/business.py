"""Module responsible for business logic for all Auth endpoints."""
from server.database.models import User
import server.repositories.users as users_repository


def add_user(username: str, email: str, password: str) -> int:
    """Add new user."""
    u = get_user_with_username(username)
    if not u:
        return users_repository.add_user(username, email)
    else:
        raise Exception


def get_user_with_username(username: str) -> User:
    """"Get user for given username and return it."""
    return users_repository.get_user_by_username(username)
