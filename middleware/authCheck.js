export default async(req, res, next) => {
  const token = req.headers['authorization'];

  if (token === 'BearerMocked') {
    next();
  } else {
    res
      .status(401)
      .send({ message: 'Auth token is not supplied' });
  }
};
