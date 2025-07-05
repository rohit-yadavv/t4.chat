import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.SECRET_KEY!, {
  encoding: "base64",
  pbkdf2Iterations: 10000,
  saltLength:10,
});

export const encrypt = (data: string) => cryptr.encrypt(data);
export const decrypt = (data: string) => cryptr.decrypt(data);