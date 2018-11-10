"""Module responsible for definition of ProductRepository."""
from typing import List

from resourcemanager.database import db_session
from resourcemanager.database.models import Product
from resourcemanager.exceptions import UnsupportedActionException


def add_product(manufacturer_name: str, model_name: str, price: float) -> int:
    """Add new Product to database."""
    with db_session() as session:
        product = Product(manufacturer_name, model_name, price, quantity=0)
        session.add(product)
        session.commit()
    return product.id


def get_product_with_id(product_id: str) -> Product:
    """Get Product for given id."""
    return Product.query.filter_by(id=product_id).first()


def remove_product(product_id: str) -> None:
    """Remove product with given id"""
    with db_session() as session:
        session.query(Product).filter_by(id=product_id).delete()
        session.commit()


def increase_product_quantity(product_id, quantity_change) -> int:
    """Increase current Product quantity by given amount."""
    with db_session() as session:
        product = get_product_with_id(product_id)
        new_quantity = product.quantity + quantity_change
        product.quantity = new_quantity
        session.commit()
    return product.quantity


def decrease_product_quantity(product_id, quantity_change) -> int:
    """Decrease current Product quantity by given amount."""
    with db_session() as session:
        product = get_product_with_id(product_id)
        if product.quantity - quantity_change >= 0:
            new_quantity = product.quantity - quantity_change
            product.quantity = new_quantity
            session.commit()
        else:
            raise UnsupportedActionException('New amount cannot be negative!')
    return product.quantity


def get_all_products() -> List[Product]:
    """Get all Products."""
    return Product.query.all()
