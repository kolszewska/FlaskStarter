"""Configuration for Resource Manager."""

SECRET_KEY = b'secret'

JWT_SECRET_KEY = 'jwt-secret-key'
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access']

GITHUB_CLIENT_ID = ''
GITHUB_CLIENT_SECRET = ''
