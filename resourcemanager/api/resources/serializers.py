"""Module defining serializers for resources."""
from flask_restplus import fields

from resourcemanager.api import api

new_product = api.model('New product', {
    'manufacturer_name': fields.String(required=True),
    'model_name': fields.String(required=True),
    'price': fields.Float(required=True),
})

quantity_update = api.model('Quantity update', {
    'amount': fields.Integer(required=True),
})

product = api.model('Product', {
    'id': fields.String(required=True),
    'manufacturer_name': fields.String(required=True),
    'model_name': fields.String(required=True),
    'price': fields.Float(required=True),
    'quantity': fields.Integer(required=True),
})

products_list = api.model('Products list', {
    'products': fields.List(fields.Nested(product)),
})
