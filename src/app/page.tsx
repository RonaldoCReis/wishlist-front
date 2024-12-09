import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const clerkUser = await currentUser();

  if (clerkUser) {
    redirect(`/u/${clerkUser.username}`);
  }

  return <Link href="/auth/sign-in">Sign in</Link>;
}
