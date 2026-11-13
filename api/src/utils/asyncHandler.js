/**
 * Envuelve un handler async de Express para que cualquier error
 * llegue al middleware de errores en lugar de dejar la request colgada.
 */
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

module.exports = asyncHandler;
