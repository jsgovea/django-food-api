from django.shortcuts import render, redirect
import json
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from . models import User, Restaurant, Driver, Customer, Meal, Order, OrderDetail
from django.contrib.auth.decorators import login_required
# Create your views here.

def test_api(request):
    response_data = {}
    response_data['message'] = 'This is a test api'
    return JsonResponse(response_data)


def auth_view(request):
    return render(request, 'login/login.html')


def login_view(request):
    response_data = {}
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('restaurant_account')
        else:
            return render(request, 'login/login.html', {'error': 'El usuario o contraseña no coinciden'})
    return render(request, 'login/login.html')


@login_required(login_url='/login/')
def home(request):
    return render(request, 'index.html')

#Templates
@login_required(login_url='/login/')
def restaurant_account(request):
    user = request.user
    restaurant = Restaurant.objects.get(user=user)
    context = {
        'restaurant': restaurant,
    }
    return render(request, 'restaurant/account.html', context)

@login_required(login_url='/login/')
def restaurant_meals(request):
    user = request.user
    restaurant = Restaurant.objects.get(user=user)
    meals = Meal.objects.filter(restaurant = request.user.restaurant).order_by('id')

    context = {
        'restaurant': restaurant,
        'meals': meals
    }
    return render(request, 'restaurant/meals.html', context)

@login_required(login_url='/login/')
def restaurant_add_view(request):
    return render(request, 'restaurant/meals_add.html')

@login_required(login_url='/login/')
def restaurant_edit_view(request, meal_id):
    response_data = {}
    meals = Meal.objects.get(pk = meal_id)
    return render(request, 'restaurant/meals_edit.html', { 'meals': meals })

#Functions
@login_required(login_url='/login/')
def update_account(request):
    response_data = {}
    user = request.user
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    address = request.POST.get('address')
    category = request.POST.get('category')
    city = request.POST.get('city')
    email = request.POST.get('email')
    logo = request.POST.get('logo')
    try:
        restaurant = Restaurant.objects.get(user=user)
        restaurant.name = name
        restaurant.phone = phone
        restaurant.address = address
        restaurant.category = category
        restaurant.city = city
        user.email = email
        restaurant.save()
        user.save()
        response_data['status'] = 'success'
        response_data['message'] = 'Success editing account'
    except Exception as e:
        response_data['status'] = 'error'
        response_data['message'] = 'Something went wrong'
    return JsonResponse(response_data)

@login_required(login_url='/login/')
def restaurant_create_meal(request):
    response_data = {}
    user = request.user
    restaurant = Restaurant.objects.get(user = user)
    name = request.POST.get('name')
    description = request.POST.get('description')
    price = request.POST.get('price')
    image = request.POST.get('meal_image')
    category = request.POST.get('category')
    print(image)
    try:
        meal = Meal.objects.create(
            restaurant = restaurant,
            name = name,
            description = description,
            price = price,
            category = category,
            image = image
        )
        response_data['status'] = 'success'
        response_data['message'] = 'Meal created'
    except Exception as e:
        response_data['status'] = 'error'
        response_data['message'] = 'Something went wrong'
    return JsonResponse(response_data)
