"""Module defining serializers for authorization."""
from flask_restplus import fields

from resourcemanager.api import api

new_user = api.model('New user', {
    'username': fields.String(required=True),
    'email': fields.String(required=True),
    'password': fields.String(required=True),
})

sign_in = api.model('Sign in', {
    'email': fields.String(required=True),
    'password': fields.String(required=True),
})
