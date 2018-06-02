from rest_framework import serializers
from .models import List, Task 

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ('name', 'id')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'description', 'priority', 'title', 'list_id')

