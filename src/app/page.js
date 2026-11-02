import BannerPage from "@/components/banner";
import FeaturesSection from "@/components/FeaturesSection";
import GalleryPage from "@/components/gallery";
import NewsletterPage from "@/components/newsletter";

export default function Home() {
  return (
    <main>
      <BannerPage />
      <FeaturesSection />
      {/* <GalleryPage /> */}
      <NewsletterPage />
    </main>
  );
}
