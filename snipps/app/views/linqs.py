import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.http import require_POST

from app.models import Category
from app.serializers import CategorySerializer


@login_required
def home(request):
    return redirect('app:linqs')


@login_required
def linqs(request):
    categories = Category.objects.all()

    context = {
        'init_js_data': {
            'categories': CategorySerializer(categories, many=True).data,
            'addCategoryAPI': reverse('app:add-category')
        }
    }

    return render(request, 'app/linqs.html', context)


# API VIEWS
@login_required
@require_POST
def add_category(request):
    data = json.loads(request.body)
    instance = Category.objects.create(name=data.get('name'), new=data.get('new'))
    context = {
        'success': True,
        'obj': CategorySerializer(instance).data
    }
    return JsonResponse(context)
