# Worked on by Kevin Kim and Mohamed Dirie

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

# Signup route inserts the user's name, email, and password (retrieved from frontend) into the users table
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

# Login route checks if the user's email and password match any in the users table
@app.route('/login', methods=['POST'])
def login():
    db = get_db()
    data = request.json
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", 
                   (data['email'], data['password']))
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "Login successful", "user_id": user['id']}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# Create gig route inserts the gig's name, subject, location, description, and price into the gigs table
@app.route('/gigs', methods=['POST'])
def create_gig():
    db = get_db()
    data = request.json
    cursor = db.cursor()
    cursor.execute("INSERT INTO gigs (name, subject, location, description, price) VALUES (?, ?, ?, ?, ?)",
                   (data['name'], data['subject'], data['location'], data['description'], data['price']))
    db.commit()
    return jsonify({"message": "Gig created successfully"}), 201

# Get gig route retrieves a specific gig from the gigs table
@app.route('/gigs', methods=['GET'])
def get_gigs():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM gigs")
    gigs = cursor.fetchall()
    print(gigs)
    return jsonify([dict(gig) for gig in gigs]), 200

# Save gig route saves a gig to a user's account
@app.route('/save_gig', methods=['POST'])
def save_gig():
    db = get_db()
    data = request.json
    user_id = data['userId']
    gig_id = data['gigId']
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM saved_gigs WHERE user_id = ? AND gig_id = ?", (user_id, gig_id))
    existing = cursor.fetchone()
    
    try:
        if existing:
            cursor.execute("DELETE FROM saved_gigs WHERE user_id = ? AND gig_id = ?", (user_id, gig_id))
            db.commit()
            return jsonify({"message": "Bookmark removed"}), 200
        else:
            cursor.execute("INSERT INTO saved_gigs (user_id, gig_id) VALUES (?, ?)", (user_id, gig_id))
            db.commit()
            return jsonify({"message": "Bookmark added"}), 201
    except sqlite3.IntegrityError as e:
        db.rollback()
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        db.rollback()
        return jsonify({"error": "Server error", "details": str(e)}), 500
    
# Check gig route checks if a gig has been saved by a user
@app.route('/saved_gigs', methods=['GET'])
def check_gig():
    user_id = request.args.get('user_id')
    gig_id = request.args.get('gig_id')
    
    if not user_id or not gig_id:
        return jsonify({"error": "Missing user_id or gig_id"}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("SELECT 1 FROM saved_gigs WHERE user_id = ? AND gig_id = ?", (user_id, gig_id))
        is_saved = cursor.fetchone()
        if is_saved:
            return jsonify({"saved": True}), 200
        else:
            return jsonify({"saved": False}), 200
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500
    
# Load saved gigs route retrieves all the gigs that a user has saved
@app.route('/load_saved', methods=['GET'])
def load_saved():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400
    
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            SELECT gigs.* FROM gigs
            JOIN saved_gigs ON gigs.id = saved_gigs.gig_id
            WHERE saved_gigs.user_id = ?
        """, (user_id,))
        saved_gigs = cursor.fetchall()
        return jsonify([dict(gig) for gig in saved_gigs]), 200
    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)