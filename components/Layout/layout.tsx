import RootLayout from "@/app/layout";
import { SocialMediaLinks } from "../SocialMediaLinks";
import { Toaster } from "@/components/ui/toaster";
import { ToastQuerystringMonitor } from "@/components/ToastQuerystringMonitor";
import { UnsubscribeForm } from "../Forms";

interface Props {
  children: React.ReactElement;
  bgClass: "bg-falling-stars" | "bg-music";
  showUnsubscribe?: boolean;
}

export const Layout = ({ children, bgClass, showUnsubscribe }: Props) => (
  <RootLayout>
    <div className="bg-[#eeeeee] px-8 py-8">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-center w-full ">
        <div className="md:py-8 md:mr-8 min-w-[300px] sm:min-w-[400px] md:min-w-[300px] lg:min-w-[350px]">
          <div
            className={`${bgClass} bg-loop flex items-center content-center justify-center p-8 pl-12  rounded min-h-[400px] md:min-h-[500px] w-full`}
          >
            <img
              alt="Song cover"
              className="rotate-back-and-forth user-select-none w-[150px] drop-shadow-lg"
              src="https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/FallingJack.png?t=2024-02-07T06%3A27%3A43.659Z"
            />
          </div>
        </div>
        {children}
      </div>
      <div className="w-full flex items-center content-center justify-center p-4">
        <div className="flex flex-col justify-center items-center">
          <SocialMediaLinks />
          {showUnsubscribe && <UnsubscribeForm />}
        </div>
      </div>
    </div>

    <Toaster />
    <ToastQuerystringMonitor />
  </RootLayout>
);
