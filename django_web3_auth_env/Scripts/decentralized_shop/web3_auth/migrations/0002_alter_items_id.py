# Generated by Django 4.2.1 on 2024-02-22 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web3_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='items',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
