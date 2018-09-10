"""Module responsible for definition of Auth service."""
from flask import request

from flask_restplus import Resource

from flask_starter.api import api
from flask_starter.api.auth.serializers import new_user
from flask_starter.api.auth.business import add_user

auth_ns = api.namespace('auth', description='Operations related to authorization.')


@auth_ns.route('/register')
class Register(Resource):

    @staticmethod
    @api.response(201, 'User was successfully created.')
    @api.expect(new_user)
    def post():
        """Endpoint for User registration."""
        user = request.json
        user_id = add_user(user)
        return user_id, 201
