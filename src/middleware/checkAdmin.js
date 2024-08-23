export const checkAdminRole = (requiredRole) => (req, res, next) => {
    const { role } = req.admin;
  
    if (role !== requiredRole) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  
    next();
  };