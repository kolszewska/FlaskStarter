"""Module responsible for definition of UserRepository."""
from flask_starter.database import db_session

from flask_starter.database.models import User


def add_user(username: str, email: str) -> None:
    """Add new User to database."""
    with db_session() as session:
        user = User(username=username, email=email)
        session.add(user)
        session.commit()


def get_user_by_username(username: str) -> User:
    """Get User for given username."""
    return User.query.filter_by(username=username).one()
