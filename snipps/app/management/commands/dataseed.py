import json
import pendulum
from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError
from app.models import (
    Category,
    LinqLabel,
    LinqUrl,
    SnippetCategory,
    SnippetLabel,
    Snippet,
)


class Command(BaseCommand):
    help = "Seed database"

    def handle(self, *args, **options):
        migrate_database()
        create_test_superuser()
        seed_linqs_test_data()
        seed_snippets_test_data()


def migrate_database():
    call_command("migrate", verbosity=0)


def create_test_superuser():
    User = get_user_model()

    User.objects.create_superuser(
        username=settings.SU_USERNAME,
        email=settings.SU_EMAIL,
        password=settings.SU_PASSWORD,
        first_name=settings.SU_FIRST_NAME,
        last_name=settings.SU_LAST_NAME,
    )


def seed_linqs_test_data():
    data_dump = Path().joinpath(settings.BASE_DIR, "app", "data", "app_data_dump.json")

    with open(data_dump, "r") as f:
        data = json.load(f)

        categories = [x for x in data if x["model"] == "app.category"]
        linqs = [x for x in data if x["model"] == "app.stuff"]

        Category.objects.bulk_create(
            (
                Category(
                    user_id=1,
                    name=x["fields"]["category"],
                    added=pendulum.parse(x["fields"]["added"]),
                    new_item=False,
                )
                for x in categories
            )
        )

        # add all the labels
        saved_categories = list(Category.objects.all().values("name", "id"))

        linqs_to_add = []

        for linq in linqs:
            label = linq["fields"]["label"]
            category = linq["fields"]["category"]
            category_name_from_json = next(filter(lambda x: x["pk"] == category, categories))["fields"]["category"]
            saved_category_id = next(filter(lambda x: x["name"] == category_name_from_json, saved_categories))["id"]
            linqs_to_add.append(
                LinqLabel(
                    category_id=saved_category_id,
                    name=label,
                    added=pendulum.parse(linq["fields"]["added"])
                )
            )

        LinqLabel.objects.bulk_create(linqs_to_add)

        # add all the urls
        saved_labels = LinqLabel.objects.all().values("name", "id")

        url_list_to_add = []

        for linq in linqs:
            url_list = [x.strip() for x in linq["fields"]["url"].split(',')]
            label = linq["fields"]["label"]
            label_name_from_json = next(filter(lambda x: x["name"] == label, saved_labels))["id"]

            for url in url_list:
                url_list_to_add.append(
                    LinqUrl(
                        label_id=label_name_from_json,
                        url=url
                    )
                )

        LinqUrl.objects.bulk_create(url_list_to_add)


def seed_snippets_test_data():
    categories = ["Django", "Linux", "PostgreSQL", "Python", "Terminal"]

    SnippetCategory.objects.bulk_create(
        (
            SnippetCategory(
                user_id=1,
                name=name
            ) for name in categories
        )
    )

    test_snippets_files = (
        ("admin.py", "Django Admin Site"),
        ("models.py", "Django Models"),
        ("serializers.py", "DRF Serializers"),
    )

    for file_name, label_name in test_snippets_files:
        file_path = Path().joinpath(settings.BASE_DIR, "app", file_name)
        with open(file_path, "r") as f:
            snippet = Snippet.objects.create(value=json.dumps(f.read()))
            SnippetLabel.objects.create(
                category_id=1,
                snippet=snippet,
                name=label_name,
            )
