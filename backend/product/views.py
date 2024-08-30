from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination 
from rest_framework.generics import ListAPIView

from .models import Product 
from .serializers import ProductSerializer

class ProductPagination(PageNumberPagination):
  page_size = 20
  
  
class ProductListAPIView(ListAPIView):
  serializer_class = ProductSerializer
  queryset = Product.objects.all()
  pagination_class = ProductPagination
  
