import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
      <p className="text-7xl font-display font-bold text-brand-300">404</p>
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Page not found</h1>
        <p className="text-gray-500 text-sm mt-1">The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
