import json
from typing import Union

from django.core.cache import caches

from app.models import LinqLabel
from app.serializers import LinqLabelSerializer


class LinqsCache:
    timeout = 60 * 60 * 2

    def __init__(self, category_id: Union[str, int] = None):
        self.category_id = category_id
        self.category_cache_data_key = f"{category_id}_cache_data"
        self.update_cache_key = f"{category_id}_update_cache"

        self.cache = caches["linqs"]

    @property
    def _linq_objects_qs(self):
        objs = LinqLabel.objects.filter(
            category_id=self.category_id
        ).select_related('category').prefetch_related('linqurl_set')

        return objs

    def _cache_linq_objects(self) -> None:
        objs = json.loads(json.dumps(LinqLabelSerializer(instance=self._linq_objects_qs, many=True).data))

        self.cache.set(self.category_cache_data_key, objs)

    def _objects_need_caching(self) -> bool:
        needs_cache = self.cache.get(self.update_cache_key)

        if needs_cache is not None:
            return needs_cache

        else:
            # maybe the key hasn't been set yet?
            self.cache.set(self.update_cache_key, True, self.timeout)
            return self.cache.get(self.update_cache_key)

    def _cache_objects_if_needed(self) -> None:
        if self._objects_need_caching():
            self._cache_linq_objects()

            # this will prevent from querying the db
            self.cache.set(self.update_cache_key, False, self.timeout)

    def set_needs_caching(self) -> None:
        self.cache.set(self.update_cache_key, True, self.timeout)

    def serialized_objects(self) -> dict:
        self._cache_objects_if_needed()

        return self.cache.get(self.category_cache_data_key)
