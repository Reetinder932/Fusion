from django.db import models

class items(models.Model):
     id=models.IntegerField(primary_key=True)
     num=models.IntegerField(default=0)
     name=models.CharField(max_length=200)
     img1=models.URLField(max_length=2000)
     price=models.IntegerField()

     def __str__(self):
          return self.name