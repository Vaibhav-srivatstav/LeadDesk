import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";

    const leads = await prisma.lead.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                message: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      leads,
    });
  } catch (error) {
    console.error("GET /api/leads error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      budgetRange,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !budgetRange ||
      !message
    ) {
      return NextResponse.json(
        {
          message:
            "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message:
            "Please provide a valid email",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        budgetRange,
        message: message.trim(),
      },
    });

    return NextResponse.json(
      {
        message: "Lead created successfully",
        lead,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/leads error:", error);

    return NextResponse.json(
      {
        message: "Failed to create lead",
      },
      {
        status: 500,
      }
    );
  }
}