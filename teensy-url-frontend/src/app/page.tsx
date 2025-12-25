import UrlForm from "@/components/UrlForm";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Fast & Simple URL Shortener
      </h1>
      <UrlForm />
    </div>
  );
}
