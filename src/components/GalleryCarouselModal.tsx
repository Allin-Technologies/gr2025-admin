"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { saveAs } from "file-saver";
import { useMutation } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface GalleryCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: {
    type: string;
    src: string;
    alt: string;
  }[];
}

export function GalleryCarouselModal({
  isOpen,
  onClose,
  items,
}: GalleryCarouselModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl aspect-video'>
        <Carousel
          opts={{ loop: true }}
          className='w-full h-full max-w-4xl mx-auto'
        >
          <CarouselContent>
            {items.map((item, index) => (
              <Item key={index} {...item} />
            ))}
          </CarouselContent>
          {items?.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}

function Item(item: { type: string; src: string; alt: string }) {
  // Mutation to handle file downloads
  const mutation = useMutation({
    mutationFn: async ({ src, alt }: { src: string; alt: string }) => {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error("Failed to fetch the file.");
      }
      return await response.blob();
    },
    onSuccess: (blob, variables) => {
      const { alt } = variables;
      // Check for iOS Safari fallback
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

      if (isIOS) {
        saveAs(blob, alt || "download");
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = alt || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast(error.message || "An error occurred while downloading the file");
    },
  });

  return (
    <CarouselItem className='relative h-full'>
      {item.type === "image" ? (
        <>
          <div className='relative aspect-video'>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className='object-cover rounded-md'
            />
          </div>
          <Button
            className='absolute bottom-4 right-4'
            onClick={() =>
              mutation.mutate({
                src: item.src,
                alt: item.alt,
              })
            }
          >
            {mutation.isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Download className='size-4' />
            )}
            <span className='sr-only'>Download image</span>
          </Button>
        </>
      ) : (
        <>
          <video src={item.src} controls className='w-full h-full rounded-md'>
            Your browser does not support the video tag.
          </video>
          <Button
            className='absolute bottom-4 right-4'
            onClick={() =>
              mutation.mutate({
                src: item.src,
                alt: item.alt,
              })
            }
          >
            {mutation.isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Download className='size-4' />
            )}
            <span className='sr-only'>Download image</span>
          </Button>
        </>
      )}
    </CarouselItem>
  );
}
