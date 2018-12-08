"""Module responsible for business logic for all User related endpoints."""
from typing import List

from resourcemanager.database.models import User
import resourcemanager.repositories.users as users_repository


def get_all_users() -> List[User]:
    """"Get all users."""
    return users_repository.get_all_users()


def make_admin(email: str):
    """Make user admin."""
    user = users_repository.get_user_by_email(email)
    if not user:
        raise InvalidArgumentsException('User with this e-mail does not exist!')
    else:
        users_repository.make_admin(email)
