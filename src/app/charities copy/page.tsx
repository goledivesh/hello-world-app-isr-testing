// export const dynamic = 'force-static';

import Link from 'next/link';

type Charity = {
  id: string;
  name: string;
  description: string;
};

async function getCharities(): Promise<Charity[]> {
  const res = await fetch(
    'https://697306fcb5f46f8b5825e92c.mockapi.io/api/charity/charities',
    {
      next: {
        tags: ['charities'], // optional tag-based revalidation
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch charities');
  }

  return res.json();
}

export default async function CharitiesPage() {
  const charities = await getCharities();

  return (
    <main style={{ padding: 24 }}>
      <h1>Charities</h1>

      <ul className='grid grid-cols-2 gap-6'>
        {charities.slice(0, 10).map((charity) => (
          <li
            key={charity.id}
            className='border p-4 rounded-md shadow-md hover:shadow-lg transition-all'>
            <Link href={`/charities/${charity.id}`}>
              <strong>{charity.name}</strong>
              <p>{charity.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
