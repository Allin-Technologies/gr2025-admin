"use client";

import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { clsxm } from "@/lib/clsxm";
import { Button } from "./button";
import { Spinner } from "./spinner";
import Cancel from "@/public/svgs/cancel.svg";

export const Toast = () => {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        className:
          "!p-0 overflow-hidden !bg-transparent !max-w-[24rem] !max-h-[6rem]",
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message }) => (
            <div className='flex justify-between bg-black text-gray-30 py-2 px-3 rounded-[8px] !font-normal items-center border border-solid border-gray-80 space-x-2 w-full h-full'>
              <div className='flex items-center space-x-10'>
                <div className='flex flex-col shrink ml-0'>
                  {t.type == "error" && (
                    <p className='text-gray-10 font-normal pb-[0.1rem]'>
                      Oops! Failed.
                    </p>
                  )}
                  <div
                    className={clsxm("toast-message", {
                      "text-sm text-gray-50": t.type === "error",
                    })}
                  >
                    {message}
                  </div>
                </div>

                {t.type !== "loading" && (
                  <Button
                    variant='secondary'
                    className='!p-0 min-w-fit shrink-0 !text-xs !font-normal rounded-full !w-6 !h-6'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <Cancel className='h-3 w-3 fill-white text-white' />
                  </Button>
                )}

                {t.type === "loading" && (
                  <Button
                    variant='secondary'
                    className='!p-0 min-w-fit shrink-0 !text-xs !font-normal rounded-full !w-6 !h-6 !bg-transparent max-lg:!min-w-fit'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <Spinner className='h-5 w-5' />
                  </Button>
                )}
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
