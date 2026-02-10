import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
  // If Upstash env vars aren't configured (common on first deploy),
  // don't block the whole API.
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return next();
  }

  // Per-client identifier (IP) so limit is per user, not global
  const identifier = req.ip || req.headers["x-forwarded-for"] || "anonymous";

  try {
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error (check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env):", error.message);
    // Don't crash the app: return 503 so frontend can show a clear message
    return res.status(503).json({
      message: "Rate limit service unavailable. Check server logs and Upstash env vars.",
    });
  }
};

export default rateLimiter;