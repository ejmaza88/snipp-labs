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
                {'id': 1, 'name': 'AWS', 'new': False},
                {'id': 2, 'name': 'Babel', 'new': False},
                {'id': 3, 'name': 'Bootstrap', 'new': False},
                {'id': 4, 'name': 'DevOps', 'new': True},
                {'id': 5, 'name': 'Django', 'new': False},
                {'id': 6, 'name': 'Docker', 'new': True},
                {'id': 7, 'name': 'Git', 'new': False},
                {'id': 8, 'name': 'Linux', 'new': False},
                {'id': 9, 'name': 'Python', 'new': False},
            ]
        }
    }

    return render(request, 'app/linqs.html', context)


@login_required()
def snippets(request):
    context = {}

    return render(request, 'app/snippets.html', context)
