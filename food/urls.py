from django.contrib import admin
from django.urls import path, include
from foodapp import views, apis
from django.conf.urls.static import static
from django.conf import settings
from customers import urls as customer_urls

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
    path('restaurant_add_meal/', views.restaurant_add_view,
         name='restaurant_add_view'),
    path('restaurant_orders/', views.restaurant_order, name='restaurant_order'),

    # Functions
    path('restaurant_create_meal/', views.restaurant_create_meal,
         name='restaurant_create_meal'),
    path('restaurant_edit_meal/<int:meal_id>/',
         views.restaurant_edit_view, name='restaurant_edit_view'),
    path('save_edited_meal/', views.save_edited_meal, name='save_edited_meal'),
    path('change_order_status/', views.change_order_status,
         name='change_order_status'),
    #     path('customers/', customer_urls.views.index, name='customer_index'),

    # CUSTOMERS VIEWS
    path('customers/', include('customers.urls')),

    path('api/customer/restaurant/', apis.customer_get_restaurant),
    path('api/customer/meals/<int:restaurant_id>/', apis.customer_get_meals),
    path('api/customer/order/add', apis.customer_add_order),
    path('api/customer/order/lastest', apis.customer_get_latest_order),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
