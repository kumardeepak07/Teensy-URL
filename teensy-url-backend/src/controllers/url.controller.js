const pool = require("../config/db");
const redis = require("../config/redis");
const generateShortCode = require("../utils/shortCode");

exports.createShortUrl = async (req, res) => {
  const { originalUrl, customAlias, expiresInHours } = req.body;

  const shortCode = customAlias || generateShortCode();
  const expiresAt = expiresInHours
    ? new Date(Date.now() + expiresInHours * 3600 * 1000)
    : null;

  try {
    const result = await pool.query(
      `INSERT INTO short_urls (original_url, short_code, expires_at)
       VALUES ($1, $2, $3)
       RETURNING short_code`,
      [originalUrl, shortCode, expiresAt]
    );

    res.json({
      shortUrl: `${process.env.BASE_URL}/${result.rows[0].short_code}`
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Alias already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.redirect = async (req, res) => {
  const { shortCode } = req.params;

  const cachedUrl = await redis.get(`url:${shortCode}`);
  if (cachedUrl) {
    redis.incr(`click:${shortCode}`);
    return res.redirect(cachedUrl);
  }

  const result = await pool.query(
    `SELECT original_url, expires_at FROM short_urls WHERE short_code=$1`,
    [shortCode]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "URL not found" });
  }

  const { original_url, expires_at } = result.rows[0];

  if (expires_at && new Date() > expires_at) {
    return res.status(410).json({ message: "URL expired" });
  }

  await redis.set(`url:${shortCode}`, original_url, "EX", 3600);
  redis.incr(`click:${shortCode}`);

  pool.query(
    `UPDATE short_urls
     SET click_count = click_count + 1, last_accessed = NOW()
     WHERE short_code=$1`,
    [shortCode]
  );

  res.redirect(original_url);
};

exports.analytics = async (req, res) => {
  const { shortCode } = req.params;

  const result = await pool.query(
    `SELECT click_count, last_accessed FROM short_urls WHERE short_code=$1`,
    [shortCode]
  );

  if (!result.rows.length) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(result.rows[0]);
};
