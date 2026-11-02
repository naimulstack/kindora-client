import BannerPage from "@/components/banner";
import FeaturesSection from "@/components/FeaturesSection";
import GalleryPage from "@/components/gallery";
import NewsletterPage from "@/components/newsletter";
import UpcomingEvents from "@/components/upcomingEvents";

export default function Home() {
  return (
    <main>
      <BannerPage />
      <FeaturesSection />
      <UpcomingEvents />
      {/* <GalleryPage /> */}
      <NewsletterPage />
    </main>
  );
}
