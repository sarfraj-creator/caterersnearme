import { Button } from "./ui/Button";
import { HiExclamationCircle } from "react-icons/hi";

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-400 text-2xl">
        <HiExclamationCircle />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-800">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">{message}</p>
      </div>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
