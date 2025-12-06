import VidStackPlayer from "../../components/VidStackPlayer/VidStackPlayer";
import CustomReactPlayer from "@/components/CustomReactPlayer/CustomReactPlayer";
import VimeoPlayer from "../../components/VimeoPlayer/VimeoPlayer";

export default function Players() {
  // Replace with your Vimeo video URL
  const vimeoUrl = "https://www.youtube.com/watch?v=LXb3EKWsInQ";
  const vimeoId = "1132948199"; // Vimeo video ID for testing
  return (
    <div className="">
      {/* ========== VidStack Player - Custom 01 ==========  */}

      <div className="h-dvh bg-slate-900 p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player - Custom 01</h1>
        <p className="text-base text-center mb-8">Versione pimpata con Cursor.</p>
        <div className="w-3/5 mx-auto">
          <VidStackPlayer vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== Custom React Player - Custom 01 ==========  */}

      <div className="h-dvh bg-zinc-900 p-8">
        <h1 className="text-4xl text-center mb-2">React Player</h1>
        <p className="text-base text-center mb-8">Problematico.</p>
        <div className="w-3/5 mx-auto">
          <CustomReactPlayer url={vimeoUrl} />
        </div>
      </div>
    </div>
  );
}
