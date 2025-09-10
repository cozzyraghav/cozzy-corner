import connect from "@/dbConfig/dbConfig";
import ReviewSchema from "@/Models/reviewModel";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(requiest: NextRequest) {
  const body = await requiest.json();
  await connect();
  const data = await ReviewSchema.create(body);
  data.save();

  revalidatePath("/user-reviews");

  return new Response(
    JSON.stringify({
      message: "Review added successfully",
    }),
    {
      status: 200,
    }
  );
}
