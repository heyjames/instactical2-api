
module.exports = function (req, res, next) {
  // 401 Unauthorized - User access a proected resource but no valid jwt. Give chance to retry and send valid jwt
  // 403 Forbidden - Sent valid jwt token, and still not allowed to access the target resource
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
}