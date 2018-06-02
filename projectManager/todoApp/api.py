from rest_framework import viewsets
from .models import List, Task
from .serializer import ListSerializer, TaskSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404

class ListViewSet(viewsets.ModelViewSet):
    
    queryset = List.objects.all()
    serializer_class = ListSerializer
    
    @action(detail=True)
    def task(self, request, pk = None):
        try:
            tasks = Task.objects.filter(list_id=pk);
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)
        except Task.DoesNotExist:
            raise Http404


class TaskViewSet(viewsets.ModelViewSet):
    
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    

