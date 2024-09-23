from django.urls import path
from . import views 

urlpatterns = [
  path('sell',views.ProductCreateAPIView.as_view()),
  path('<pk>',views.ProductRetrieveAPIView.as_view()),
  path('',views.ProductListAPIView.as_view()),
]