const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    if (!uid) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    const user = await User.findOne({ _id: uid, enabled: true });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    req.user = user;
    req.uid = uid;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = { validateJWT };
