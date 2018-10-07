"""Module responsible for definition of User related service."""
from flask import request

from flask_restplus import Resource

from backend.api import api
from backend.api.users import serializers
from backend.api.users.business import get_all_users

users_ns = api.namespace('users', description='Operations related to users operations.')


@users_ns.route('')
class GetUsers(Resource):

    @staticmethod
    @api.doc(responses={200: 'Successfully retrieved users.'})
    @users_ns.marshal_with(serializers.users_list)
    def get():
        """Endpoint for retrieving all Users."""
        users = get_all_users()
        return {'users': users}
