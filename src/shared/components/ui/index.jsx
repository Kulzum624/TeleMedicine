import { memo, forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Button = memo(({className, variant = 'primary', size = 'md', children, isLoading, ...props})=>{
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50';

    const variants = {
        primary: 'bg-[#c62828] text-white hover:bg-primary-dark shadow-sm',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
    };

    return (
        <button 
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    {children}
                </div>
            ) : children}
        </button>
    );
});

Button.displayName = 'Button';

export const Input = memo(
    forwardRef(({ className, type, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                        error && "border-red-500 focus:ring-red-500",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }),
);

Input.displayName = "Input";

export { OTPInput } from './OTPInput';
export { default as LoadingFallback } from './LoadingFallback';
export { default as DonutChart } from './DonutChart';
