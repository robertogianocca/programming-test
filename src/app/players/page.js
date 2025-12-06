import VidStackPlayer from "../../components/VidStackPlayer/VidStackPlayer";
import VidStackTheme from "../../components/VidStackTheme/VidStackTheme";
import VidStackPlayer00 from "../../components/VidStackPlayer00/VidStackPlayer00";
import VidStackPlayer01 from "../../components/VidStackPlayer01/VidStackPlayer01";
import CustomReactPlayer from "@/components/CustomReactPlayer/CustomReactPlayer";
import VimeoPlayer from "../../components/VimeoPlayer/VimeoPlayer";
import VidStackPlayerTest from "../../components/VidStackPlayerTest/VidStackPlayerTest";
import VidStackPlyr from "../../components/VidStackPlyr/VidStackPlyr";

export default function Players() {
  // Replace with your Vimeo video URL
  const vimeoUrl = "https://www.youtube.com/watch?v=LXb3EKWsInQ";
  const vimeoId = "1132948199"; // Vimeo video ID for testing
  return (
    <div className="">
      {/* ========== VidStack Player TEST ==========  */}

      <div className="h-dvh bg-zinc-900 p-2 lg:p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player TEST</h1>
        <p className="text-base text-center mb-8"></p>
        <div className="lg:w-3/5 mx-auto">
          <VidStackPlayerTest vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== VidStack Player - Base 01 ==========  */}

      <div className="h-dvh bg-zinc-900 p-2 lg:p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player - Base 01</h1>
        <p className="text-base text-center mb-8">Rifactor di ChatGPT.</p>
        <div className="lg:w-3/5 mx-auto">
          <VidStackPlayer01 vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== VidStack Player - Base 00 ==========  */}

      <div className="h-dvh bg-zinc-900 p-2 lg:p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player - Base 00</h1>
        <p className="text-base text-center mb-8">Base fondamentale.</p>
        <div className="lg:w-3/5 mx-auto">
          <VidStackPlayer00 vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== VidStack Player Theme Default 01 ==========  */}

      <div className="h-dvh bg-zinc-900 p-2 lg:p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player Theme Default 01</h1>
        <p className="text-base text-center mb-8">By ChatGPT.</p>
        <div className="lg:w-3/5 mx-auto">
          <VidStackTheme vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== VidStack Player PLYR ==========  */}

      <div className="h-dvh bg-zinc-900 p-2 lg:p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player PLYR</h1>
        <p className="text-base text-center mb-8">base.</p>
        <div className="lg:w-3/5 mx-auto">
          <VidStackPlyr vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== VidStack Player - Custom 01 ==========  */}

      <div className="h-dvh bg-slate-900 p-2 lg:p-8">
        <h1 className="text-4xl text-center mb-2">VidStack Player - Custom 01</h1>
        <p className="text-base text-center mb-8">Versione pimpata con Cursor.</p>
        <div className="lg:w-3/5 mx-auto">
          <VidStackPlayer vimeoId={vimeoId} />
        </div>
      </div>
      {/* ========== Custom React Player - Custom 01 ==========  */}

      <div className="h-dvh bg-zinc-900 p-8">
        <h1 className="text-4xl text-center mb-2">React Player</h1>
        <p className="text-base text-center mb-8">Problematico.</p>
        <div className="lg:w-3/5 mx-auto">
          <CustomReactPlayer url={vimeoUrl} />
        </div>
      </div>
    </div>
  );
}
