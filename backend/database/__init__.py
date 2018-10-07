"""Module responsible for defining ORM layer."""
from contextlib import contextmanager
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

from backend.config import Config

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = session.query_property()


@contextmanager
def db_session() -> Generator[Session, None, None]:
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise


def init_db():
    """Initialize database."""
    import backend.database.models
    Base.metadata.create_all(bind=engine)

