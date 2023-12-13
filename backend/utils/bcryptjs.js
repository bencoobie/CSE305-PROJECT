import bcryptjs from "bcryptjs";
let saltRounds = 10;

const passToHash = async (plaintextPassword) => {
  let hash = await bcryptjs.hash(plaintextPassword, saltRounds);
  return hash;
};

const checkPass = async (plaintextPassword, hash) => {
  let result = await bcryptjs.compare(plaintextPassword, hash);
  return result;
};
export { passToHash, checkPass };
