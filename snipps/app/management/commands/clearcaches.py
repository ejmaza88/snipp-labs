from django.core.cache import caches
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Clear caches for LinQs and Snippets"

    def handle(self, *args, **options):
        caches["linqs"].clear()
        caches["snipps"].clear()

        self.stdout.write("Caches cleared")


