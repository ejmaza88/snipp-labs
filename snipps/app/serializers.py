from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'new_item', 'timestamp', 'last_modified')


# class StuffSerializer(serializers.ModelSerializer):
#     category_name = serializers.CharField(source='category.name')
#
#     class Meta:
#         model = Linq
#         fields = ('id', 'category', 'category_name', 'label', 'url', 'timestamp', 'last_modified')
