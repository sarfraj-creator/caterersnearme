import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { HiSearch, HiStar } from "react-icons/hi";
import { IoPricetagOutline } from "react-icons/io5";

const FEATURES = [
  {
    icon: <HiSearch className="text-2xl text-brand-500" />,
    title: "Smart Search",
    desc: "Find caterers by name or cuisine instantly with debounced live search.",
  },
  {
    icon: <IoPricetagOutline className="text-2xl text-brand-500" />,
    title: "Price Filters",
    desc: "Set your budget range and only see caterers that fit your pocket.",
  },
  {
    icon: <HiStar className="text-2xl text-brand-500" />,
    title: "Ratings & Reviews",
    desc: "Compare top-rated caterers to make the best choice for your event.",
  },
  {
    icon: <MdOutlineRestaurantMenu className="text-2xl text-brand-500" />,
    title: "Cuisine Variety",
    desc: "Explore caterers serving everything from North Indian to Continental.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-100 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center flex flex-col items-center gap-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium border border-brand-100">
            <MdOutlineRestaurantMenu />
            India&apos;s Catering Directory
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 leading-tight tracking-tight">
            Find the{" "}
            <span className="text-brand-500 italic">perfect caterer</span>
            <br />
            for every occasion
          </h1>

          <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
            Browse hundreds of top-rated caterers across India. Filter by cuisine, price, and
            location to discover your ideal catering partner.
          </p>

          <Link href="/caterers">
            <Button size="lg" className="mt-2 shadow-lg shadow-brand-200">
              <HiSearch />
              Explore Caterers
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 text-center mb-12">
          Everything you need to decide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{feat.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-500 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center flex flex-col items-center gap-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold leading-snug">
            Ready to find your perfect match?
          </h2>
          <p className="text-brand-100 max-w-md">
            Start searching and comparing caterers for your upcoming event — weddings, corporate
            parties, birthdays and more.
          </p>
          <Link href="/caterers">
            <Button variant="secondary" size="lg">
              Browse All Caterers →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
