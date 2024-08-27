from django.db import models
from user.models import CustomUser as User
import uuid

def construct_path(instance,filename):
  return 'products/{0}/{1}'.format(instance.id,filename)

class Product(models.Model):
  id = models.UUIDField(default=uuid.uuid4(),primary_key=True)
  image = models.ImageField(upload_to=construct_path)
  description = models.CharField(max_length=200)
  name = models.CharField(max_length=50)
  price = models.IntegerField()
  isSold = models.BooleanField(default=False)
  seller = models.ForeignKey(User,on_delete=models.CASCADE,related_name='products')
  buyer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='products_bought')
