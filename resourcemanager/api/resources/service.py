"""Module responsible for definition of Auth service."""
from typing import Any

from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restplus import Resource

from resourcemanager.api import api
from resourcemanager.api.resources import serializers
from resourcemanager.api.resources.business import add_new_product, increase_product_quantity, \
    decrease_product_quantity, remove_product, get_all_products

resources_ns = api.namespace('resources', description='Operations related to resources.')


@resources_ns.route('')
class GetProducts(Resource):

    @staticmethod
    @jwt_required
    @resources_ns.doc(security='token')
    @resources_ns.doc(responses={200: 'Successfully retrieved products.'})
    @resources_ns.marshal_with(serializers.products_list)
    def patch() -> Any:
        """Endpoint for retrieving all Products."""
        products = get_all_products()
        return {'products': products}, 200


@resources_ns.route('/add_product')
class AddProduct(Resource):

    @staticmethod
    @jwt_required
    @resources_ns.doc(security='token')
    @resources_ns.doc(responses={201: 'Product was successfully added.', 400: 'Invalid arguments.'})
    @resources_ns.expect(serializers.new_product)
    def post() -> Any:
        """Endpoint for adding new Product."""
        product = request.json
        product_id = add_new_product(product['manufacturer_name'], product['model_name'], product['price'])
        return {'product_id': product_id}, 201


@resources_ns.route('/remove_product/<string:product_id>')
@resources_ns.param('product_id', 'Product identifier.')
class RemoveProduct(Resource):

    @staticmethod
    @jwt_required
    @resources_ns.doc(security='token')
    @resources_ns.doc(
        responses={201: 'Product was successfully removed.', 400: 'Invalid arguments.', 403: 'Unauthorized.'})
    def delete(product_id: str) -> Any:
        """Endpoint for removing Product."""
        is_admin = get_jwt_identity()['is_admin']
        if is_admin:
            remove_product(product_id)
            return 200
        else:
            return 403


@resources_ns.route('/increase_quantity/<string:product_id>')
@resources_ns.param('product_id', 'Product identifier.')
class IncreaseProductQuantity(Resource):

    @staticmethod
    @jwt_required
    @resources_ns.doc(security='token')
    @resources_ns.doc(responses={201: 'Product quantity was successfully increased.', 400: 'Invalid arguments.'})
    @resources_ns.expect(serializers.quantity_update)
    def patch(product_id: str) -> Any:
        """Endpoint for increasing quantity for Product."""
        data = request.json
        new_quantity = increase_product_quantity(product_id, int(data['amount']))
        return {'new_quantity': new_quantity}, 200


@resources_ns.route('/decrease_quantity/<string:product_id>')
@resources_ns.param('product_id', 'Product identifier.')
class DecreaseProductQuantity(Resource):

    @staticmethod
    @jwt_required
    @resources_ns.doc(security='token')
    @resources_ns.doc(responses={201: 'Product quantity was successfully decreased.', 400: 'Invalid arguments.'})
    @resources_ns.expect(serializers.quantity_update)
    def patch(product_id: str) -> Any:
        """Endpoint for decreasing quantity for Product."""
        data = request.json
        new_quantity = decrease_product_quantity(product_id, int(data['amount']))
        return {'new_quantity': new_quantity}, 200
