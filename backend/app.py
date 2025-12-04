from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r') as f:
        return json.load(f)

def save_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/problems', methods=['GET'])
def get_problems():
    problems = load_json('problems.json')
    difficulty = request.args.get('difficulty')
    if difficulty:
        problems = [p for p in problems if p['difficulty'].lower() == difficulty.lower()]
    return jsonify(problems)

@app.route('/api/problems/<int:problem_id>', methods=['GET'])
def get_problem(problem_id):
    problems = load_json('problems.json')
    problem = next((p for p in problems if p['id'] == problem_id), None)
    if problem:
        return jsonify(problem)
    return jsonify({'error': 'Problem not found'}), 404

@app.route('/api/problems/<int:problem_id>/status', methods=['PATCH'])
def update_problem_status(problem_id):
    problems = load_json('problems.json')
    data = request.get_json()
    for problem in problems:
        if problem['id'] == problem_id:
            problem['status'] = data.get('status', problem['status'])
            save_json('problems.json', problems)
            return jsonify(problem)
    return jsonify({'error': 'Problem not found'}), 404

@app.route('/api/users', methods=['GET'])
def get_users():
    users = load_json('users.json')
    return jsonify(users)

@app.route('/api/users/current', methods=['GET'])
def get_current_user():
    users = load_json('users.json')
    current_user = next((u for u in users if u.get('isCurrentUser')), None)
    if current_user:
        return jsonify(current_user)
    return jsonify({'error': 'Current user not found'}), 404

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    users = load_json('users.json')
    sorted_users = sorted(users, key=lambda x: x['xp'], reverse=True)
    for i, user in enumerate(sorted_users):
        user['rank'] = i + 1
    return jsonify(sorted_users)

@app.route('/api/progress', methods=['GET'])
def get_progress():
    progress = load_json('progress.json')
    return jsonify(progress)

@app.route('/api/topics', methods=['GET'])
def get_topics():
    topics = load_json('topics.json')
    return jsonify(topics)

@app.route('/api/daily-challenge', methods=['GET'])
def get_daily_challenge():
    progress = load_json('progress.json')
    return jsonify(progress.get('dailyChallenge', {}))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False, use_reloader=False)
