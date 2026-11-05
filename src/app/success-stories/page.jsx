
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarDays, ArrowUpRight } from 'lucide-react';

const SuccessStoriesPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/success-stories`);

    const stories = await res.json();

    const featuredStory = stories.find(story => story.featured);
    const otherStories = stories.filter(story => !story.featured);

    return (
        <section className="bg-[#F7FAF7] py-20">
            <div className="max-w-7xl mx-auto px-5">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="text-[#16A34A] font-semibold">
                        Stories of Hope
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                        Every Story Deserves
                        <span className="text-[#16A34A]"> A Happy Ending</span>
                    </h1>

                    <p className="text-gray-500 mt-5 leading-7">
                        Real people, real stories, and real transformations.
                        Discover how your kindness is changing lives.
                    </p>
                </div>

                {/* Featured Story */}
                {featuredStory && (
                    <div className="grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-sm mb-20">
                        <div className="relative min-h-[350px]">
                            <Image
                                src={featuredStory.image}
                                alt={featuredStory.name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-emerald-600 font-semibold">
                                {featuredStory.category}
                            </span>

                            <h2 className="text-3xl font-bold text-gray-900 mt-4">
                                {featuredStory.name}
                            </h2>

                            <p className="text-gray-500 leading-7 mt-5">
                                {featuredStory.description}
                            </p>

                            <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <MapPin size={17} />
                                    {featuredStory.location}
                                </span>

                                <span className="flex items-center gap-2">
                                    <CalendarDays size={17} />
                                    {featuredStory.date}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* All Stories */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        More Inspiring Stories
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Small acts of kindness create big changes.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherStories.map(story => (
                        <div
                            key={story._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                        >
                            <div className="relative h-60">
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <span className="text-[#16A34A] text-sm font-semibold">
                                    {story.category}
                                </span>

                                <h3 className="text-xl font-bold text-gray-900 mt-3">
                                    {story.name}
                                </h3>

                                <p className="text-gray-500 text-sm leading-7 mt-3 line-clamp-3">
                                    {story.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {story.location}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <CalendarDays size={14} />
                                        {story.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Donation CTA */}
                <div className="mt-20 bg-[#16A34A] rounded-3xl p-10 md:p-14 text-center text-white">
                    <h2 className="text-3xl font-bold">
                        Be Part of Someone's Story
                    </h2>

                    <p className="text-emerald-50 mt-4">
                        Your kindness can create another beautiful success story.
                    </p>

                    <Link
                        href="/donate"
                        className="inline-flex items-center gap-2 mt-7 bg-white text-[#16A34A] px-7 py-3 rounded-full font-semibold hover:bg-emerald-50 transition"
                    >
                        Make a Donation
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
export default SuccessStoriesPage;