# Generated by Django 3.2.3 on 2023-04-23 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_snippet_models'),
    ]

    operations = [
        migrations.AddField(
            model_name='snippet',
            name='type',
            field=models.CharField(default='text', max_length=120),
        ),
    ]