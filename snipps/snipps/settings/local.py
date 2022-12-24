from .base import *

DEBUG = True

SECRET_KEY = 'wy4j&+^@i02-sezb2zs1-174vg=ht*m&!kzg+8c=9xupw4#v@q'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '192.168.1.154',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

STATIC_ROOT = Path(BASE_DIR, '_static')  # Change on production

MANIFEST_LOADER = {
    # 'output_dir': 'dev_bundles/',
    # 'manifest_file': 'manifest.dev.json',
    'manifest_file': Path(BASE_DIR, 'build', 'manifest.dev.json'),
    'cache': not DEBUG
}
