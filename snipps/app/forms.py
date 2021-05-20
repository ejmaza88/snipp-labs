from django import forms
from django.contrib.auth import forms as auth_forms


class LoginForm(auth_forms.AuthenticationForm):
    """User Login Form"""
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

        username_field = self.fields['username']
        username_field.label = 'Username'
        username_field.label_suffix = ''
        username_field.widget.attrs['class'] = "form-control"
        username_field.widget.attrs['placeholder'] = username_field.label

        password_field = self.fields['password']
        password_field.label = 'Password'
        password_field.label_suffix = ''
        password_field.widget.attrs['class'] = "form-control"
        password_field.widget.attrs['placeholder'] = password_field.label
