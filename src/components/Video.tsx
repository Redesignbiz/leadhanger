"use client";

import Image from "next/image";
import { useState } from "react";
import { Highlight, Section } from "./Section";

const VIDEO_ID = "Mxcd3Ze6Uy0";
const VIDEO_TITLE =
  "LeadHanger | Smarter Lead Management for Brands, Dealers, and Customers";

/**
 * The product video, a YouTube Short, so the frame is portrait.
 *
 * Click to load, on purpose. The privacy notice says this site sets no cookies
 * and loads no third-party scripts, and an embedded player does both the
 * moment the page renders. Until the visitor presses play, this is a local
 * poster image and a button: nothing is requested from YouTube, not even the
 * thumbnail, which is why `video-poster.jpg` is a copy in `public/` rather than
 * an `i.ytimg.com` URL. After the click the player loads from
 * youtube-nocookie.com, and the privacy notice says so.
 *
 * If the video is ever replaced, update the poster with it.
 */
export function Video() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section id="video">
      <div className="reveal mx-auto max-w-3xl text-center">
        <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[38px]">
          The bridge from <Highlight>digital to physical sales.</Highlight>
        </h2>
        <p className="text-ink-muted mx-auto mt-6 max-w-2xl text-[16px] leading-[1.65] sm:text-[17px]">
          See how LeadHanger connects real buyers to the right dealers, turning
          online interest into measurable results.
        </p>
      </div>

      <div className="reveal border-line relative mx-auto mt-12 aspect-[9/16] w-full max-w-[22rem] overflow-hidden rounded-lg border bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
            title={VIDEO_TITLE}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Play video: ${VIDEO_TITLE}`}
          >
            <Image
              src="/images/video-poster.jpg"
              alt=""
              fill
              sizes="22rem"
              className="object-cover"
            />
            <span className="bg-blue group-hover:bg-blue-hover absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 size-6 text-white"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </Section>
  );
}
