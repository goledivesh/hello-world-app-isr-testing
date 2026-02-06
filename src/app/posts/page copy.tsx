// app/posts/page.tsx
import Link from 'next/link';
import React from 'react';

// Step 1: Define your Data Type
interface Post {
  id: number;
  name: string;
  description: string;
}

// Step 2: Create a fetch function (runs on the server)
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://697306fcb5f46f8b5825e92c.mockapi.io/api/charity/charities',
    {
      // This is the key for ISR:
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  console.log('Rendering PostsPage with ISR...', posts);

  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Blog Posts (ISR)</h1>
      <p className='mb-4 text-gray-500'>
        Last updated: {new Date().toLocaleTimeString()}
      </p>
      <ul className='grid grid-cols-2 gap-6'>
        {posts.slice(0, 5).map((post) => (
          <li
            key={post.id}
            className='border p-4 rounded-md shadow-md hover:shadow-lg transition-all'>
            <Link href={`/posts/${post.id}`}>
              <h2 className='font-serif font-semibold text-xl'>{post.name}</h2>
              <p>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
