from django.contrib import admin
from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/token',TokenObtainPairView.as_view()),
    path('auth/token/refresh',TokenRefreshView.as_view())
]
