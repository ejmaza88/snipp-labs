from django.shortcuts import render, redirect


def home(request):
    return redirect('app:linqs')

def linqs(request):
    context = {}

    return render(request, 'app/linqs.html', context)



def snippets(request):
    context = {}

    return render(request, 'app/snippets.html', context)
