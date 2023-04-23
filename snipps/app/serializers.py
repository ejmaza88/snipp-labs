from rest_framework import serializers
from .models import (
    Category,
    LinqLabel,
    LinqUrl,
    SnippetCategory,
    SnippetLabel,
)


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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        # fields = ('id', 'name', 'new_item', 'timestamp', 'last_modified')


class SnippetLabelSerializer(serializers.ModelSerializer):
    snippet_value = serializers.CharField(source="snippet.value", read_only=True)
    snippet_type = serializers.CharField(source="snippet.type", read_only=True)

    class Meta:
        model = SnippetLabel
        fields = "__all__"


class SnippetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SnippetCategory
        fields = "__all__"
