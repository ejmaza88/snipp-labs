from rest_framework import serializers
from .models import Category, LinqLabel, LinqUrl


class LinqUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinqUrl
        fields = ('id', 'label', 'url', 'timestamp', 'last_modified')


class LinqLabelSerializer(serializers.ModelSerializer):
    urls = LinqUrlSerializer(source='linqurl_set', many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = LinqLabel
        fields = ('id', 'category', 'name', 'timestamp', 'last_modified', 'urls', 'category_name')


# not used anywhere ???
class CategorySelectedSerializer(serializers.ModelSerializer):
    labels = LinqLabelSerializer(source='linqlabel_set', many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'new_item', 'timestamp', 'labels')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'new_item', 'timestamp', 'last_modified')

