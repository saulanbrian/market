from .models import Product
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Product 
    fields = (
      'id',
      'name',
      'description',
      'image',
      'price',
      'isAvailable',
      'seller'
      )
    extra_kwargs = {
      'isAvailable':{'required':False},
      'seller':{'read_only':True,'required':False},
    }
    