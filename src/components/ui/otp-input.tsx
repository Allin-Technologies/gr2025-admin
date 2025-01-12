import { clsxm } from "@/lib/clsxm";
import React from "react";
import UnstyledOtpInput from "react-otp-input";

interface OtpInputProps {
  value: string;
  numInputs?: 6 | 5;
  onChange: (code: string) => void;
}

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  ({ onChange, value, numInputs = 6 }, ref) => {
    return (
      <div ref={ref}>
        <UnstyledOtpInput
          shouldAutoFocus
          numInputs={numInputs}
          onChange={onChange}
          containerStyle={{
            display: "grid",
            gap: "0.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(2.5rem, 1fr))",
          }}
          /* eslint-disable-next-line */
          renderInput={({ type, className, style, inputMode, ...rest }) => (
            <input
              required
              className={clsxm(
                "rounded-lg bg-gray-90 h-[3.65rem] outline-none border-gray-80 text-center text-2xl font-semibold !select-none focus:select-none focus:outline-none focus:ring-transparent focus:!border-gray-80"
              )}
              inputMode='numeric'
              type='number'
              {...rest}
            />
          )}
          renderSeparator={null}
          value={value as string}
        />
      </div>
    );
  }
);
OtpInput.displayName = "OtpInput";
