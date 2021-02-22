const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

    return res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Error in login' });
  }
};

const googleSignin = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        img,
        password: ':P',
        google: true,
      };

      user = new User(data);

      return await user.save();
    }

    if (!user.enabled) {
      return res.status(401).json({ msg: 'User blocked' });
    }

    const token = await generateJWT(user._id);

    return res.json(true);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'Token not valid' });
  }

  res.json({ id_token });
};

module.exports = { login, googleSignin };
