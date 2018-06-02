# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class List(models.Model):

    name = models.TextField();

class Task(models.Model):

    list_id = models.ForeignKey(List, models.CASCADE);
    title = models.TextField();
    description = models.TextField();
    priority = models.IntegerField();

