import CustomReactPlayer from "@/components/CustomReactPlayer/CustomReactPlayer";
import VimeoPlayer from "../../components/VimeoPlayer/VimeoPlayer";
import VidStackPlayer from "../../components/VidStackPlayer/VidStackPlayer";

export default function Players() {
  // Replace with your Vimeo video URL
  const vimeoUrl = "https://www.youtube.com/watch?v=LXb3EKWsInQ";
  const vimeoId = "1132948199"; // Vimeo video ID for testing
  return (
    <div className="min-h-screen bg-gray-900 p-0">
      {/* <h1 className="text-white text-2xl mb-8 text-center">Custom Video Player</h1>
      <CustomReactPlayer url={vimeoUrl} />
      <h1 className="text-white text-2xl mb-8 text-center">Vimeo Video Player</h1>
      <div className="m-auto lg:px-100 h-200 w-full">
        <VimeoPlayer />
      </div> */}
      <div className="mx-auto lg:w-[80%]">
        <h1 className="text-white text-2xl mb-8 text-center">VidStack Player</h1>
        <div className="aspect-video w-full bg-amber-950">
          <VidStackPlayer vimeoId={vimeoId} />
        </div>
      </div>
    </div>
  );
}
