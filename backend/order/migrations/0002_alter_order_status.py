# Generated by Django 5.0.6 on 2024-09-02 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('to_receive', 'to_receive'), ('received', 'received'), ('canceled', 'canceled')], default='to_receive', max_length=20),
        ),
    ]
