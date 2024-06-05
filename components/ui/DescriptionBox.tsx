import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface DescriptionBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const DescriptionBox = forwardRef<HTMLTextAreaElement, DescriptionBoxProps>(
    ({ className, disabled, ...props }, ref) => {
        return (
            <textarea
                className={twMerge(`
          flex
          w-full
          rounded-md
          bg-neutral-700
          border
          border-transparent
          px-3
          py-3
          text-sm
          placeholder:text-neutral-400
          disabled:cursor-not-allowed
          disabled:opacity-50
          focus:outline-none
          resize-vertical
        `, className)}
                disabled={disabled}
                ref={ref}
                {...props}
            />
        );
    }
);

DescriptionBox.displayName = "DescriptionBox";

export default DescriptionBox;
