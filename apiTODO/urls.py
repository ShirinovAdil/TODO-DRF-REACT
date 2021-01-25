from rest_framework import routers
from . import views
from django.urls import path, include


router = routers.DefaultRouter()
router.register('categories', views.CategoryViewset)
router.register('tasks', views.TaskViewset, basename="tasks")

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns += router.urls
