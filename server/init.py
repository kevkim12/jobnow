import sqlite3

def create_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    c.execute('''
        DROP TABLE IF EXISTS users;
    ''')
    
    c.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    ''')
    conn.commit()
    conn.close()

create_db()