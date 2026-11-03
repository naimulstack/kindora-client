import { CalendarPlus, Users, HeartHandshake, ChartNoAxesCombined } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: CalendarPlus,
      title: "Create Events",
      description: "Organize meaningful community events and invite people to participate in positive change."
    },
    {
      icon: Users,
      title: "Join Campaigns",
      description: "Discover local volunteering opportunities and become part of something bigger."
    },
    {
      icon: HeartHandshake,
      title: "Community Impact",
      description: "Work together with your community to support people and create lasting change."
    },
    {
      icon: ChartNoAxesCombined,
      title: "Track Participation",
      description: "Keep track of your joined events and stay connected with your community activities."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0F172A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#172B3A] dark:text-[#F1F5F9]">
            Everything You Need to Make a Difference
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1]">
            Simple tools to connect passionate people and meaningful community initiatives.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#172B3A] dark:text-[#F1F5F9] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#64748B] dark:text-[#CBD5E1] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;