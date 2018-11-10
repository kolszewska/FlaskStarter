"""Module responsible for definition of Auth service."""
from typing import Any

from flask import request
from flask_restplus import Resource

from resourcemanager.api import api
from resourcemanager.api.resources import serializers
from resourcemanager.api.resources.business import add_new_product, increase_product_quantity, \
    decrease_product_quantity, remove_product, get_all_products

resources_ns = api.namespace('resources', description='Operations related to resources.')


@resources_ns.route('')
class GetProducts(Resource):

    @staticmethod
    @api.doc(responses={200: 'Successfully retrieved products.'})
    @resources_ns.marshal_with(serializers.products_list)
    def patch() -> Any:
        """Endpoint for retrieving all Products."""
        products = get_all_products()
        return {'products': products}, 200


@resources_ns.route('/add_product')
class AddProduct(Resource):

    @staticmethod
    @api.doc(responses={201: 'Product was successfully added.', 400: 'Invalid arguments.'})
    @api.expect(serializers.new_product)
    def post() -> Any:
        """Endpoint for adding new Product."""
        product = request.json
        product_id = add_new_product(product['manufacturer_name'], product['model_name'], product['price'])
        return {'product_id': product_id}, 201


@resources_ns.route('/remove_product/<string:product_id>')
@resources_ns.param('product_id', 'Product identifier.')
class RemoveProduct(Resource):

    @staticmethod
    @api.doc(responses={201: 'Product was successfully removed.', 400: 'Invalid arguments.'})
    def delete(product_id: str) -> Any:
        """Endpoint for removing Product."""
        remove_product(product_id)
        return 200


@resources_ns.route('/increase_quantity/<string:product_id>')
@resources_ns.param('product_id', 'Product identifier.')
class IncreaseProductQuantity(Resource):

    @staticmethod
    @api.doc(responses={201: 'Product quantity was successfully increased.', 400: 'Invalid arguments.'})
    @api.expect(serializers.quantity_update)
    def patch(product_id: str) -> Any:
        """Endpoint for increasing quantity for Product."""
        data = request.json
        new_quantity = increase_product_quantity(product_id, data['amount'])
        return {'new_quantity': new_quantity}, 200


@resources_ns.route('/decrease_quantity/<string:product_id>')
@resources_ns.param('product_id', 'Product identifier.')
class DecreaseProductQuantity(Resource):

    @staticmethod
    @api.doc(responses={201: 'Product quantity was successfully decreased.', 400: 'Invalid arguments.'})
    @api.expect(serializers.quantity_update)
    def patch(product_id: str) -> Any:
        """Endpoint for decreasing quantity for Product."""
        data = request.json
        new_quantity = decrease_product_quantity(product_id, data['amount'])
        return {'new_quantity': new_quantity}, 200
