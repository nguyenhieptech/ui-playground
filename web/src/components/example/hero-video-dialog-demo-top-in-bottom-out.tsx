import { BorderBeam } from "@/components/magicui/border-beam";
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <section className="relative mx-auto flex h-screen max-w-5xl flex-col items-center justify-center px-7 lg:px-0">
      <div className="relative overflow-hidden rounded-2xl p-1">
        <BorderBeam />
        <HeroVideoDialog
          animationStyle="top-in-bottom-out"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </section>
  );
}
