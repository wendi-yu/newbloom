CREATE TABLE IF NOT EXISTS files (
    row_id SERIAL PRIMARY KEY,
    file_id VARCHAR UNIQUE NOT NULL,
    redactions JSON,
    comments JSON,
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP DEFAULT current_timestamp
);