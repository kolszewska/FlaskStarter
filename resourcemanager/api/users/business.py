"""Module responsible for business logic for all User related endpoints."""
from typing import List

from resourcemanager.database.models import User
import resourcemanager.repositories.users as users_repository


def get_all_users() -> List[User]:
    """"Get all users."""
    return users_repository.get_all_users()
