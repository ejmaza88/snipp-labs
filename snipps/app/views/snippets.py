from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required()
def snippets(request):
    context = {}

    return render(request, 'app/snippets.html', context)
