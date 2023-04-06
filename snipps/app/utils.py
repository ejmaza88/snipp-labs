from django.http import JsonResponse
from django.urls import path


class SuccessJsonResponse(JsonResponse):
    """
    Add success field to JsonResponse
    """

    def __init__(self, data: dict = None, *args, **kwargs):
        success_data = {"success": True}

        if data:
            success_data.update(**data)

        super(SuccessJsonResponse, self).__init__(success_data, *args, **kwargs)


def linq_api_path(route, view, name=None):
    route_prefix = "api/linqs/"
    route_path = f"{route_prefix}{route}"

    return path(route_path, view, name=name)


def snippet_api_path(route, view, name=None):
    route_prefix = "api/snippets/"
    route_path = f"{route_prefix}{route}"

    return path(route_path, view, name=name)

    