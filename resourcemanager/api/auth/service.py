"""Module responsible for definition of Auth service."""
from typing import Any

from flask import request, redirect, jsonify
from flask_restplus import Resource

from resourcemanager.api import api
from resourcemanager.api.auth import serializers
from resourcemanager.api.auth.business import add_user, generate_access_token_for_user, log_in_user

auth_ns = api.namespace('auth', description='Operations related to authorization.')


@auth_ns.route('/oauth2')
class OAuth2Authorization(Resource):

    @staticmethod
    def get() -> Any:
        """Redirect to user GitHub as a provider."""
        return redirect('github/login')


def handle_oauth2_authorization(remote, token, user_info):
    if token:
        # Generate token for application for user
        access_token = generate_access_token_for_user(user_info['preffered_username'])
        return jsonify(access_token)


@auth_ns.route('/register')
class Register(Resource):

    @staticmethod
    @api.doc(responses={201: 'User was successfully created.', 400: 'Invalid arguments.'})
    @api.expect(serializers.new_user)
    def post() -> Any:
        """Endpoint for User registration."""
        user = request.json
        user_id = add_user(user['username'], user['email'], user['password'])
        return {'id': user_id}, 201


@auth_ns.route('/login')
class Register(Resource):

    @staticmethod
    @api.doc(responses={200: 'User was successfully logged in.',
                        400: 'User does not exist or wrong credentials were provided.'})
    @api.expect(serializers.sign_in)
    def post() -> Any:
        """Endpoint for User sign in."""
        sign_in = request.json
        print(sign_in)
        token = log_in_user(sign_in['email'], sign_in['password'])
        return {'token': token}, 200
