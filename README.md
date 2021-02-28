# TODO-DRF-REACT
Todo SPA built with Django Rest Framework and ReactJS

## Installation

First, create virtual environment, activate it and install nesessary dependencies:

Guide: https://docs.python.org/3/tutorial/venv.html

Then, setup your database settings in `settings.py` (Default is local SQLite) (find the guide here: https://docs.djangoproject.com/en/3.1/ref/settings/#databases)
and migrate the changes by running the following commands in terminal in project folder: 

`python manage.py makemigrations`

`python manage.py migrate`

To run the API server:

`python manage.py runserver`

To run the React app, open a separate terminal windows, locate to the `frontend` folder and run:

`npm start`

Note: More detailed instructions on React application can be found in `frontend/README.md`
