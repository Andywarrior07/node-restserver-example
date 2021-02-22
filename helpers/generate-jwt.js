const jwt = require('jsonwebtoken');

const generateJWT = uid => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return reject('JWT could not be generated');
        }

        return resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
