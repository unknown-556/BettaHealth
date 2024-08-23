export default function (allowedRoles) {
    return function (req, res, next) {
      console.log('req.user:', req.user); 
  
      if (!req.user) {
        return res.status(401).json({ msg: 'User not authenticated' });
      }
  
      if (!req.user.role) {
        return res.status(403).json({ msg: 'User role not defined' });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
  
      next();
    };
  }
  