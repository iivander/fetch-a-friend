import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import validator from "validator";

function isValidUserId(userId: string): boolean {
    userId = validator.trim(userId);
    userId = validator.escape(userId);
    return validator.isEmail(userId) || validator.isUUID(userId, 4);
}

export async function GET(req: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");

        if (!userId || !isValidUserId(userId)) {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        const favorites = (await sql("SELECT dogId AS \"dogId\" FROM favorite WHERE userId = $1", [userId])) as { dogId: string }[];
        return NextResponse.json(favorites);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: "Error adding favorite", details: errorMessage }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { userId, dogId } = await req.json();

        if (!userId || !isValidUserId(userId)) {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        await sql("INSERT INTO favorite (userId, dogId) VALUES ($1, $2) ON CONFLICT DO NOTHING", [userId, dogId]);
        return NextResponse.json({ message: "Favorite added successfully" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: "Error adding favorite", details: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { userId, dogId } = await req.json();

        if (!userId || !isValidUserId(userId)) {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        await sql("DELETE FROM favorite WHERE userId = $1 AND dogId = $2", [userId, dogId]);
        return NextResponse.json({ message: "Favorite removed successfully" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: "Error adding favorite", details: errorMessage }, { status: 500 });
    }
}