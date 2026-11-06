import Image from "next/image";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { screens, type Screen } from "@/lib/screens";

/**
 * A product screen: the image from lib/screens.ts, or the dashed placeholder
 * while a slot has none. The images carry their own device frame (phone,
 * tablet or browser window) and are shown whole, never cropped, so they sit
 * on the page without a border. A phone is shown narrower than the
 * placeholder, so the whole device stays a sensible height on the page.
 */
export function ProductScreen({ screen }: { screen: Screen }) {
  if (!screen.image) return <MediaPlaceholder label={screen.label} kind={screen.kind} />;

  const image = screens[screen.image];
  const isPhone = image.height > image.width * 1.5;
  const frame = {
    screen: isPhone
      ? { width: "max-w-[17rem]", sizes: "17rem" }
      : { width: "max-w-sm", sizes: "(min-width: 640px) 24rem, 100vw" },
    tablet: { width: "max-w-xl", sizes: "(min-width: 640px) 36rem, 100vw" },
    desktop: { width: "", sizes: "(min-width: 1024px) 36rem, 100vw" },
  }[screen.kind];

  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={frame.sizes}
      className={`h-auto w-full ${frame.width}`}
    />
  );
}
