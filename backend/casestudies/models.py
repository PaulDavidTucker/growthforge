from django.db import models

class CaseStudy(models.Model):
    title = models.CharField(max_length=200)
    client_name = models.CharField(max_length=100)
    problem = models.TextField()
    solution = models.TextField()
    results = models.TextField(help_text="e.g., '40% increase in sales'")
    image = models.ImageField(upload_to='casestudies/')
    published_date = models.DateField(auto_now_add=True)

    def __str__(self): # type: ignore
        return self.title
