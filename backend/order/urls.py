from django.urls import path  

from . import views 

urlpatterns = [
  path('my-orders',views.OrderListAPIView.as_view())
]