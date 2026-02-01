'use client';

import React, { useState, useRef } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

let tooltipIdCounter = 0;

export default function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipId] = useState(() => `tooltip-${++tooltipIdCounter}`);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
        setIsVisible(true);
    };

    const hideTooltip = () => {
        setIsVisible(false);
    };

    return (
        <div
            ref={wrapperRef}
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            data-tooltip-id={tooltipId}
        >
            {children}
            {isVisible && (
                <div className="absolute z-[99999] bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900/98 border border-zinc-700 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-300 pointer-events-none shadow-[0_4px_20px_rgba(0,0,0,0.6)] max-w-[250px] text-center whitespace-normal backdrop-blur-sm">
                    {content}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-zinc-700" />
                </div>
            )}
        </div>
    );
}
