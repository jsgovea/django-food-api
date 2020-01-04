from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dc2l4ivfffeedj',
        'USER': 'gxwgjvruwjujng',
        'PASSWORD': 'b51060a367cba1680525bbd585b119b336e7e5c2796f9f1babb1838f6b0b1a6e',
        'HOST': 'ec2-107-22-195-114.compute-1.amazonaws.com',
        'PORT': 5432
    }
}
