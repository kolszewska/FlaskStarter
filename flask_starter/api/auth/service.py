"""Module responsible for definition of Auth service."""
from flask import (
    Blueprint, flash, redirect, render_template, request, url_for
)

from flask_starter.api.auth.forms import RegistrationForm
from flask_starter.api.auth.business import get_user_with_username, add_user

auth_blue_print = Blueprint('auth', __name__, url_prefix='/auth')


@auth_blue_print.route('/register', methods=['POST'])
def register():
    """Endpoint for user registration."""
    registration_form = RegistrationForm(request.form)
    if registration_form.validate():
        username = request.form['username']
        email = request.form['email']
        user = get_user_with_username(username)
        if user is None:
            add_user(username, email)
            return redirect(url_for('auth.login'))
        else:
            flash('User with {} username already exists!'.format(username))

    return render_template('auth/register.html')


@auth_blue_print.route('/login', methods=['POST'])
def login():
    pass
