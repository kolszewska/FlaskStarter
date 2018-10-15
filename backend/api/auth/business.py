"""Module responsible for business logic for all Auth endpoints."""
import backend.repositories.users as users_repository

from backend.database.models import User
from backend.api.exceptions import InvalidArgumentsException


def add_user(username: str, email: str) -> int:
	"""Add new users."""
	user = get_user_with_username(username)
	if user:
		raise InvalidArgumentsException('User with this username already exist!')
	else:
		return users_repository.add_user(username, email)


def get_user_with_username(username: str) -> User:
	""""Get users for given username."""
	return users_repository.get_user_by_username(username)
