"""Module responsible for definition of UserRepository."""
from typing import List

from backend.database import db_session

from backend.database.models import User


def add_user(username: str, email: str) -> int:
    """Add new User to database."""
    with db_session() as session:
        user = User(username=username, email=email)
        session.add(user)
        session.commit()
    return user.id


def get_user_by_username(username: str) -> User:
    """Get User for given username."""
    return User.query.filter_by(username=username).first()


def get_all_users() -> List[User]:
    """Get all users."""
    return User.query.all()
