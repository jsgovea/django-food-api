from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from customers import views

urlpatterns = [
    path('', views.restaurants_by_city, name='restaurants_by_city'),
]
