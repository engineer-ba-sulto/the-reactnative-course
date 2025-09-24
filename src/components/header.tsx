import { signOutAction } from "@/actions/certification";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b h-18">
      <div className="container flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-lg">
          AppName
        </Link>
        <nav>
          {session?.user ? (
            <form action={signOutAction}>
              <span className="mr-4">
                Welcome, {session.user.name || session.user.email}
              </span>
              <Button type="submit">Logout</Button>
            </form>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/signin">Signin</Link>
              </Button>
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
