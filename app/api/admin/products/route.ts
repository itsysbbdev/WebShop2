import { isAdminRequest } from "@/lib/auth";
import { createProduct } from "@/lib/repositories/products";
import { createProductSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const payload = createProductSchema.parse(await request.json());
    const result = await createProduct(payload);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to create product."
      },
      { status: 400 }
    );
  }
}
