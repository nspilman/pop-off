import RootLayout from "@/app/layout";
import { SocialMediaLinks } from "../SocialMediaLinks";
import { Toaster } from "@/components/ui/toaster";
import { ToastQuerystringMonitor } from "@/components/ToastQuerystringMonitor";

interface Props {
  children: React.ReactElement;
  bgClass: "bg-falling-stars" | "bg-music";
}

export const Layout = ({ children, bgClass }: Props) => (
  <RootLayout>
    <div className="py-6 md:py-12 lg:py-16 xl:py-24 bg-[#f5f5f5] px-8">
      <div className="container px-4 md:px-6 flex">
        <div className="pr-8">
          <div
            className={`${bgClass} bg-loop flex items-center content-center justify-center p-8 pl-12 min-w-[400px]`}
          >
            <img
              alt="Song cover"
              className="rotate-back-and-forth"
              src="https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/FallingJack.png?t=2024-02-07T06%3A27%3A43.659Z"
            />
          </div>
        </div>
        {children}
      </div>
    </div>
    <div className="w-screen flex items-center content-center justify-center p-4">
      <SocialMediaLinks />
    </div>
    <Toaster />
    <ToastQuerystringMonitor />
  </RootLayout>
);
