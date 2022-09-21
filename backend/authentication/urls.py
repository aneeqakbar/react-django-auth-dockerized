from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = "authentication"

urlpatterns = [
    path('me/', views.GetCurrentUserDataView.as_view(), name='GetCurrentUserDataView'),
    path('login/', views.LoginView.as_view(), name='LoginView'),
    path('register/', views.RegisterView.as_view(), name='RegisterView'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
