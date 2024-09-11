from django.shortcuts import get_object_or_404  

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response

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
    
    
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def add_to_cart(request):
  if request.method == 'POST':
    cart = Cart.objects.get(user__id=request.user.id)
    product_id = request.data.get('product',None)
    
    if product_id:
      product = get_object_or_404(Product,pk=product_id)
      cart.products.add(product)
      serializer = ProductSerializer(product)
      return Response(
          serializer.data,
          status=status.HTTP_200_OK
        )
    
    return Response(status=status.HTTP_400_BAD_REQUEST)
  return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
  

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def remove_products_to_cart(request):
  product_ids = request.data.get('products',None)
  
  if product_ids:
    cart = Cart.objects.prefetch_related('products').get(user__id=request.user.id)
    removed_products = []
    for product_id in product_ids:
      try:
        product = cart.products.get(pk=product_id)
        removed_products.append(product)
        cart.products.remove(product)
      except Product.DoesNotExist: 
        continue
    serializer = ProductSerializer(removed_products,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)
  
  return Response(status=status.HTTP_400_BAD_REQUEST)