# Generated by Django 3.2.3 on 2022-12-24 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_added_field_for_linq_label'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linqlabel',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]