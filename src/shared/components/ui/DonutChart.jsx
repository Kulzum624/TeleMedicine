import { memo, useMemo } from 'react';


const DonutChart = ({ 
    data = [], 
    size = 200, 
    strokeWidth = 24, 
    centerLabel, 
    centerSublabel,
    className = "" 
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    const total = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);
    

    const segments = useMemo(() => {
        let accumulatedPercent = 0;
        return data.map((item) => {
            const percent = item.value / (total || 1);
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += percent;
            
            return {
                ...item,
                strokeDasharray,
                strokeDashoffset
            };
        });
    }, [data, circumference, total]);

    return (
        <div className={`relative flex flex-col items-center ${className}`}>
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className="transform -rotate-90"
                >
                    
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke="#F1F5F9"
                        strokeWidth={strokeWidth}
                    />
                    
                    
                    {segments.map((segment, index) => (
                        <circle
                            key={index}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={segment.strokeDasharray}
                            strokeDashoffset={segment.strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    ))}
                </svg>

                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 leading-none">{centerLabel}</span>
                    {centerSublabel && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {centerSublabel}
                        </span>
                    )}
                </div>
            </div>

            
        </div>
    );
};

export default memo(DonutChart);
