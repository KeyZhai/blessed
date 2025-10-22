import type React from "react";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Link from "next/link";

interface SignOutButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

function SignOutButton(props: SignOutButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await auth.api.signOut({
          headers: await headers(),
        });
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function Header(): Promise<React.JSX.Element> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session.user.name || session.user.email}
          <SignOutButton />
        </span>
      ) : (
        <Link href="/auth/signin">
          <button>Sign In</button>
        </Link>
      )}
    </header>
  );
}
