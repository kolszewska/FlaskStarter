"""Module responsible for business logic for all Auth endpoints."""
from flask_jwt_extended import create_access_token

import resourcemanager.repositories.users as users_repository
from resourcemanager.database.models import User
from resourcemanager.api.exceptions import InvalidArgumentsException


def add_user(username: str, email: str, password: str) -> int:
    """Add new users."""
    user = users_repository.get_user_by_email(email)
    if user:
        raise InvalidArgumentsException('User with this e-mail already exist!')
    else:
        return users_repository.add_user(username, email, password)


def get_user_with_username(username: str) -> User:
    """"Get users for given username."""
    return users_repository.get_user_by_email(username)


def generate_access_token_for_user(username: str):
    """Generate JWT token for user"""
    return create_access_token(identity=username)


def log_in_user(email: str, password: str):
    """Log in user."""
    print(email)
    user = users_repository.get_user_by_email(email)
    print(user)
    if not user:
        raise InvalidArgumentsException('User with this e-mail does not exist!')
    else:
        if user.password == password:
            return generate_access_token_for_user(user.username)
        else:
            raise InvalidArgumentsException('E-mail or password is incorrect!')
