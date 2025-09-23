import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

async function SignOutButton() {
  "use server";
  const authInstance = await auth;
  await authInstance.api.signOut({
    headers: await headers(),
  });
}

export async function Header() {
  const authInstance = await auth;
  const session = await authInstance.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b">
      <div className="container flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-lg">
          AppName
        </Link>
        <nav>
          {session?.user ? (
            <form action={SignOutButton}>
              <span className="mr-4">
                Welcome, {session.user.name || session.user.email}
              </span>
              <Button type="submit">Logout</Button>
            </form>
          ) : (
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
