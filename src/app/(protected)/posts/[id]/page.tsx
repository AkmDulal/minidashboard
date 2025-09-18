import { Post } from '@/types';
import ErrorBoundary from '@/components/ErrorBoundary';
import Link from 'next/link';

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  let post: Post | null = null;
  let error: string | null = null;

  try {
    const { id } = await params;   
    post = await getPost(id);
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Link href="/posts" className="text-blue-600 hover:underline">
          &larr; Back to Posts
        </Link>
        <ErrorBoundary error={error} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="space-y-6">
        <Link href="/posts" className="text-blue-600 hover:underline">
          &larr; Back to Posts
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-500">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/posts" className="text-blue-600 hover:underline">
        &larr; Back to Posts
      </Link>

      <article className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Post ID: {post.id} | User ID: {post.userId}
          </p>
        </div>
      </article>
    </div>
  );
}
