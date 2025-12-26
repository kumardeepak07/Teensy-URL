export default function ResultCard({ shortUrl }: { shortUrl: string }) {
  return (
    <div className="bg-green-100 p-4 rounded">
      <p className="font-semibold">Short URL</p>
      <a href={shortUrl} target="_blank" className="text-blue-600 underline">
        {shortUrl}
      </a>
    </div>
  );
}
