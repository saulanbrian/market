from django.db import models
import uuid

from product.models import Product
from user.models import CustomUser as User

class Order(models.Model):
  
  choices = [
    ('to_receive','to_receive'),
    ('received','received'),
    ('cancelled','cancelled')
  ]
  
  id = models.UUIDField(default=uuid.uuid4,primary_key=True)
  product = models.ForeignKey(
      Product,
      on_delete=models.CASCADE,
      related_name='orders'
    )
    
  status = models.CharField(
      max_length=20,
      choices=choices,
      default='to_receive'
    )
    
  buyer = models.ForeignKey(
      User,
      on_delete=models.SET_NULL,
      related_name='orders',
      null=True
    )
    
  date_placed = models.DateTimeField(auto_now_add=True)
  