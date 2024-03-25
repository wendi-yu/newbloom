CREATE TABLE IF NOT EXISTS files (
    row_id SERIAL PRIMARY KEY,
    file_id VARCHAR UNIQUE NOT NULL,
    suggestions JSON,
    accepts JSON,
    rejects JSON,
    comments JSON,
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP DEFAULT current_timestamp
);