"""Module responsible for business logic for all resources endpoints."""
from typing import List

import resourcemanager.repositories.products as products_repository
from resourcemanager.database.models import Product


def add_new_product(manufacturer_name: str, model_name: str, price: float) -> int:
    """Add new Product."""
    return products_repository.add_product(manufacturer_name, model_name, price)


def remove_product(product_id: str) -> None:
    """Remove Product."""
    return products_repository.remove_product(product_id)


def increase_product_quantity(product_id: str, quantity_change: int) -> int:
    """Increase actual quantity of the Product."""
    return products_repository.increase_product_quantity(product_id, quantity_change)


def decrease_product_quantity(product_id: str, quantity_change: int) -> int:
    """Decrease actual quantity of the Product."""
    return products_repository.decrease_product_quantity(product_id, quantity_change)


def get_all_products() -> List[Product]:
    """Get list of all Products."""
    return products_repository.get_all_products()
