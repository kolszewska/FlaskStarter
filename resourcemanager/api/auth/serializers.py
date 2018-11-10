"""Module defining serializers for authorization."""
from flask_restplus import fields

from resourcemanager.api import api

new_user = api.model('User', {
    'username': fields.String(required=True),
    'email': fields.String(required=True),
    'password': fields.String(required=True),
})
