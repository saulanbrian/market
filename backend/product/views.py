from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination 
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Product 
from .serializers import ProductSerializer

class ProductPagination(PageNumberPagination):
  page_size = 20
  
  
class ProductListAPIView(ListAPIView):
  serializer_class = ProductSerializer
  queryset = Product.objects.all().order_by('id')
  pagination_class = ProductPagination


class ProductRetrieveAPIView(RetrieveAPIView):
  serializer_class = ProductSerializer
  queryset = Product.objects.all().order_by('id')
  

class ProductCreateAPIView(CreateAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
  parser_classes = [MultiPartParser,FormParser]
  
  def perform_create(self,serializer):
    serializer.save(seller=self.request.user)
  