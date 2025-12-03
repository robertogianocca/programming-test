import { useRef } from "react";
import Player from "@vimeo/player";

export default function UseRef() {
  //
  const playerRef = useRef();
  //   const player = new Player("handstick", {
  //     id: 19231868,
  //     width: 640,
  //   });

  return (
    <div>
      <h1>useRef</h1>
    </div>
  );
}
