CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    shorter_version TEXT NOT NULL,
    last_visited TEXT
);