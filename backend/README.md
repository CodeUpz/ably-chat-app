# Ably Chat App Back-end with Django (DRF)

Simple to do app with implementation of a backend and a frontend to make it more dynamic.
A microservices-based backend built with the Django REST framework, connected to a frontend developed with React.

## Usage & Implementation

- API endpoints

- User Register endpoint

```markdown
POST http://localhost:8000/api/register/ HTTP/1.1
content-type: application/json

{
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "password": "",
    "password2": ""
}
```

- User Login endpoint

```markdown
POST http://localhost:8000/api/login/ HTTP/1.1
content-type: application/json

{
    "username": "",
    "password": ""
}
```

- User Logout endpoint

```markdown
POST http://localhost:8000/api/logout/ HTTP/1.1
Authorization: Token --valid token--
content-type: application/json
```

- User GetUserInfo endpoint

```markdown
POST http://localhost:8000/api/getuserinfo/ HTTP/1.1
Authorization: Token --valid token--
content-type: application/json
```

- User ProfileUpdate endpoint

```markdown
POST http://localhost:8000/api/profileupdate/ HTTP/1.1
Authorization: Token --valid token--
content-type: application/json

{
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "password": ""
}
```

### Setting Up the Backend

- Next, navigate into the directory:

```markdown
cd ably-chat-app 
```

```markdown
cd backend
```

- Now install Pipenv using pip:

```markdown
pip install pipenv
pipenv install
```

- And activate a new virtual environment:

```markdown
pipenv shell
```

- Install Django using Pipenv:

```markdown
pipenv install django djangorestframework django-cors-headers
```

- Run migrations:

```markdown
python manage.py migrate
```

- And start up the server:

```markdown
python manage.py runserver
```

Navigate to <http://localhost:8000> in your web browser.
