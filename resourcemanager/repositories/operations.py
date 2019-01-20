"""Module responsible for definition of OperationsRepository."""
from resourcemanager.database import db_session

from resourcemanager.database.models import Operation


def add_operation(operation_id) -> None:
    """Add operation with given ID"""
    with db_session() as session:
        operation = Operation(operation_id)
        session.add(operation)
        session.commit()


def get_operation_with_id(operation_id) -> Operation:
    """Get operation with  given ID."""
    return Operation.query.filter_by(id=operation_id).first()
