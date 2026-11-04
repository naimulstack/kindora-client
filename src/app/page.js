import { Suspense } from "react";
import BannerPage from "@/components/banner";
import FeaturesSection from "@/components/FeaturesSection";
import NewsletterPage from "@/components/newsletter";
import PastEvents from "@/components/pastevents";
import TopVolunteer from "@/components/topVolunteer";
import UpcomingEvents from "@/components/upcomingEvents";

export default function Home() {
  return (
    <main>
      <BannerPage />
      <FeaturesSection />
      <Suspense fallback={<p>Loading volunteers...</p>}>
        <UpcomingEvents />
      </Suspense>
      <PastEvents />

      <Suspense fallback={<p>Loading volunteers...</p>}>
        <TopVolunteer />
      </Suspense>

      <NewsletterPage />
    </main>
  );
}
