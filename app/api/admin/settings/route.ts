import { isAdminRequest } from "@/lib/auth";
import { updateStoreSettings } from "@/lib/repositories/settings";
import { updateStoreSettingsSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const payload = updateStoreSettingsSchema.parse(await request.json());
    const result = await updateStoreSettings(payload);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to update settings."
      },
      { status: 400 }
    );
  }
}
