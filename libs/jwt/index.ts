import jwt, { JwtPayload } from "jsonwebtoken";
// import { TToken } from "@/entities";

type SignOption = {
  expiresIn: string;
};
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export const signJwtAccesToken = (
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) => {
  const secretKey = process.env.SECRET_KEY as string;
  const token = jwt.sign(payload, secretKey!, options);
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.SECRET_KEY as string;
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
