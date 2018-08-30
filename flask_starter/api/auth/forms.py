"""Module responsible for definition of forms for Auth endpoints."""

from wtforms import Form, StringField, PasswordField, validators


class RegistrationForm(Form):
    """Form for user registration."""
    username = StringField('Username', [validators.DataRequired()])
    email = StringField('E-mail Address', [validators.DataRequired(), validators.Email()])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('Confirm', message='Passwords must match')
    ])
    confirm_password = PasswordField('Confirm password')
