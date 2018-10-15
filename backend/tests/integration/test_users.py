import json

from backend.tests.integration import get_api_client


def test_add_new_user():
    api_client = get_api_client()

    payload = {'username': 'employee',
               'email': 'employee@company.com'}

    response = api_client.post('/api/auth/register', data=json.dumps(payload),
                               headers={'Content-Type': 'application/json', })
    assert response.status_code == 201

    response = api_client.get('/api/users')
    json_response = json.loads(response.data)

    assert response.status_code == 200
    assert json_response['users'] == [payload]

    api_client.close()


def test_add_new_user__same_username():
    pass


def test_add_new_user__same_email():
    pass
