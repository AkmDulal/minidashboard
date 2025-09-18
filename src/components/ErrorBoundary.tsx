'use client';

interface ErrorBoundaryProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorBoundary({ error, onRetry }: ErrorBoundaryProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <h3 className="text-red-800 font-medium mb-2">Error</h3>
      <p className="text-red-600 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
}