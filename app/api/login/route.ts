import { prisma } from "@/libs";
import { signJwtAccesToken } from "@/libs/jwt";
import * as bcrypt from "bcrypt";
interface RequestBody {
  email: string;
  password: string;
}
export const POST = async (request: Request) => {
  const body: RequestBody = await request.json();
  const user = await prisma.user.findFirst({ where: { email: body.email } });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccesToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      accessToken
    }

    return new Response(JSON.stringify(result));
  } else {
    return new Response("Invalid email or password", { status: 401 });
  };
  
};
