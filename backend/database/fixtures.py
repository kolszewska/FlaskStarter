"""Insert all needed database fixtures."""
import logging

from sqlalchemy.exc import IntegrityError

from backend.repositories.users import add_user


def add_users() -> None:
    """Insert default users."""
    add_user('Bob', 'Newbie', 'employee@company.com')
    add_user('George', 'Bossy', 'manager@company.com')


def apply_all_fixtures() -> None:
    """Apply all fixtures."""
    logging.info('Applying fixtures, adding users...')
    add_users()


if __name__ == '__main__':
    try:
        apply_all_fixtures()
    except IntegrityError:
        logging.exception('Something went wrong when applying fixtures.')
