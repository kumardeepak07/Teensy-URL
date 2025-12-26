import UrlForm from "@/components/UrlForm";
import AnalyticsCard from "@/components/AnalyticsCard";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <UrlForm />
        <AnalyticsCard />
      </div>
    </div>
  );
}
