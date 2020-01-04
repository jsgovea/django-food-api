from django.contrib import admin
from django.urls import path
from foodapp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.home, name='home'),
    path('test/', views.test_api),
    path('auth/', views.auth_view),
    path('login/', views.login_view, name='login'),
    path('', views.restaurant_account,
         name='restaurant_account'),
    path('update-account/', views.update_account),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
