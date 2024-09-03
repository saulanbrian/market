from django.db import models

from user.models import CustomUser as User 
from product.models import Product

class Cart(models.Model):
  user = models.OneToOneField(User,on_delete=models.CASCADE)
  products = models.ManyToManyField(Product,related_name='carts_where_this_exists')
