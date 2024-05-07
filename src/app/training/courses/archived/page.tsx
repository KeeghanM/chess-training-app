import { redirect } from 'next/navigation';

import { getUserServer } from '@/app/_util/get-user-server';
import { Container } from '@/app/components/_elements/container';
import { PageHeader } from '@/app/components/_layouts/page-header';
import ArchivedList from '@/app/components/training/courses/list/ArhivedList';

export const metadata = {
  title: 'Your Archived Courses - ChessTraining.app',
};

export async function ArchivedCoursesPage() {
  const { user, isPremium } = await getUserServer();

  if (!user) redirect('/auth/signin');
  return (
    <>
      <PageHeader
        title="Your Archived Courses"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="dark:bg-slate-800">
        <Container>
          <ArchivedList hasUnlimitedCourses={isPremium} />
        </Container>
      </div>
    </>
  );
}
