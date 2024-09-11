from django.urls import path

from . import views

urlpatterns = [
  path('',views.ProductsOnCartListAPIView.as_view()),
  path('add',views.add_to_cart),
  path('remove',views.remove_products_to_cart)
]