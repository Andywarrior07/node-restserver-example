const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, enabled: true });

    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    const token = await generateJWT(user._id);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Error in login' });
  }
};

module.exports = { login };
