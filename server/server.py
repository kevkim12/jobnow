from flask import Flask, request, jsonify, g
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = "yuumiistheworstchampiontoeverexist"

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/signup', methods=['POST'])
def signup():
    db = get_db()
    data = request.json
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                       (data['name'], data['email'], data['password']))
        db.commit()
        return jsonify({"message": "User created successfully"}), 201
    except sqlite3.IntegrityError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    db = get_db()
    data = request.json
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", 
                   (data['email'], data['password']))
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "Login successful", "user": dict(user)}), 200
    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)