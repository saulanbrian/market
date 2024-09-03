from django.dispatch import receiver
from django.db.models.signals import post_save 

from .models import CustomUser as User
from cart.models import Cart

@receiver(post_save,sender=User)
def give_cart_to_user(sender,created,instance,**kwargs):
  if created:
    cart = Cart.objects.create(user=instance)
