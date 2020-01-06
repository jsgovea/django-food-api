from django.contrib import admin
from django.urls import path
from foodapp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.home, name='home'),

    # Views
    path('test/', views.test_api),
    path('auth/', views.auth_view),
    path('login/', views.login_view, name='login'),
    path('', views.restaurant_account,
         name='restaurant_account'),
    path('update-account/', views.update_account),
    path('restaurant_meals/', views.restaurant_meals, name='restaurant_meals'),
    path('restaurant_add_meal/', views.restaurant_add_view, name='restaurant_add_view'),

    # Functions
    path('restaurant_create_meal/', views.restaurant_create_meal, name='restaurant_create_meal'),
    path('restaurant_edit_meal/<int:meal_id>/', views.restaurant_edit_view, name='restaurant_edit_view'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
