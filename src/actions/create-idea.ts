"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Topic } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createIdeaSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: "Must be lowercase letters without spaces" }),
  description: z.string().min(10),
});

interface createIdeaFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createIdea(
  formState: createIdeaFormState,
  formData: FormData
): Promise<createIdeaFormState> {
  const result = createIdeaSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["User must be signed in"],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
