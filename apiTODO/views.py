from rest_framework import viewsets

from .permissions import IsAuthorOrReadOnly
from . models import (
    Category,
    Task
)
from . import (
    serializers,
)


class CategoryViewset(viewsets.ModelViewSet):
    """ A viewset to handle Categories """
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer


class TaskViewset(viewsets.ModelViewSet):
    """ A viewset to handle Tasks """

    serializer_class = serializers.TaskSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        user = self.request.user
        objects = Task.objects.filter(author=user.id)
        return objects
