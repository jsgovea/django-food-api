from django.http import JsonResponse
import json
from foodapp.models import Restaurant, Meal
from foodapp.serializers import RestaurantSerializer, MealSerializer


def customer_get_restaurant(request):
    restaurants = RestaurantSerializer(
        Restaurant.objects.all().order_by('-id'),
        many=True,
        context={'request': request}
    ).data
    return JsonResponse({'restaurants': restaurants})


def customer_get_meals(request, restaurant_id):
    meals = MealSerializer(
        Meal.objects.filter(restaurant=restaurant_id).order_by('category'),
        many=True,
        context={'request': request}
    ).data
    return JsonResponse({'meals': meals})


def customer_add_order(request):
    if request.method == 'POST':
        # access_token = AccessToken.objects.get(
        #     token=request.POST.get('access_token'), expires_get=timezone.now())
        customer = request.user.customer
        if Order.objects.filter(customer=customer).exclude(status=Order.Entregado):
            return JsonResponse({'status': 'error', 'message': 'Your last order must be completed'})
        if not request.POST['address']:
            return JsonResponse({'status': 'error', 'message': 'Address is required'})
        order_details = json.load(request.POST['order_details'])
    return JsonResponse({})


def customer_get_latest_order(request):
    return JsonResponse({})
