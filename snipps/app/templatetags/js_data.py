"""
Because we are taking the hybrid approach to using React w/ back-end rendered
Django templates, it's a common pattern to pass a Python dict of data to the JS
being loaded in the template.
The following tag provides a shortcut and sets a specified dict to window.INITIAL_DATA.
The return value is a <script> tag.
"""

import json

from django import template
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter()
def js_data(data):
    result = '<script>window.JS_DATA = %s</script>' % json.dumps(data)
    return mark_safe(result)