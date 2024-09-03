from django.urls import path

from . import views

urlpatterns = [
  path('',views.ProductsOnCartListAPIView.as_view())
]