from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': "db",
        'NAME': 'snipps',
        'USER': 'root',
        'PASSWORD': 'snippspass1234',
        'PORT': '5432',
    }
}
