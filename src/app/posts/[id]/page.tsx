// app/posts/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Post {
  id: number;
  name: string;
  description: string;
}

// Global revalidate for this route segment (Alternative to fetch option)
export const revalidate = 60; // 1 minute

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    'https://697306fcb5f46f8b5825e92c.mockapi.io/api/charity/charities',
  ).then((res) => res.json());

  // Only pre-render the first 10 posts at build time
  return posts.slice(0, 10).map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `https://697306fcb5f46f8b5825e92c.mockapi.io/api/charity/charities/${params.id}`,
  );

  if (!res.ok) return notFound();

  const post: Post = await res.json();

  return (
    <article className='p-8'>
      <Link
        href='/posts'
        className='text-blue-500 text-xl underline mb-4 inline-block'>
        &larr; Back to Posts
      </Link>
      <h1 className='text-3xl font-bold'>{post.name}</h1>
      <p className='mt-4'>{post.description}</p>
    </article>
  );
}
