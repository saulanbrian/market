from .models import Product
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):

  seller_name = serializers.SerializerMethodField()
  
  class Meta:
    model = Product 
    fields = (
      'id',
      'name',
      'description',
      'image',
      'price',
      'isAvailable',
      'seller',
      'seller_name'
      )
    extra_kwargs = {
      'isAvailable':{'required':False},
      'seller':{'read_only':True,'required':False},
    }
  
  def get_seller_name(request,obj):
    return obj.seller.username