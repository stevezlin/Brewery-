# "bottle.py" is a simple Python framework for writing web-servers. It does
# the same sorts of things as Django, except its much simpler and is only
# in one file.
from bottle import route, run, request

import json
import io

# tasks saved as list
tasks = [
  {
    'title': 'Make nice React app',
    'points': 8,
    'phase': 0,
    'id': 1,
    'text': 'This React thing seems good for UI, lets use it',
  },
  {
    'title': 'Create CRUD functionality',
    'points': 5,
    'phase': 0,
    'id': 2,
    'text': 'Work on Python bottle.py-based CRUD API',
  },
  {
    'title': "Add in Redux",
    'points': 10,
    'phase': 0,
    'id': 3,
    'content': 'Refactor to add in this trendy thing called redux',
  },
  {
    'title': "More abrasive",
    'points': 5,
    'phase': 0,
    'id': 4,
    'content': 'The color scheme is not abrasive enough',
  },
]

@route('/api/all')
def get_all_tasks():
    return {
        'tasks': tasks,
    }

@route('/api/<id>')
def get_one_task(id):
    task = [
        task for task in tasks
        if int(task['id']) == int(id)
    ][0]
    return {
        'task': task,
    }

@route('/api/create/', method='POST')
def create_task():
    info = json.load(io.TextIOWrapper(request.body))

    # Finds the next available task ID
    next_id = max((task['id'] for task in tasks), default=0) + 1
    info['id'] = next_id
    info['phase'] = 0

    # Append the newly created task
    tasks.append(info)
    return {
        'success': True,
    }

@route('/api/<id>/delete/', method='DELETE')
def delete_task(id):
    task = [
        task for task in tasks
        if int(task['id']) == int(id)
    ][0]
    tasks.remove(task)
    return {
        'success': True,
    }

@route('/api/<id>/update/', method='PUT')
def update_task(id):
    info = json.load(io.TextIOWrapper(request.body))
    task = [
        task for task in tasks
        if int(task['id']) == int(id)
    ][0]
    task.update(info)
    return {
        'success': True,
    }


@route('/api/search/<search_term>')
def index(search_term):
    search_term = search_term.lower()
    return {
        'results': [
            task for task in tasks
            if search_term in task.get('title', '').lower()
        ],
    }

run(host='localhost', port=8080)
