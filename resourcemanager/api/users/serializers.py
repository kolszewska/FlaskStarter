"""Module defining serializers for User."""
from flask_restplus import fields

from resourcemanager.api import api

user = api.model('User', {
    'username': fields.String(required=True),
    'email': fields.String(required=True),
})

users_list = api.model('Users list', {
    'users': fields.List(fields.Nested(user)),
})

change_to_admin = api.model('Make user admin', {
    'email': fields.String(required=True),
})
