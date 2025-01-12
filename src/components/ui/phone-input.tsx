"use client";

import { CheckIcon, ChevronDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Input, InputProps } from "./input";
import { Popover } from "./popover";

import { clsxm } from "@/lib/clsxm";
import { ScrollArea } from "./scroll-area";

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={clsxm("flex !m-0", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(value) => onChange?.(value || ("" as any))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={clsxm("border-l-0 rounded-e-[4px] rounded-s-none", className)}
      {...props}
      ref={ref}
    />
  )
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled = false,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover
      contentClassName='px-2'
      content={() => (
        <Command>
          <CommandList>
            <ScrollArea className='h-72'>
              <CommandInput
                className='border-0 focus-visible:outline-none focus-visible:ring-transparent'
                placeholder='Search country...'
              />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className='gap-2'
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className='flex-1 text-sm'>{option.label}</span>
                      {option.value && (
                        <span className='text-foreground/50 text-sm'>
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={clsxm(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      )}
      useDefaultTrigger={false}
    >
      <Button
        type='button'
        className={clsxm(
          "flex gap-1.5 rounded-e-none rounded-s-[6px] px-4 w-auto min-w-0 h-full bg-gray-90 border border-solid border-gray-80"
        )}
        disabled={disabled}
      >
        <FlagComponent country={value} countryName={value} />
        <ChevronDown
          className={clsxm(
            "-mr-2 h-4 w-4 opacity-50 text-input",
            disabled ? "hidden" : "opacity-100"
          )}
        />
      </Button>
    </Popover>
  );
};

export const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-[4px] my-auto'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
