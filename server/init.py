import sqlite3


def create_db():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("DROP TABLE IF EXISTS users;")
    c.execute("DROP TABLE IF EXISTS gigs;")
    c.execute("DROP TABLE IF EXISTS saved_gigs;")

    c.execute(
        """
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    """
    )

    c.execute(
        """
        CREATE TABLE gigs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            subject TEXT NOT NULL,
            location TEXT NOT NULL,
            description TEXT NOT NULL,
            price TEXT NOT NULL
        );
    """
    )

    c.execute(
        """
        CREATE TABLE saved_gigs (
            user_id INTEGER,
            gig_id INTEGER,
            PRIMARY KEY (user_id, gig_id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (gig_id) REFERENCES gigs(id)
        );
    """
    )

    c.execute("CREATE INDEX idx_users_email ON users(email);")
    c.execute("CREATE INDEX idx_gigs_name ON gigs(name);")
    c.execute("CREATE INDEX idx_gigs_location ON gigs(location);")
    c.execute("CREATE INDEX idx_saved_gigs_user ON saved_gigs(user_id);")
    c.execute("CREATE INDEX idx_saved_gigs_gig ON saved_gigs(gig_id);")

    conn.commit()
    conn.close()


create_db()
