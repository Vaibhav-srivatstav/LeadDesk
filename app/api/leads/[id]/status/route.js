import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = [
  "NEW",
  "CONTACTED",
  "CLOSED",
];

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { status } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          message: "Invalid status",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      message: "Status updated successfully",
      lead,
    });
  } catch (error) {
    console.error(
      "PATCH /api/leads/[id]/status error:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to update lead status",
      },
      {
        status: 500,
      }
    );
  }
}