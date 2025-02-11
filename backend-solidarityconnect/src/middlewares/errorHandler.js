const errorHandler = (err, req, res, next) => {
  console.error("❌ ERREUR SERVEUR :", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Erreur interne du serveur",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

module.exports = errorHandler;
