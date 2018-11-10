"""Module responsible for definition of TokensRepository."""
from resourcemanager.database import db_session
from resourcemanager.database.models import RevokedToken


def add_revoked_token(token):
    """Add new Revoked Token to database."""
    with db_session() as session:
        token = RevokedToken(jti=token)
        session.add(token)
        session.commit()


def is_jti_blacklisted(jti):
    """Check if JTI is blacklisted."""
    token = RevokedToken.query.filter_by(jti=jti).first()
    return bool(token)
