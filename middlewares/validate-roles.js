const isAdminUser = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ msg: 'Verifying role without token' });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: 'User Unauthorized' });
  }

  next();
};

const verifyRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(401).json({ msg: 'User Unauthorized' });
  }

  next();
};

module.exports = { isAdminUser, verifyRole };
