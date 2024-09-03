from django.shortcuts import get_object_or_404  

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from product.models import Product 
from product.serializers import ProductSerializer
from .models import Cart


class ProductsOnCartListAPIView(ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = ProductSerializer
  
  def get_queryset(self):
    user_id = self.request.user.id
    cart = get_object_or_404(Cart.objects.prefetch_related('products'), user=user_id)
    return cart.products.all()