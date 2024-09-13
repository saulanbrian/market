from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes 
from rest_framework import status
from rest_framework.response import Response

from .models import Order
from product.models import Product
from .serializers import OrderSerializer
from product.serializers import ProductSerializer



class OrderListAPIView(ListAPIView):
  serializer_class = OrderSerializer 
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Order.objects.select_related('product').filter(buyer__id=user_id)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def place_order(request):
  user = request.user
  product_ids = request.data.get('products',None)
  
  if product_ids:
    orders = []
    for product_id in product_ids:
      product = get_object_or_404(Product,pk=product_id)
      order = Order.objects.create(buyer=user,product=product)
      orders.append(order)
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_201_CREATED)
    
  return Response(status=status.HTTP_400_BAD_REQUEST)