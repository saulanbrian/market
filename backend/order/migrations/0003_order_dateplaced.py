# Generated by Django 5.0.6 on 2024-09-03 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_alter_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='datePlaced',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
