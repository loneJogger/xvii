const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === "password") {
    next();
  } else {
    res.status(401).send("401 - Access Forbidden");
  }
};

export default isAuth;
