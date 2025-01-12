import { clsxm } from "@/lib/clsxm";
import React, { ReactNode } from "react";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  className?: string;
  inputClassname?: string;
  prepend?: ReactNode;
  append?: ReactNode;
  fieldSize?: "small" | "default" | "large";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id,
      disabled,
      label,
      inputClassname,
      prepend,
      append,
      fieldSize = "default",
      ...rest
    },
    ref
  ) => {
    return (
      <div className='w-full flex flex-col gap-2'>
        {label && <label className='text-sm font-normal'>{label}</label>}

        <div
          className={clsxm(
            "w-full border border-solid border-gray-80 bg-gray-90 outline-none rounded-lg overflow-hidden flex items-center space-x-2 relative",
            {
              "px-4": prepend || append,
              "pointer-events-none opacity-50": disabled,
              "h-[2rem]": fieldSize === "small",
              "h-[2.8rem]": fieldSize === "default",
              "h-[3.5rem]": fieldSize === "large",
            },
            className
          )}
        >
          {prepend}
          <input
            id={id}
            ref={ref}
            aria-disabled={disabled}
            autoComplete={prepend || append ? "new-password" : undefined}
            disabled={disabled}
            className={clsxm(
              "block grow h-full border-none outline-none text-white bg-transparent text-base placeholder:text-gray-80 disabled:opacity-60 disabled:pointer-events-none p-0 ring-transparent focus:border-transparent focus:ring-transparent autofill:bg-transparent max-sm:text-[16px] max-sm:placeholder:text-sm",
              {
                "px-4": !prepend && !append,
              },
              inputClassname
            )}
            {...rest}
          />
          {append}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
