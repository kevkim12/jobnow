# Worked on by Kevin Kim

# This is a simple file that is used to create the database and tables for the server.

import sqlite3

def create_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # These commands are used to create the tables for the database.
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
    
    c.execute('''
        DROP TABLE IF EXISTS gigs;
    ''')
    c.execute('''
        CREATE TABLE gigs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            subject TEXT NOT NULL,
            location TEXT NOT NULL,
            description TEXT NOT NULL,
            price TEXT NOT NULL
        );
    ''')

    c.execute('''
        DROP TABLE IF EXISTS saved_gigs;
    ''')
    c.execute('''
        CREATE TABLE saved_gigs (
            user_id INTEGER,
            gig_id INTEGER,
            PRIMARY KEY (user_id, gig_id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (gig_id) REFERENCES gigs(id)
        );
    ''')

    # This command is used to commit the changes to the database. The next command closes the connection to the database.
    conn.commit()
    conn.close()

create_db()