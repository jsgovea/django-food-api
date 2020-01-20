from django.shortcuts import render, redirect
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


def index(request):
    response_data = {}
    response_data['status'] = 'success'
    return JsonResponse(response_data)
