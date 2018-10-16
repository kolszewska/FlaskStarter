"""Module responsible for definition of Auth service."""
from flask import request

from flask_restplus import Resource

from resourcemanager.api import api
from resourcemanager.api.auth.serializers import new_user
from resourcemanager.api.auth.business import add_user

auth_ns = api.namespace('auth', description='Operations related to authorization.')


@auth_ns.route('/register')
class Register(Resource):

    @staticmethod
    @api.doc(responses={201: 'User was successfully created.', 400: 'Invalid arguments.'})
    @api.expect(new_user)
    def post():
        """Endpoint for User registration."""
        user = request.json
        user_id = add_user(user['first_name'], user['last_name'], user['email'])
        return user_id, 201
