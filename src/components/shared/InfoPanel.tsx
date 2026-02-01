import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface InfoPanelProps {
    title: string;
    description: string;
    details: string;
    useCase: string;
    technical?: string;
}

export default function InfoPanel({ title, description, details, useCase, technical }: InfoPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="tactical-panel border border-white/5 bg-zinc-900/20 rounded-2xl overflow-visible transition-all">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-zinc-800/30 transition-all group"
            >
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center border border-red-600/20 group-hover:border-red-600/40 transition-all">
                        <Info size={20} className="text-red-500" />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">{description}</div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-white italic">{title}</h3>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp size={18} className="text-zinc-500 transition-transform" />
                ) : (
                    <ChevronDown size={18} className="text-zinc-500 transition-transform" />
                )}
            </button>

            {isExpanded && (
                <div className="px-8 pb-8 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 relative">
                    <div className="border-t border-white/5 pt-6">
                        <div className="space-y-5">
                            <div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-red-600" />
                                    INTELLIGENCE_SUMMARY
                                </div>
                                <p className="text-sm font-bold text-zinc-300 leading-relaxed">{details}</p>
                            </div>
                            
                            <div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-emerald-600" />
                                    TACTICAL_APPLICATION
                                </div>
                                <p className="text-sm font-bold text-zinc-300 leading-relaxed">{useCase}</p>
                            </div>
                            
                            {technical && (
                                <div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-blue-600" />
                                        TECHNICAL_SPECIFICATIONS
                                    </div>
                                    <p className="text-[10px] font-mono text-zinc-500 leading-relaxed italic">{technical}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
