import { Composition } from "remotion";
import { SwashoppingVideo } from "./SwashoppingVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SwashoppingVideo"
        component={SwashoppingVideo}
        durationInFrames={95 * 30} // 95 detik x 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
