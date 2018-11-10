"""Module responsible for business logic for all Auth endpoints."""
from flask_jwt_extended import create_access_token

import resourcemanager.repositories.users as users_repository
import resourcemanager.repositories.tokens as tokens_repository
from resourcemanager.database.models import User
from resourcemanager.api.exceptions import InvalidArgumentsException


def add_user(username: str, email: str, password: str) -> int:
    """Add new User."""
    user = users_repository.get_user_by_email(email)
    if user:
        raise InvalidArgumentsException('User with this e-mail already exist!')
    else:
        return users_repository.add_user(username, email, password)


def get_user_with_username(username: str) -> User:
    """"Get users for given username."""
    return users_repository.get_user_by_email(username)


def generate_access_token_for_user(username: str, is_admin: bool):
    """Generate JWT token for user"""
    return create_access_token(identity={'username:': username, 'is_admin': is_admin})


def log_in_user(email: str, password: str):
    """Log in user."""
    user = users_repository.get_user_by_email(email)
    if not user:
        raise InvalidArgumentsException('User with this e-mail does not exist!')
    else:
        if User.verify_hash(password, user.password):
            return generate_access_token_for_user(user.username, user.is_admin)
        else:
            raise InvalidArgumentsException('E-mail or password is incorrect!')


def add_token_to_blacklist(jti):
    """Add JTI to blacklist"""
    tokens_repository.add_revoked_token(jti)
