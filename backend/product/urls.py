from django.urls import path
from . import views 

urlpatterns = [
  path('',views.ProductListAPIView.as_view()),
  path('<pk>',views.ProductRetrieveAPIView.as_view())
]