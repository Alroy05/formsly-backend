import jwt from 'jsonwebtoken';

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'No authentication token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.user.username === process.env.ADMIN_USERNAME && decoded.user.role === 'admin') {
      req.user = decoded.user;
      next();
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export { authenticateAdmin };