

import json
import requests

from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import User
from .models import items
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta, timezone
API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMyYzMwYzkzLTgxMjYtNDUyNC1iMjdhLWUwNjUzNjQ1MWE3NyIsIm9yZ0lkIjoiMzc0NzczIiwidXNlcklkIjoiMzg1MTM3IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiI1NGYwYzViNi05OGJjLTQ0YTctOTg2My01NTgzZThiMjllZmYiLCJpYXQiOjE3MDY1MjY3MTUsImV4cCI6NDg2MjI4NjcxNX0.Lp4z8vJMrnX-XOvoGIEgv3DLkNolz6oszMEWPNVdgQA'

# this is a check to make sure the API key was set
# you have to set the API key only in line 9 above
# you don't have to change the next line
if API_KEY == 'WEB3_API_KEY_HERE':
    print("API key is not set")
    raise SystemExit


def login1(request):
    return render(request, 'login.html', {})

def my_profile(request):
    return render(request, 'profile.html', {})

def logout_user(request):
    logout(request)
    return redirect('login')

def request_message(request):
    data = json.loads(request.body)
    print(data)


    present = datetime.now(timezone.utc)
    present_plus_one_m = present + timedelta(minutes=1)
    expirationTime = str(present_plus_one_m.isoformat())
    expirationTime = str(expirationTime[:-6]) + 'Z'

    REQUEST_URL = 'https://authapi.moralis.io/challenge/request/evm'
    request_object = {
      "domain": "127.0.0.1:8000",
      "chainId": 1,
      "address": data['address'],
      "statement": "Please confirm",
      "uri": "http://127.0.0.1:8000/",
      "expirationTime": expirationTime,
      "notBefore": "2020-01-01T00:00:00.000Z",
      "timeout": 15
    }
    x = requests.post(
        REQUEST_URL,
        json=request_object,
        headers={'X-API-KEY': API_KEY})

    return JsonResponse(json.loads(x.text))


def verify_message(request):
    data = json.loads(request.body)
    print(data)

    REQUEST_URL = 'https://authapi.moralis.io/challenge/verify/evm'
    x = requests.post(
        REQUEST_URL,
        json=data,
        headers={'X-API-KEY': API_KEY})
    print(json.loads(x.text))
    print(x.status_code)
    if x.status_code == 201:
        eth_address=json.loads(x.text).get('address')
        print("eth address", eth_address)
        try:
            user = User.objects.get(username=eth_address)
        except User.DoesNotExist:
            user = User(username=eth_address)
            user.is_staff = False
            user.is_superuser = False
            user.save()
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['auth_info'] = data
                request.session['verified_data'] = json.loads(x.text)
                return JsonResponse({'user': user.username})
            else:
                return JsonResponse({'error': 'account disabled'})
    else:
        return JsonResponse(json.loads(x.text))
    
def index(request):
    item=items.objects.all()
    return render(request,'home.html',{'item1':item})

def cart(request):
    return render(request,'cart.html',{})

def item_data(request):
    item_data=list(items.objects.values())
    return JsonResponse({'items': item_data})

def payment(request):
    return render(request,'payments.html',{})

def cartid(request,cid):
    cartId=items.objects.get(pk=cid)
    price=cartId.price
    return render(request,'payment.html',{'price':price})
