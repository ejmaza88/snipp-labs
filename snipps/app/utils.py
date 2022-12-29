from django.http import JsonResponse


class SuccessJsonResponse(JsonResponse):
    """
    Add success field to JsonResponse
    """

    def __init__(self, data: dict = None, *args, **kwargs):
        success_data = {"success": True}

        if data:
            success_data.update(**data)

        super(SuccessJsonResponse, self).__init__(success_data, *args, **kwargs)
    