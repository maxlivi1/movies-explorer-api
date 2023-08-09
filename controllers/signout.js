const signout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: 'Пользователь разлогинен.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { signout };
