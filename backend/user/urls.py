from django.urls import path

from . import views

urlpatterns = [
  path('products',views.UserProductsListAPIView.as_view()),
  path('<int:pk>/products',views.get_user_products)
]