"""Module responsible for definition of UserRepository."""
from typing import List

from backend.database import db_session

from backend.database.models import User


def add_user(first_name: str, last_name: str, email: str) -> int:
    """Add new User to database."""
    with db_session() as session:
        user = User(first_name, last_name, email)
        session.add(user)
        session.commit()
    return user.id


def get_user_by_email(email: str) -> User:
    """Get User for given email."""
    return User.query.filter_by(username=email).first()


def get_all_users() -> List[User]:
    """Get all users."""
    return User.query.all()
