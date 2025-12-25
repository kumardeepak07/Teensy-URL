const redis = require("../config/redis");

module.exports = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate:${ip}`;

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 60);
  }

  if (count > 100) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next();
};
