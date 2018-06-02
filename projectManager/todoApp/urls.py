from .api import ListViewSet, TaskViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'list', ListViewSet, base_name='user')
router.register(r'task', TaskViewSet, base_name='task')

urlpatterns = router.urls
