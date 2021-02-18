from django.urls import path
from .views import AddView, AllView, ScrapeSnacksView, EditView, RemoveView, LikeDislikeView, MapView

urlpatterns = [
    path('all', AllView.as_view(), name='allfood'),
    path('map', MapView.as_view(), name='mapfood'),
    path('add', AddView.as_view(), name='addfood'),
    path('remove/<int:pk>/', RemoveView.as_view(), name='removefood'),
    path('edit/<int:pk>/', EditView.as_view(), name='editfood'),
    path('likedislike/<int:pk>/', LikeDislikeView.as_view(), name='likefood'),
    path('scrapesnacks', ScrapeSnacksView.as_view(), name='snacks')
]
