from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/token',TokenObtainPairView.as_view()),
    path('auth/token/refresh',TokenRefreshView.as_view()),
    path('products/',include('product.urls')),
    path('orders/',include('order.urls')),
    path('user_cart/',include('cart.urls'))
] + static(
  settings.MEDIA_URL,
  document_root=settings.MEDIA_ROOT
)
