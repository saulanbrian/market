from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Order
from .serializers import OrderSerializer

class OrderListAPIView(ListAPIView):
  serializer_class = OrderSerializer 
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user_id = self.request.user.id
    return Order.objects.select_related('product').filter(buyer__id=user_id)

