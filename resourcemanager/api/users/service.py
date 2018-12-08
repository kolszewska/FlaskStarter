"""Module responsible for definition of User related service."""
from typing import Any

from flask import request
from flask_restplus import Resource

from resourcemanager.api import api
from resourcemanager.api.users import serializers
from resourcemanager.api.users.business import get_all_users, make_admin

users_ns = api.namespace('users', description='Operations related to users operations.')


@users_ns.route('')
class GetUsers(Resource):

    @staticmethod
    @users_ns.doc(responses={200: 'Successfully retrieved users.'})
    @users_ns.marshal_with(serializers.users_list)
    def get() -> Any:
        """Endpoint for retrieving all Users."""
        users = get_all_users()
        return {'users': users}


# This is only for testing purposes, I swear
@users_ns.route('/admin')
class Admin(Resource):

    @staticmethod
    @api.expect(serializers.change_to_admin)
    def post() -> Any:
        """Endpoint for making user admin."""
        change_to_admin = request.json
        email = change_to_admin["email"]
        make_admin(email)
        return 201