from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from product.models import Product 
from product.serializers import ProductSerializer

class UserProductsListAPIView(ListAPIView): 
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Product.objects.filter(seller__id=user_id)
  
