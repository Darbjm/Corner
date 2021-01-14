from django.urls import path
from .views import AddView, AllView, ScrapeSnacksView

urlpatterns = [
    path('all', AllView.as_view(), name='allfood'),
    path('add', AddView.as_view(), name='addfood'),
    # path('remove', RemoveView.as_view(), name='remove'),
    # path('edit/<int:pk>/', EditView.as_view(), name='editfood'),
    path('scrapesnacks', ScrapeSnacksView.as_view(), name='snacks')
]
