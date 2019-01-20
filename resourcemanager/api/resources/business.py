"""Module responsible for business logic for all resources endpoints."""
from typing import List

import resourcemanager.repositories.products as products_repository
import resourcemanager.repositories.operations as operations_repository
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


def try_to_sync(operations_list: List[any], operation_id: str):
    """Try to sync application status with the server"""
    operation = operations_repository.get_operation_with_id(operation_id)
    if operation:
        print("Sync was already done!")
        return
    operations_repository.add_operation(operation_id)
    for operation in operations_list:
        if operation["name"] == "add":
            add_new_product(operation["manufacturer_name"], operation["model_name"], float(operation["price"]))
        elif operation["name"] == "remove":
            remove_product(operation["id"])
        elif operation["name"] == "increase":
            increase_product_quantity(operation["id"], int(operation["amount"]))
        elif operation["name"] == "decrease":
            decrease_product_quantity(operation["id"], int(operation["amount"]))
