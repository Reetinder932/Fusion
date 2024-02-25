from django.urls import path
from . import views
urlpatterns = [
    path('login', views.login1, name='login1'),
    path('request_message', views.request_message, name='request_message'),
    path('my_profile', views.my_profile, name='my_profile'),
    path('verify_message', views.verify_message, name='verify_message'),
    path('logout',views.logout_user,name='logout'),
    path('index',views.index,name='index'),
    path('cart',views.cart,name='cart'),
    path('item_data',views.item_data,name='item_data'),
    path('payment',views.payment,name='payment')
]