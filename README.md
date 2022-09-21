# react-django-auth-dockerized
A fullstack app with backend on Django and frontend on React.
I made this app for job interview.

## How to run

#### Using docker compose:
I assume that you have latest version of docker installed. Now you just have to run this command to start the app:

`docker compose up`

#### Without docker compose:
If you dont wanna use docker then follow these steps:

##### For backend:

1: `cd ./backend/`

2: `pip install -r requirements.txt`

3: `python manage.py makemigrations && python manage.py migrate && python manage.py runserver`

##### For frontend:

1: `cd ./frontend/`

2: `yarn`

3: `yarn start`


Hope you will learn something from it. Thanks!
