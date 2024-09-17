from django.urls import path  

from . import views 

urlpatterns = [
  path('my-orders',views.OrderListAPIView.as_view()),
  path('place',views.place_order),
  path('cancel',views.cancel_order),
  path('receive',views.mark_order_as_recieved)
]