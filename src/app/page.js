import BannerPage from "@/components/banner";
import FeaturesSection from "@/components/FeaturesSection";
import GalleryPage from "@/components/gallery";
import NewsletterPage from "@/components/newsletter";
import PastEvents from "@/components/pastevents";
import UpcomingEvents from "@/components/upcomingEvents";

export default function Home() {
  return (
    <main>
      <BannerPage />
      <FeaturesSection />
      <UpcomingEvents />
      <PastEvents/>
      {/* <GalleryPage /> */}
      <NewsletterPage />
    </main>
  );
}
