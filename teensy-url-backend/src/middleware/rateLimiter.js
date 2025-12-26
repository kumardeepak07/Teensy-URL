const redis = require("../config/redis");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const ip = req.headers["x-forwarded-for"] || req.ip;
    const key = `rate:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 60);
    }
    if (count > 100) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.error("Redis Error:", error);
    next(); // Don't block the user if Redis is down
  }
};
