"""
This script is run when `make django-shell` is run, or when an interactive Python shell
is opened in the `make shell` context.

Create a file `extra_startup.py` in a local env to add more commands to the
startup script. `extra_startup.py` is not tracked. Added to `.gitignore`
"""
import os

from app.models import Category

try:
    from extra_settings import *
except ImportError:
    pass
