from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


@login_required()
def home(request):
    return redirect('app:linqs')


@login_required()
def linqs(request):
    context = {
        'init_js_data': {
            'categories': [
                {'id': 1, 'name': 'AWS'},
                {'id': 1, 'name': 'AWS'},
                {'id': 1, 'name': 'AWS'},
            ]
        }
    }

    return render(request, 'app/linqs.html', context)


@login_required()
def snippets(request):
    context = {}

    return render(request, 'app/snippets.html', context)
