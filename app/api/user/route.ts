import { prisma } from "@/libs";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { search, sortBy, sortOrder, page, limit } = Object.fromEntries(new URL(request.url).searchParams);
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const orderField = sortBy || 'createdAt';
    const orderDirection = sortOrder === 'asc' ? 'asc' : 'desc';
    const searchQuery = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    } : {};
    const users = await prisma.user.findMany({
      where: searchQuery,
      orderBy: {
        [orderField]: orderDirection,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
    const totalUsers = await prisma.user.count({
      where: searchQuery,
    });

    return NextResponse.json({
      data: users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: pageNumber,
        pageSize,
      },
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};
