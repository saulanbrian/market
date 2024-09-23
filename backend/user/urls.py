from django.urls import path

from . import views

urlpatterns = [
  path('products',views.UserProductsListAPIView.as_view())
]