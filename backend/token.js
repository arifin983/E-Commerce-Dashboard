const jwt = require("jsonwebtoken");
const jwkKey = "e-comm";
const verifyToken = (req, resp, next) => {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, jwkKey, (err, valid) => {
        if (err) {
          resp.status(401).send({ result: "Please provide a valid token" });
        } else {
          next();
        }
      });
    } else {
      resp.status(403).send({ result: "Please add token with header" });
    }
  };
  module.exports = verifyToken