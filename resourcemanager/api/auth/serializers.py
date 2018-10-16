"""Module defining serializers for authorization."""
from flask_restplus import fields

from resourcemanager.api import api

new_user = api.model('User', {
    'first_name': fields.String(required=True),
    'last_name': fields.String(required=True),
    'email': fields.String(required=True),
    'password': fields.String(required=True),
})
