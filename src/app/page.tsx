import { auth } from "../../auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login", RedirectType.replace);
  } else {
    redirect("/dashboard", RedirectType.replace);
  }

  return <>This function is never read</>;
}
