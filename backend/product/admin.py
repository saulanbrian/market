from django.contrib import admin

from .models import Product


class ProductAdmin(admin.ModelAdmin):
  exclude = ('id','buyer')

admin.site.register(Product,ProductAdmin)
