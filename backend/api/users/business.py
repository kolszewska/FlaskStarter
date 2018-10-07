"""Module responsible for business logic for all User related endpoints."""
from typing import List

from backend.database.models import User
import backend.repositories.users as users_repository


def get_all_users() -> List[User]:
    """"Get all users."""
    return users_repository.get_all_users()
