import json
import pendulum
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from app.models import Category, LinqLabel, LinqUrl


class Command(BaseCommand):
    help = "Seed database"

    def handle(self, *args, **options):
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
