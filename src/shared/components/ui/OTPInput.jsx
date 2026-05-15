import { useRef, useState, memo, useCallback } from 'react';
import { cn } from '../../utils/cn';

export const OTPInput = memo(({ length = 6, onComplete, className }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleChange = useCallback((element, index) => {
        const value = element.value;
        if (isNaN(value)) return false;

        const digit = value.substring(value.length - 1);

        setOtp(prev => {
            const next = [...prev];
            next[index] = digit;


            if (digit !== '' && index < length - 1) {
                inputRefs.current[index + 1].focus();
            }


            const newOtp = next.join('');
            if (onComplete) {
                onComplete(newOtp);
            }

            return next;
        });
    }, [length, onComplete]);

    const handleKeyDown = useCallback((e, index) => {

        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }, [otp]);

    return (
        <div className={cn("flex justify-center items-center space-x-3 sm:space-x-4", className)}>
            {otp.map((data, index) => {
                return (
                    <input
                        className="w-12 h-14 sm:w-14 sm:h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-gray-900"
                        type="text"
                        name="otp"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()}
                        onKeyDown={e => handleKeyDown(e, index)}
                        ref={ref => inputRefs.current[index] = ref}
                    />
                );
            })}
        </div>
    );
});

OTPInput.displayName = 'OTPInput';
