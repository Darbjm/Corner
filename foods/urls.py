from django.urls import path
from .views import RemoveView, AddView, EditView, AllView, ScrapeSnacksView

urlpatterns = [
    path('all', AllView.as_view(), name='all'),
    path('add', AddView.as_view(), name='add'),
    path('remove', RemoveView.as_view(), name='remove'),
    path('edit/<int:pk>/', EditView.as_view(), name='edit'),
    path('scrapesnacks', ScrapeSnacksView.as_view(), name='snacks')
]
