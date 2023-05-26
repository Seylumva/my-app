import { SignedOut, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user !== null) {
    redirect("/dashboard");
  }

  return (
    <>
      <SignedOut>
        <div>Pretty landing page here.</div>
      </SignedOut>
    </>
  );
}
