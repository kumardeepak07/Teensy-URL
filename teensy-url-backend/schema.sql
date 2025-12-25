CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE short_urls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_url TEXT NOT NULL,
    short_code VARCHAR(20) UNIQUE NOT NULL,
    expires_at TIMESTAMP NULL,
    click_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    last_accessed TIMESTAMP NULL
);

CREATE INDEX idx_short_code ON short_urls(short_code);
