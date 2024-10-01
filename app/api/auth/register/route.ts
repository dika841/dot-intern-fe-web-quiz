import { TRegisterRequest } from "@/entities";
import { prisma } from "@/libs";
import * as bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    const body: TRegisterRequest = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);

    return new Response(
      JSON.stringify({ error: "Something went wrong during registration" }),
      { status: 500 }
    );
  }
};
