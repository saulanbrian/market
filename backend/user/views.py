from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response 
from rest_framework import status

from product.models import Product 
from product.serializers import ProductSerializer
from .models import CustomUser as User


class UserProductsListAPIView(ListAPIView): 
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Product.objects.filter(seller__id=user_id)


@api_view(['GET'])
def get_user_products(request,pk):
  products = Product.objects.filter(seller__id=pk)
  serializer = ProductSerializer(products,many=True)
  return Response(serializer.data,status=status.HTTP_200_OK)
  

