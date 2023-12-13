import jwt from "jsonwebtoken";

const createTemporaryToken = async (userId, email) => {
  const payload = {
    sub: userId,
    email,
  };
  const token = await jwt.sign(payload, process.env.SECRET, {
    algorithm: "HS512",
    expiresIn: process.env.EXPIRES_IN,
  });
  return "Bearer " + token;
};
export { createTemporaryToken };
