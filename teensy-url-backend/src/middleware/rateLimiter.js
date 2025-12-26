const redis = require("../config/redis");

module.exports = async (req, res, next) => {
  // CRITICAL: Always allow OPTIONS requests to pass through the rate limiter
  // Browsers send OPTIONS before POST. If you rate-limit OPTIONS, the POST fails with a CORS error.
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const ip = req.headers["x-real-ip"] || req.ip; // Vercel specific IP check
    const key = `rate:${ip}`;

    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 60);
    }

    if (count > 100) {
      // The global CORS middleware has already set the headers, 
      // so this JSON response will be accepted by the browser.
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    next(); // Don't block users if Redis is down
  }
};