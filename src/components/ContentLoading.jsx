import { Loader2 } from "lucide-react";
export default function ContentLoading({text}){
    return (
        <div className="flex items-center justify-center py-12 gap-2 text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
          <span>{text}</span>
        </div>
    );
}