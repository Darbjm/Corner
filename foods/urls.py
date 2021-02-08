from django.urls import path
from .views import AddView, AllView, ScrapeSnacksView, EditView, RemoveView

urlpatterns = [
    path('all', AllView.as_view(), name='allfood'),
    path('add', AddView.as_view(), name='addfood'),
    path('remove/<int:pk>/', RemoveView.as_view(), name='removefood'),
    path('edit/<int:pk>/', EditView.as_view(), name='editfood'),
    path('scrapesnacks', ScrapeSnacksView.as_view(), name='snacks')
]
