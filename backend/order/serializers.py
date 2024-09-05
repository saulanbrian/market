from rest_framework import serializers  

from .models import Order

class OrderSerializer(serializers.ModelSerializer):
  
  product_id = serializers.SerializerMethodField()
  product_name = serializers.SerializerMethodField()
  product_image = serializers.SerializerMethodField()
  product_description = serializers.SerializerMethodField()
  
  class Meta:
    model = Order  
    fields = (
        'id',
        'status',
        'product_id',
        'product_name',
        'product_image',
        'date_placed',
        'product_description'
      )
      
  def get_product_id(self,obj):
    return obj.product.id 
  
  def get_product_name(self,obj):
    return obj.product.name 
    
  def get_product_image(self,obj):
    return obj.product.image.url
    
  def get_product_description(self,obj):
    return obj.product.description