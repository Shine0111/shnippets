"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSnippet(
  formState: { message: string }, // Always first argument
  formData: FormData
) {
  //   Check the user's inputs and make sure they're valid
  const title = formData.get("title"); // ts use FormDataEntryValue to assume that value could be a string or a reference to a file
  const code = formData.get("code"); // tell to consider the value as a string

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }
  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be longer",
    };
  }
  // Create a new record in the database
  const snippet = await db.snippet.create({
    data: {
      title: title,
      code: code,
    },
  });
  // Redirect the user back to the root route
  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}
