import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return <>{children}</>;
}