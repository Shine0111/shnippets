import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action!
    "use server"; // a directive that next use to recognize a server action

    // Check the user's inputs and make sure they're valid
    const title = formData.get("title") as string; // ts use FormDataEntryValue to assume that value could be a string or a reference to a file
    const code = formData.get("code") as string; // tell to consider the value as a string

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
    console.log(snippet);
    // Redirect the user back to the root route
    redirect("/");
  }
  return (
    <form className="" action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <label htmlFor="title" className="w-12">
          Title
        </label>
        <input name="title" className="border rounded p-2 w-full" id="title" />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="code" className="w-12">
          Code
        </label>
        <textarea name="code" className="border rounded p-2 w-full" id="code" />
      </div>

      <button type="submit" className="rounded p-2 bg-blue-200">
        Create
      </button>
    </form>
  );
}
