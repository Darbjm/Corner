from django.urls import path
from .views import RegisterView, LoginView, UserDetailView, UserEditView, LikeView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('show/<int:pk>/', UserDetailView.as_view(), name='profile'),
    path('edit/<int:pk>/', UserEditView.as_view(), name='edit'),
    path('like/<int:pk>/', LikeView.as_view(), name='likefood')
]
