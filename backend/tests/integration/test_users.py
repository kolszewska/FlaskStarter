from backend.api.auth.business import add_user
from backend.tests.integration import get_api_client


def test_add_new_user():
    api_client = get_api_client()

    #add_user('employee', 'emplute@dsad')

    response = api_client.get('/api/users')
    assert response.data == 1


def test_add_new_user__same_username():
    pass


def test_add_new_user__same_email():
    pass

