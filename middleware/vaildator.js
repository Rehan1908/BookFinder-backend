export const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const errors = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        errors.push(`${field} is required`);
      }
    }
    
    if (errors.length > 0) {
      res.status(400);
      return next(new Error(errors.join(', ')));
    }
    
    next();
  };
};