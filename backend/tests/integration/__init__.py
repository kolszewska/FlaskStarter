"""Module for global methods used across integration tests."""
from typing import Any

from backend.api.rest import initialize_app


def get_api_client() -> Any:
    """Return API client for testing."""
    from backend.api.rest import app
    app.testing = True
    initialize_app(app)
    return app.test_client()
