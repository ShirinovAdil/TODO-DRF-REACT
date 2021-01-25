from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    done = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category_tasks")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="author_tasks")

    def __str__(self):
        return self.title
