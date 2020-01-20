from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from customers import views

urlpatterns = [
    path('', views.index, name='index'),
]
