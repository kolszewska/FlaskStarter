"""Module responsible for definition of Auth service."""

import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from .forms import RegistrationForm

auth_blue_print = Blueprint('auth', __name__, url_prefix='/auth')


@auth_blue_print.route('/register', methods='POST')
def register():
    """Endpoint for user registration."""
    registration_form = RegistrationForm(request.form)
    if registration_form.validate():








