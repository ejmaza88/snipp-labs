# Generated by Django 3.2.3 on 2023-04-01 19:57

import app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_linqurl_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='key',
            field=models.CharField(db_index=True, default=app.models._key_generator, editable=False, max_length=64),
        ),
    ]
