from rest_framework import serializers
from . import (
    models,
)


class CategorySerializer(serializers.ModelSerializer):
    """ Serializer to handle Category model """

    class Meta:
        model = models.Category
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    """ Serializer to handle Task model """

    category = serializers.SlugRelatedField(read_only=False, slug_field='name', queryset=models.Category.objects.all())
    author = serializers.ReadOnlyField(source="author.username")
    
    class Meta:
        model = models.Task
        fields = '__all__'
