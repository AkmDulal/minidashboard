import { Post } from '@/types';
import Card from '@/components/Card';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

async function getPosts(): Promise<Post[]> {
  const shouldFail = Math.random() > 0.7; 
  const endpoint = shouldFail ? '/invalid-posts' : 'https://jsonplaceholder.typicode.com/posts';
  
  const res = await fetch(endpoint, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export default async function PostsPage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await getPosts();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
        <ErrorBoundary error={error} />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Card
            key={post.id}
            title={post.title}
            content={post.body}
            href={`/posts/${post.id}`}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}