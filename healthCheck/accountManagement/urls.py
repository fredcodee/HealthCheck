
from django.urls import path, include
from . import views


urlpatterns = [
    path('health', views.health, name='health'),
    path('register', views.signUp, name='register'),
    path('login', views.login, name='login'),
    path('test_token', views.test_token, name="test token"),
    # path('auth/', include('social_django.urls', namespace='social')),
]