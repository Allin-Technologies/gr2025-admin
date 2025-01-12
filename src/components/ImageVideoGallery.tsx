"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GalleryCarouselModal } from "./GalleryCarouselModal";

export function ImageVideoGallery(props: { items: string[]; label?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const galleryItems = props.items.map((item) => {
    const isVideo = /\.(mp4|mov|avi|wmv|flv)$/i.test(item); // Determine if the file is a video based on its extension
    const fileName = item.split("/").pop()?.split(".")[0] || "File"; // Extract file name for alt

    return {
      type: isVideo ? "video" : "image", // Set type based on file extension
      src: item, // Use the original URL as src
      alt: fileName, // Use the file name as alt text
    };
  });

  return (
    <>
      <Button
        className='text-sm px-2.5 py-1.5 h-auto font-normal whitespace-nowrap'
        size='small'
        onClick={() => setIsOpen(true)}
      >
        {props.label ? props.label : "Open Gallery"}
      </Button>
      <GalleryCarouselModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={galleryItems}
      />
    </>
  );
}
