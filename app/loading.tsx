import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default LoadingPage;
