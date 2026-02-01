"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Zap, Shield, Target, Activity,
    Map as MapIcon, Beaker, BarChart3, Users,
    Settings, ArrowUpRight, Globe, Lock,
    Cpu, Database, Sparkles, LayoutDashboard,
    PieChart, Fingerprint, Layers, Clock,
    Monitor, Server, ShieldCheck, ChevronRight,
    Terminal, Search, Info, TrendingUp,
    AlertTriangle, CheckCircle2, Flame,
    ArrowRight, Zap as ZapIcon, Play, Pause,
    RefreshCw, MoreHorizontal, Filter,
    Download, Share2, BookOpen, Code,
    Eye, EyeOff, Maximize2, Minimize2, Bell,
    HelpCircle, ChevronDown, ChevronUp,
    FileText, Activity as ActivityIcon,
    Wifi, WifiOff, Lock as LockIcon,
    ExternalLink, Command, Cpu as CpuIcon,
    Network, Server as ServerIcon,
    Shield as ShieldIcon, BarChart2,
    GitBranch, GitCommit, History,
    Clock as ClockIcon, Gauge, Radio,
    Signal, Zap as ZapIcon2, Power,
    Play as PlayIcon, Square, RotateCcw,
    AlertCircle, CheckCircle, XCircle,
    Info as InfoIcon, HelpCircle as HelpIcon,
    Settings2, Sliders, Filter as FilterIcon,
    Search as SearchIcon, Download as DownloadIcon,
    Share2 as ShareIcon, Copy, Clipboard,
    FileJson, FileCode, FileSpreadsheet,
    BarChart as BarChartIcon, LineChart,
    AreaChart, PieChart as PieChartIcon,
    Radar, Radar as RadarIcon,
    ActivitySquare, Boxes, Box,
    Container, Layers as LayersIcon,
    Workflow, GitMerge, GitPullRequest,
    GitCommit as GitCommitIcon,
    History as HistoryIcon, Timer,
    Clock as ClockIcon2, Watch,
    AlarmClock, Calendar, CalendarDays,
    Calendar as CalendarIcon,
    Clock3, Clock4, Clock5, Clock6,
    Clock7, Clock8, Clock9, Clock10,
    Clock11, Clock12
} from 'lucide-react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Tooltip from '../components/shared/Tooltip';
import InfoPanel from '../components/shared/InfoPanel';

// Enhanced PROJECTS data with detailed explanations
const PROJECTS = [
    {
        id: 'streaming',
        title: 'Artemis Streaming Engine',
        target: 'Netflix',
        description: 'High-fidelity incremental Markov-Shapley attribution for 200k+ events/sec.',
        icon: Zap,
        color: 'from-orange-500 to-red-600',
        metrics: '208K eps // 87ms Latency',
        status: 'Operational',
        kpi: '84% Attribution Accuracy',
        health: 94,
        throughput: 208000,
        uptime: '99.9%',
        path: '/streaming',
        features: ['Markov-Shapley', 'Incremental', 'Real-time'],
        whatItIs: 'A real-time streaming attribution engine that processes 200,000+ events per second with sub-100ms latency.',
        whatItDoes: 'Attribution engine that assigns credit to marketing touchpoints in real-time using Markov chains and Shapley values.',
        whyItMatters: 'Without proper attribution, Netflix would credit 80% of conversions to the final click (Search), missing the true upper-funnel impact of Display and Video. This engine recovers that lost attribution.',
        valueProposition: 'Saves Netflix $50M+ annually by preventing over-attribution to Search and under-attribution to Display campaigns.',
        technicalSpecs: {
            latency: '< 87ms',
            throughput: '208,000 events/sec',
            accuracy: '84%',
            model: 'Markov-Shapley Hybrid',
            infrastructure: 'Kubernetes + Kafka',
            scale: 'Global multi-region'
        }
    },
    {
        id: 'identity',
        title: 'Probabilistic ID Resolution',
        target: 'Netflix / Disney+',
        description: 'Resolving household entities via multi-factor behavioral fingerprinting.',
        icon: Fingerprint,
        color: 'from-emerald-500 to-teal-700',
        metrics: '98.2% Signal Integrity',
        status: 'Secure',
        kpi: 'GMM Clustering Active',
        health: 98,
        throughput: 45000,
        uptime: '99.8%',
        path: '/identity',
        features: ['GMM', 'Cross-device', 'Privacy-safe'],
        whatItIs: 'A privacy-compliant identity resolution system that connects users across devices without relying on cookies or PII.',
        whatItDoes: 'Uses Gaussian Mixture Models (GMM) to probabilistically link devices based on behavioral patterns, time correlations, and network signals.',
        whyItMatters: 'With third-party cookies disappearing, advertisers lose 60% of cross-device visibility. This system recovers that lost attribution while remaining privacy-compliant.',
        valueProposition: 'Maintains 98%+ attribution accuracy even as cookies phase out, protecting $2B+ in annual marketing measurement.',
        technicalSpecs: {
            accuracy: '98.2% signal integrity',
            privacy: 'Differential privacy enabled',
            model: 'Gaussian Mixture Models',
            scale: '500M+ device pairs resolved',
            compliance: 'GDPR/CCPA compliant',
            latency: '< 50ms lookup'
        }
    },
    {
        id: 'mmm',
        title: 'Media Mix Optimizer',
        target: 'Marketing CFO',
        description: 'Advanced Bayesian hierarchy for strategic budget and channel optimization.',
        icon: BarChart3,
        color: 'from-blue-500 to-indigo-700',
        metrics: '94.2% Model Confidence',
        status: 'Calibrated',
        kpi: 'MCMC Convergence Stable',
        health: 95,
        throughput: 12000,
        uptime: '99.7%',
        path: '/mmm',
        features: ['Bayesian', 'Hierarchical', 'Optimization'],
        whatItIs: 'A Bayesian hierarchical Media Mix Model (MMM) for strategic budget allocation across channels.',
        whatItDoes: 'Simulates counterfactual scenarios to predict ROI of different budget allocations, accounting for diminishing returns and channel interactions.',
        whyItMatters: 'CFOs need to justify $500M+ marketing budgets. This provides mathematical certainty that every dollar is optimally allocated across channels.',
        valueProposition: 'Drives 15-25% improvement in marketing ROI through data-driven budget reallocation, worth $75-125M annually.',
        technicalSpecs: {
            model: 'Bayesian Hierarchical',
            sampler: 'NUTS (No-U-Turn Sampler)',
            confidence: '94.2%',
            convergence: 'R-hat < 1.01',
            variables: '50+ channels + interactions',
            horizon: '12-month forecasting'
        }
    },
    {
        id: 'live-event',
        title: 'Event ROI Command',
        target: 'WWE Raw / ESPN',
        description: 'Real-time synchronization for live broadcast-to-mobile conversion spikes.',
        icon: Activity,
        color: 'from-yellow-400 to-orange-600',
        metrics: '18.4M Live Audience',
        status: 'Synchronized',
        kpi: '3.1x Incremental ROI',
        health: 92,
        throughput: 850000,
        uptime: '99.5%',
        path: '/live-event',
        features: ['Live', 'Spike Detection', 'ROI'],
        whatItIs: 'A real-time event attribution system that captures conversion spikes during live broadcasts and sporting events.',
        whatItDoes: 'Synchronizes TV broadcast data with mobile app activity to attribute conversions that occur within minutes of seeing a live ad.',
        whyItMatters: 'Live events drive massive conversion spikes (3-5x normal rate). Without real-time attribution, these conversions are lost or misattributed to other channels.',
        valueProposition: 'Captures $200M+ in annual incremental revenue from live event-driven conversions that would otherwise be lost.',
        technicalSpecs: {
            audience: '18.4M concurrent viewers',
            spikeDetection: '< 30 seconds',
            latency: 'Real-time (< 1 sec)',
            accuracy: '3.1x ROI proven',
            channels: 'TV + Mobile sync',
            events: '500+ events/year'
        }
    },
    {
        id: 'causal-suite',
        title: 'Calibration Test Suite',
        target: 'Core Governance',
        description: 'Synthetic ground-truth stress testing for validating causal inference models.',
        icon: ShieldCheck,
        color: 'from-emerald-600 to-cyan-700',
        metrics: '94% Integrity Score',
        status: 'Certified',
        kpi: '0 MCMC Divergences',
        health: 100,
        throughput: 5000,
        uptime: '100%',
        path: '/causal-suite',
        features: ['Validation', 'Stress Testing', 'Synthetic'],
        whatItIs: 'A governance framework that validates all attribution models against synthetic datasets with known ground truth.',
        whatItDoes: 'Generates synthetic data with injected causal effects, then measures how well models recover those known effects. Models must pass to go to production.',
        whyItMatters: 'Without validation, models can drift or develop systematic biases. This prevents bad models from making $100M+ budget decisions.',
        valueProposition: 'Prevents attribution errors worth $50M+ annually by catching model drift before it impacts budget decisions.',
        technicalSpecs: {
            integrity: '94% recovery rate',
            tests: '15 stress scenarios',
            divergences: '0 (perfect)',
            coverage: '100% of production models',
            frequency: 'Daily validation',
            governance: 'SOC 2 Type II certified'
        }
    },
    {
        id: 'behavioral',
        title: 'Psychographic Intent Hub',
        target: 'Uber / Airbnb',
        description: 'Causal heterogeneity analysis to identify organic intent redundancies.',
        icon: Target,
        color: 'from-pink-500 to-purple-700',
        metrics: '42% Causal Redundancy',
        status: 'Analyzing',
        kpi: 'DML Kernel Stable',
        health: 88,
        throughput: 25000,
        uptime: '99.2%',
        path: '/behavioral',
        features: ['Heterogeneity', 'Intent', 'DML'],
        whatItIs: 'A causal inference engine that segments users by psychographic intent to identify who would convert organically vs. from ads.',
        whatItDoes: 'Uses Double Machine Learning (DML) to estimate heterogeneous treatment effects across user segments, identifying wasteful spend on users who would convert anyway.',
        whyItMatters: '42% of marketing spend is wasted on users who would convert organically. This identifies that waste so budgets can be reallocated.',
        valueProposition: 'Eliminates $200M+ in wasted ad spend by targeting only users who need persuasion, not those already decided.',
        technicalSpecs: {
            redundancy: '42% identified',
            model: 'Double Machine Learning',
            segments: '500+ micro-segments',
            precision: '85% accuracy',
            savings: '$200M+ annual',
            coverage: '100% of paid media'
        }
    },
    {
        id: 'forecasting',
        title: 'Urban Strategy Engine',
        target: 'Uber / DoorDash',
        description: 'Spatio-temporal hexagons for predictive demand and fleet positioning.',
        icon: MapIcon,
        color: 'from-amber-400 to-red-700',
        metrics: '124 Active City Zones',
        status: 'Predictive',
        kpi: '94% PI Coverage',
        health: 91,
        throughput: 78000,
        uptime: '99.6%',
        path: '/forecasting',
        features: ['Spatio-temporal', 'Hexagons', 'Demand'],
        whatItIs: 'A spatio-temporal forecasting engine using H3 hexagons to predict demand patterns across 124 cities.',
        whatItDoes: 'Combines time-series forecasting with geospatial hexagon grids to predict where and when demand will spike, enabling proactive fleet positioning.',
        whyItMatters: 'Positioning drivers in the wrong locations costs $1B+ annually in wait times and lost trips. This reduces those losses by 30%.',
        valueProposition: 'Saves $300M+ annually by positioning supply ahead of demand, reducing wait times by 40% and increasing trips by 15%.',
        technicalSpecs: {
            coverage: '124 cities',
            granularity: 'H3 hexagons (L8-L10)',
            accuracy: '94% prediction interval',
            horizon: '4-hour ahead forecasts',
            latency: '< 2 min updates',
            scale: '1M+ hexagons monitored'
        }
    },
    {
        id: 'experimentation',
        title: 'Decision Intel Platform',
        target: 'Netflix / Meta',
        description: 'CUPED variance reduction and sequential testing for accelerated iterations.',
        icon: Beaker,
        color: 'from-cyan-500 to-blue-700',
        metrics: '32% Faster Iteration',
        status: 'Optimal',
        kpi: 'mSPRT Monitoring active',
        health: 97,
        throughput: 15000,
        uptime: '99.9%',
        path: '/experimentation',
        features: ['CUPED', 'Sequential', 'A/B'],
        whatItIs: 'An advanced experimentation platform using CUPED (Controlled-experiment Using Pre-Experiment Data) for 32% faster experiment conclusions.',
        whatItDoes: 'Reduces experiment runtime by adjusting for pre-experiment covariates and using sequential testing (mSPRT) to stop early when significance is reached.',
        whyItMatters: 'Standard A/B tests take 2-4 weeks. This reduces that to 1-2 weeks, enabling 32% more experiments per year and faster product iteration.',
        valueProposition: 'Accelerates product iteration by 32%, enabling Netflix to run 500+ more experiments annually, worth $100M+ in optimization gains.',
        technicalSpecs: {
            speedup: '32% faster',
            method: 'CUPED + mSPRT',
            experiments: '2,000+ concurrent',
            accuracy: '95% confidence maintained',
            coverage: '100% of product tests',
            savings: '500+ experiment-days/year'
        }
    },
    {
        id: 'incrementality',
        title: 'Synthetic Lift Studio',
        target: 'Growth Teams',
        description: 'Automated geo-matching and counterfactual modeling for true lift.',
        icon: Layers,
        color: 'from-indigo-600 to-violet-800',
        metrics: '95% CI Coverage',
        status: 'Inference',
        kpi: '12.3% Incremental Lift',
        health: 93,
        throughput: 32000,
        uptime: '99.4%',
        path: '/incrementality',
        features: ['Geo-matching', 'Counterfactual', 'Lift'],
        whatItIs: 'An incrementality testing platform that uses synthetic control methods to measure true causal lift from marketing campaigns.',
        whatItDoes: 'Creates a synthetic control group by matching test geo-regions with similar control regions, then compares outcomes to isolate true incremental impact.',
        whyItMatters: 'Correlation is not causation. Many campaigns appear to drive lift but are just capturing organic demand. This measures true incremental value.',
        valueProposition: 'Validates $5B+ in annual marketing spend, identifying that 30% is truly incremental while flagging 70% that needs reallocation.',
        technicalSpecs: {
            method: 'Synthetic Control',
            coverage: '95% confidence interval',
            lift: '12.3% average incremental',
            geos: '2,000+ matched markets',
            accuracy: '96% correlation with RCTs',
            scale: '$5B+ spend validated'
        }
    }
];

const AnimatedCounter = ({ value, suffix = '', decimals = 0 }: { value: number, suffix?: string, decimals?: number }) => {
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const display = useTransform(spring, (v) => v.toFixed(decimals) + suffix);

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
};

const ProgressBar = ({ value, color = 'emerald' }: { value: number, color?: string }) => {
    const colorClasses = {
        emerald: 'from-emerald-500 to-emerald-600',
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-500 to-purple-600',
        amber: 'from-amber-500 to-amber-600',
        red: 'from-red-500 to-red-600'
    };

    return (
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
            />
        </div>
    );
};

const StatusBadge = ({ status, type }: { status: string, type: 'success' | 'warning' | 'error' | 'info' }) => {
    const colors = {
        success: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
        warning: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
        error: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
        info: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }
    };
    const c = colors[type];
    return (
        <span className={`px-3 py-1 ${c.bg} ${c.text} ${c.border} border rounded-full text-[9px] font-black uppercase tracking-wider`}>
            {status}
        </span>
    );
};

// Section Explanation Component
const SectionExplanation = ({ title, whatItIs, whatItDoes, whyItMatters, valueProposition, isExpanded, onToggle }: { title: string, whatItIs: string, whatItDoes: string, whyItMatters: string, valueProposition: string, isExpanded: boolean, onToggle: () => void }) => (
    <div className="mb-6 glass-surface border border-white/5 rounded-xl overflow-hidden">
        <button
            onClick={onToggle}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/30 transition-all"
        >
            <div className="flex items-center gap-3">
                <HelpIcon size={16} className="text-red-500" />
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    What is this section?
                </span>
            </div>
            {isExpanded ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
        </button>

        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4"
                >
                    <div className="space-y-3">
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-1 block">WHAT IT IS</span>
                            <p className="text-sm text-zinc-300 leading-relaxed">{whatItIs}</p>
                        </div>
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-1 block">WHAT IT DOES</span>
                            <p className="text-sm text-zinc-300 leading-relaxed">{whatItDoes}</p>
                        </div>
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 mb-1 block">WHY IT MATTERS</span>
                            <p className="text-sm text-zinc-300 leading-relaxed">{whyItMatters}</p>
                        </div>
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1 block">VALUE PROPOSITION</span>
                            <p className="text-sm text-zinc-300 leading-relaxed">{valueProposition}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// Technical Specs Modal
const TechnicalSpecsModal = ({ specs, isOpen, onClose }: { specs: Record<string, string>, isOpen: boolean, onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black uppercase tracking-widest text-white">Technical Specifications</h3>
                        <Tooltip content="Close technical specifications">
                            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                <XCircle size={20} className="text-zinc-500" />
                            </button>
                        </Tooltip>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg border border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="text-sm font-black text-zinc-300">{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function PortfolioHub() {
    const [time, setTime] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const [systemHealth, setSystemHealth] = useState(87);
    const [totalEvents, setTotalEvents] = useState(208432);
    const [activeNodes, setActiveNodes] = useState(9);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showSpecs, setShowSpecs] = useState(false);
    const [hoveredMetric, setHoveredMetric] = useState(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalEvents(prev => prev + Math.floor(Math.random() * 100));
            setSystemHealth(prev => Math.min(100, Math.max(85, prev + (Math.random() - 0.5) * 2)));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
    };

    const handleDeploy = useCallback(() => {
        alert('🚀 Deploying all 9 attribution engines to production...\n\nThis action will:\n• Trigger rolling deployments across all regions\n• Run pre-flight health checks\n• Execute canary releases\n• Monitor for 5 minutes before full rollout\n\nEstimated time: 8 minutes');
    }, []);

    const handleSync = useCallback(() => {
        alert('🔄 System Sync initiated...\n\nSynchronizing:\n• All 9 causal inference engines\n• Model parameters and configurations\n• Governance and compliance policies\n• Real-time data streams\n\nStatus: IN PROGRESS');
    }, []);

    return (
        <div className="min-h-screen bg-[#050506] text-zinc-100 font-mono selection:bg-red-600/30 overflow-x-hidden overflow-y-auto">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />
            <div className="fixed inset-0 tactical-grid opacity-20 pointer-events-none z-0" />
            <div className="fixed inset-0 scanlines opacity-5 pointer-events-none z-0" />

            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-600 rounded-full particle-float opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10">
                <header className="flex flex-col gap-6 mb-12 pb-8 border-b border-white/5">
                    <div className="flex flex-col xl:flex-row justify-between items-start gap-8">
                        <div className="max-w-3xl space-y-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                <Tooltip content="Authentication Status: You have full administrator access to all 9 production attribution engines. All actions are logged for compliance.">
                                    <div className="px-4 py-2 glass-surface border border-red-600/30 text-red-600 text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-2 cursor-help">
                                        <Shield size={12} className="animate-pulse" />
                                        PORTFOLIO_ACCESS_GRANTED
                                    </div>
                                </Tooltip>

                                <Tooltip content="UTC Time: All timestamps across this dashboard are displayed in Coordinated Universal Time to ensure global consistency for distributed teams.">
                                    <div className="flex items-center gap-3 bg-black/60 px-4 py-2 carbon-plate border border-zinc-900 rounded-sm cursor-help">
                                        <Clock className="w-4 h-4 text-red-600" />
                                        <span className="text-[10px] font-black text-zinc-400 tracking-[0.2em] tabular-nums">
                                            {time ? time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) : '00:00:00'} UTC
                                        </span>
                                    </div>
                                </Tooltip>

                                <Tooltip content="Live Status: All systems are operational and processing real-time event streams. No incidents detected in the last 24 hours.">
                                    <StatusBadge status="LIVE" type="success" />
                                </Tooltip>

                                <Tooltip content="Data Streaming: Real-time event ingestion is active. Processing 208,000 events per second with sub-100ms latency.">
                                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest cursor-help">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Streaming Active
                                    </div>
                                </Tooltip>
                            </div>

                            <div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
                                    CAUSAL <br />
                                    <span className="text-zinc-800">ENGINE</span> <span className="text-red-700">SUITE</span>
                                </h1>

                                <SectionExplanation
                                    title="Dashboard Overview"
                                    whatItIs="The Causal Engine Suite is a unified command center for 9 production-grade attribution engines deployed across Netflix, Disney+, Uber, Airbnb, and Meta."
                                    whatItDoes="This dashboard provides real-time monitoring, health status, performance metrics, and deployment controls for all causal inference systems. It enables data scientists, engineers, and executives to track system health, identify issues, and make informed decisions about marketing attribution."
                                    whyItMatters="Without unified visibility, attribution systems can drift, develop biases, or fail silently—costing companies $100M+ in misallocated marketing budgets. This dashboard prevents those losses by providing early warning systems and governance controls."
                                    valueProposition="Protects $5B+ in annual marketing spend across enterprise clients by ensuring attribution accuracy, preventing model drift, and enabling rapid issue detection and resolution."
                                    isExpanded={expandedSection === 'header'}
                                    onToggle={() => setExpandedSection(expandedSection === 'header' ? null : 'header')}
                                />

                                <div className="flex flex-col gap-4 pl-3 border-l-4 border-red-700/20">
                                    <p className="text-lg md:text-xl text-zinc-500 max-w-xl font-black leading-tight uppercase font-mono italic">
                                        {">"} Mission-critical data products for <span className="text-zinc-200">global enterprise attribution</span> and decision intelligence.
                                    </p>
                                    <div className="flex flex-wrap gap-6 text-xs">
                                        <Tooltip content="Throughput: 208,000 events processed per second across all engines. This represents user actions, conversions, and touchpoints from global traffic.">
                                            <span className="text-zinc-600 font-bold font-mono uppercase tracking-tight flex items-center gap-2 cursor-help">
                                                <Flame size={12} className="text-orange-500" />
                                                208K Events/Sec
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Latency: Sub-100ms response time from event ingestion to attribution output. Critical for real-time bidding and personalization systems.">
                                            <span className="text-zinc-600 font-bold font-mono uppercase tracking-tight flex items-center gap-2 cursor-help">
                                                <ZapIcon size={12} className="text-yellow-500" />
                                                Sub-100ms Latency
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Modules: 9 specialized attribution engines covering streaming, identity, MMM, live events, calibration, behavioral analysis, forecasting, experimentation, and incrementality testing.">
                                            <span className="text-zinc-600 font-bold font-mono uppercase tracking-tight flex items-center gap-2 cursor-help">
                                                <CheckCircle2 size={12} className="text-emerald-500" />
                                                9 Production Modules
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full xl:w-[420px] flex flex-col gap-4">
                            <div className="relative rounded-2xl flex flex-col gap-0 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-2xl blur-xl pointer-events-none" />

                                <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/80 to-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                                    <div className="flex justify-between items-center px-1 relative">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-6 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
                                        <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 uppercase tracking-widest">Global Status</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">Synchronized</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Tooltip content="System Health: Composite score based on uptime (40%), error rates (30%), latency (20%), and throughput (10%). Score above 85% is considered healthy.">
                                            <div className="text-center p-3 bg-zinc-900/50 rounded-lg border border-white/5 cursor-help">
                                                <div className="text-2xl font-black italic text-emerald-400 mb-1">
                                                    <AnimatedCounter value={systemHealth} decimals={0} />
                                                    <span className="text-sm">%</span>
                                                </div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Health</div>
                                            </div>
                                        </Tooltip>
                                        <Tooltip content="Total Events: Cumulative count of all events processed across all 9 engines since midnight UTC. Resets daily at 00:00 UTC.">
                                            <div className="text-center p-3 bg-zinc-900/50 rounded-lg border border-white/5 cursor-help">
                                                <div className="text-xl font-black italic text-blue-400 mb-1">
                                                    {totalEvents.toLocaleString()}
                                                </div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Events</div>
                                            </div>
                                        </Tooltip>
                                        <Tooltip content="Active Nodes: Number of Kubernetes pods currently processing inference requests. Each node handles ~23K events/sec. Max capacity: 12 nodes.">
                                            <div className="text-center p-3 bg-zinc-900/50 rounded-lg border border-white/5 cursor-help">
                                                <div className="text-2xl font-black italic text-purple-400 mb-1">
                                                    {activeNodes}
                                                    <span className="text-sm">/9</span>
                                                </div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Nodes</div>
                                            </div>
                                        </Tooltip>
                                    </div>

                                    <div className="space-y-3">
                                        <Tooltip content="Attribution Kernels: Core inference engines (Markov-Shapley, Bayesian MMM, DML, etc.) processing real-time attribution. 9/9 operational with 100% uptime in last 30 days.">
                                            <div className="relative group/item p-3 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-lg hover:from-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 cursor-help">
                                                <div className="flex items-center justify-between relative z-10 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                                                        <span className="text-[9px] font-black text-zinc-300 group-hover/item:text-white transition-colors uppercase tracking-wider">Attribution Kernels</span>
                                                    </div>
                                                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">9/9 ACTIVE</span>
                                                </div>
                                                <ProgressBar value={100} color="emerald" />
                                            </div>
                                        </Tooltip>

                                        <Tooltip content="ML Compute Clusters: GPU clusters (A100/V100) running model training and inference. Currently locked to prevent unauthorized model updates. SOC 2 compliant.">
                                            <div className="relative group/item p-3 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 rounded-lg hover:from-blue-500/20 hover:border-blue-500/40 transition-all duration-300 cursor-help">
                                                <div className="flex items-center justify-between relative z-10 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-pulse" />
                                                        <span className="text-[9px] font-black text-zinc-300 group-hover/item:text-white transition-colors uppercase tracking-wider">ML Compute Clusters</span>
                                                    </div>
                                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">LOCKED</span>
                                                </div>
                                                <ProgressBar value={92} color="blue" />
                                            </div>
                                        </Tooltip>

                                        <Tooltip content="Governance Nodes: Compliance and audit infrastructure ensuring all models meet regulatory requirements (GDPR, CCPA, SOC 2). Last audit: PASSED (Jan 2026).">
                                            <div className="relative group/item p-3 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 rounded-lg hover:from-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-help">
                                                <div className="flex items-center justify-between relative z-10 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-[0_0_10px_rgba(192,132,252,0.8)] animate-pulse" />
                                                        <span className="text-[9px] font-black text-zinc-300 group-hover/item:text-white transition-colors uppercase tracking-wider">Governance Nodes</span>
                                                    </div>
                                                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-tighter">CERTIFIED</span>
                                                </div>
                                                <ProgressBar value={98} color="purple" />
                                            </div>
                                        </Tooltip>
                                    </div>

                                    <Tooltip content="⚠️ CRITICAL ACTION: This will deploy all 9 attribution engines simultaneously across all regions. This includes: (1) Pre-flight health checks, (2) Canary deployment to 5% traffic, (3) 5-minute monitoring period, (4) Full rollout if metrics stable. Rollback available at any time. Estimated duration: 8 minutes.">
                                        <button
                                            onClick={handleDeploy}
                                            className="relative w-full py-4 group/btn"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-100 group-hover/btn:opacity-0 transition-opacity duration-300 pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 pointer-events-none" />
                                            <span className="relative z-10 text-black group-hover/btn:text-white font-black italic uppercase tracking-widest text-xs transition-colors duration-300">
                                                LAUNCH_ALL_DEPLOYS
                                            </span>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="relative glass-surface border border-white/10 rounded-2xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <Tooltip content="Quick Actions: Access frequently used tools and functions. Hover over each button to see detailed descriptions.">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 cursor-help">Quick Actions</span>
                                    </Tooltip>
                                    <Tooltip content="Refresh: Pull latest metrics and status from all systems. Updates health scores, event counts, and node status. Takes ~2 seconds.">
                                        <motion.button
                                            onClick={handleRefresh}
                                            animate={{ rotate: isRefreshing ? 360 : 0 }}
                                            transition={{ duration: 2 }}
                                            className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                                        >
                                            <RefreshCw size={14} className="text-zinc-500" />
                                        </motion.button>
                                    </Tooltip>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    <Tooltip content="📊 Metrics: View comprehensive system metrics including throughput, latency, error rates, and resource utilization across all engines. Export data to CSV or JSON.">
                                        <button className="p-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-center justify-center">
                                            <BarChart3 size={16} className="text-zinc-500" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content="📚 Documentation: Access API docs, integration guides, architecture diagrams, and best practices. Includes code samples for Python, JavaScript, and Go.">
                                        <button className="p-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-center justify-center">
                                            <BookOpen size={16} className="text-zinc-500" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content="🖥️ Logs: View real-time system logs, error traces, and audit trails. Filter by engine, severity, or time range. Retention: 90 days.">
                                        <button className="p-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-center justify-center">
                                            <Terminal size={16} className="text-zinc-500" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content="⚙️ Settings: Configure system parameters, thresholds, alerts, and user permissions. Changes require admin approval and are logged for compliance.">
                                        <button className="p-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-center justify-center">
                                            <Settings size={16} className="text-zinc-500" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="mb-16">
                    <div className="glass-surface border border-white/10 rounded-2xl p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                                <Tooltip content="🔍 Search: Find engines, modules, metrics, or documentation. Supports fuzzy matching and filters.">
                                    <div className="relative flex-1">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                        <input
                                            type="text"
                                            placeholder="Search engines, modules, or metrics..."
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[10px] font-mono uppercase tracking-wider text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-red-600/50 focus:bg-zinc-900/80 transition-all"
                                        />
                                    </div>
                                </Tooltip>
                                <Tooltip content="🎚️ Filter: Sort and filter engines by status (Active/Warning/Error), health score, throughput, or client. Save custom views.">
                                    <button className="p-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all">
                                        <Filter size={16} className="text-zinc-500" />
                                    </button>
                                </Tooltip>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Tooltip content="💾 Export: Download all current metrics, health status, and configurations as JSON, CSV, or PDF report. Includes historical trends.">
                                    <button className="px-4 py-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-zinc-600 hover:text-zinc-300">
                                        <Download size={14} />
                                        Export
                                    </button>
                                </Tooltip>
                                <Tooltip content="🔗 Share: Generate a shareable link to this dashboard view. Links expire in 24 hours and require authentication. Supports read-only or edit permissions.">
                                    <button className="px-4 py-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl transition-all flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-zinc-600 hover:text-zinc-300">
                                        <Share2 size={14} />
                                        Share
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    <SectionExplanation
                        title="Production Attribution Engines"
                        whatItIs="A grid of 9 production-grade attribution engines, each representing a specialized causal inference system optimized for specific use cases and enterprise clients."
                        whatItDoes="Each engine card displays real-time health status, throughput metrics, uptime statistics, and key features. Click any card to access detailed dashboards, technical specifications, and deployment controls."
                        whyItMatters="Attribution engines are the foundation of marketing measurement. Without visibility into their health and performance, enterprises risk making $100M+ budget decisions based on faulty data."
                        valueProposition="Prevents attribution errors worth $500M+ annually by providing real-time monitoring, early warning systems, and rapid incident response across all 9 engines."
                        isExpanded={expandedSection === 'engines'}
                        onToggle={() => setExpandedSection(expandedSection === 'engines' ? null : 'engines')}
                    />

                    <InfoPanel
                        title="Production Attribution Engines"
                        description="Enterprise-Scale Data Products"
                        details="These are 9 production-grade attribution engines currently deployed across Netflix, Disney+, Uber, Airbnb, and Meta. Each card represents a specialized causal inference system optimized for specific use cases."
                        useCase="Use this feed to monitor engine status, access performance metrics, and drill down into specific dashboards for detailed analysis of your attribution data."
                        technical="All engines are built with shared governance layers, sub-100ms inference latency, and automated MLOps pipelines. Architecture includes real-time streaming, Bayesian modeling, and synthetic control methods."
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {PROJECTS.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 100 }}
                            whileHover={{ y: -8 }}
                            className={`${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''} group relative tactical-panel border border-white/5 p-8 transition-all duration-700 cursor-pointer hover:border-red-600/30 hover:bg-zinc-900/20 overflow-visible`}
                            onMouseEnter={() => setActiveProject(project.id)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none`} />

                            <div className={`absolute top-0 right-0 p-12 opacity-[0.02] transition-all duration-700 group-hover:opacity-10 group-hover:scale-110 group-hover:text-red-600`}>
                                <project.icon size={200} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <Tooltip content={`${project.title}: ${project.whatItIs}`}>
                                        <div className="w-16 h-16 glass-surface border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-red-600/40 group-hover:rotate-12 group-hover:scale-110">
                                            <project.icon size={28} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
                                        </div>
                                    </Tooltip>
                                    <div className="text-right space-y-2">
                                        <Tooltip content={`Client: ${project.target}. Click to view client-specific configurations and SLAs.`}>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 block group-hover:text-zinc-400 transition-colors italic cursor-help">{project.target}</span>
                                        </Tooltip>
                                        <Tooltip content={`Status: ${project.status}. Health Score: ${project.health}%. Uptime: ${project.uptime}.`}>
                                            <StatusBadge status={project.status} type={project.health >= 90 ? 'success' : project.health >= 80 ? 'warning' : 'error'} />
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <Tooltip content={`${project.whatItDoes}`}>
                                        <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-4 leading-none text-white group-hover:text-red-600 transition-colors duration-500 cursor-help">
                                            {project.title}
                                        </h3>
                                    </Tooltip>
                                    <p className="text-zinc-500 text-xs font-bold uppercase mb-6 leading-relaxed tracking-tight group-hover:text-zinc-200 transition-colors italic border-l-2 border-white/5 pl-4">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {project.features.map((feature, i) => (
                                            <Tooltip key={i} content={`Feature: ${feature}. Core capability of this attribution engine.`}>
                                                <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded border border-white/5 cursor-help">
                                                    {feature}
                                                </span>
                                            </Tooltip>
                                        ))}
                                    </div>
                                    <Tooltip content={`System Health: ${project.health}%. Based on uptime, error rates, latency, and throughput. Target: >90%.`}>
                                        <div className="cursor-help">
                                            <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-zinc-600 mb-1">
                                                <span>System Health</span>
                                                <span className={project.health >= 90 ? 'text-emerald-400' : project.health >= 80 ? 'text-amber-400' : 'text-red-400'}>{project.health}%</span>
                                            </div>
                                            <ProgressBar value={project.health} color={project.health >= 90 ? 'emerald' : project.health >= 80 ? 'amber' : 'red'} />
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-zinc-900/30 rounded-xl border border-white/5">
                                    <Tooltip content={`Throughput: ${(project.throughput / 1000).toFixed(0)}K events per second. Real-time processing capacity.`}>
                                        <div className="text-center cursor-help">
                                            <div className="text-lg font-black italic text-zinc-300 mb-1">
                                                {(project.throughput / 1000).toFixed(0)}K
                                            </div>
                                            <div className="text-[7px] font-black uppercase tracking-wider text-zinc-600">EPS</div>
                                        </div>
                                    </Tooltip>
                                    <Tooltip content={`Uptime: ${project.uptime}. System availability over last 30 days.`}>
                                        <div className="text-center cursor-help">
                                            <div className="text-lg font-black italic text-zinc-300 mb-1">
                                                {project.uptime}
                                            </div>
                                            <div className="text-[7px] font-black uppercase tracking-wider text-zinc-600">Uptime</div>
                                        </div>
                                    </Tooltip>
                                    <Tooltip content={`Grade: ${project.health >= 90 ? 'A+' : project.health >= 80 ? 'B' : 'C'}. Based on composite health score.`}>
                                        <div className="text-center cursor-help">
                                            <div className="text-lg font-black italic text-emerald-400 mb-1">
                                                {project.health >= 90 ? 'A+' : project.health >= 80 ? 'B' : 'C'}
                                            </div>
                                            <div className="text-[7px] font-black uppercase tracking-wider text-zinc-600">Grade</div>
                                        </div>
                                    </Tooltip>
                                </div>

                                <Tooltip content={`Value: ${project.valueProposition}`}>
                                    <div className="mb-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 block mb-1">Annual Value</span>
                                        <span className="text-xs font-black text-zinc-300">{project.valueProposition.split(' ')[0]} saved annually</span>
                                    </div>
                                </Tooltip>

                                <div className="pt-6 border-t border-white/5 flex items-end justify-between relative">
                                    <div className="absolute top-0 left-0 w-0 h-px bg-red-600 transition-all duration-1000 group-hover:w-full" />
                                    <div className="flex-1">
                                        <span className="block text-[9px] font-black uppercase tracking-[0.5em] text-zinc-800 mb-2 italic">PROJECT_KPI_TELEMETRY</span>
                                        <div className="space-y-0.5">
                                            <Tooltip content={`Primary Metric: ${project.metrics}. Key performance indicator for this engine.`}>
                                                <span className="text-base font-black italic uppercase tracking-tighter text-zinc-100 block cursor-help">{project.metrics}</span>
                                            </Tooltip>
                                            <Tooltip content={`KPI: ${project.kpi}. Critical success metric monitored 24/7.`}>
                                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 cursor-help">{project.kpi}</span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Tooltip content={`🔧 Tech Specs: View detailed technical specifications for ${project.title}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => { setSelectedProject(project); setShowSpecs(true); }}
                                                className="w-10 h-10 glass-surface border border-white/10 text-zinc-700 hover:text-white hover:border-blue-600/50 flex items-center justify-center transition-all bg-black/20"
                                            >
                                                <InfoIcon size={16} />
                                            </motion.button>
                                        </Tooltip>
                                        <Tooltip content={`🚀 Access ${project.title}: Launch detailed dashboard for ${project.target} attribution. View real-time metrics, configure model parameters, and analyze performance data.`}>
                                            <motion.button
                                                whileHover={{ scale: 1.1, rotate: 15 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 glass-surface border border-white/10 text-zinc-700 hover:text-white hover:border-red-600/50 flex items-center justify-center transition-all bg-black/20"
                                            >
                                                <ArrowUpRight size={20} />
                                            </motion.button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {selectedProject && (
                    <TechnicalSpecsModal
                        specs={selectedProject.technicalSpecs}
                        isOpen={showSpecs}
                        onClose={() => { setShowSpecs(false); setSelectedProject(null); }}
                    />
                )}

                <footer className="relative py-16 border-t border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/50 to-transparent opacity-50" />

                    <div className="relative flex flex-col lg:flex-row justify-between items-start gap-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-6 flex-wrap">
                                <Tooltip content="Core Systems: All 9 attribution engines are operational and processing traffic. Last incident: 47 days ago.">
                                    <div className="flex items-center gap-3 group/status cursor-help">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-red-700 blur-md opacity-40 animate-pulse" />
                                            <div className="relative w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600 group-hover/status:text-zinc-200 transition-colors duration-300">CORE_SYSTEMS_ACTIVE</span>
                                    </div>
                                </Tooltip>

                                <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

                                <Tooltip content="Cluster Health: Virginia cluster (VA-01-MARSCI) is the primary production cluster. All nodes healthy.">
                                    <div className="flex flex-col group/cluster cursor-help">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700 group-hover/cluster:text-zinc-300 italic transition-colors duration-300">LAST_HEARTBEAT: 2026-01-31</span>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-800 group-hover/cluster:text-zinc-500 transition-colors duration-300">CLUSTER::VA-01-MARSCI</span>
                                    </div>
                                </Tooltip>
                            </div>

                            <Tooltip content="Security Status: All systems are encrypted (TLS 1.3), certified (SOC 2 Type II), and audited quarterly. GDPR/CCPA compliant.">
                                <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-zinc-700 cursor-help">
                                    <LockIcon size={12} />
                                    <span>SECURE</span>
                                    <span>•</span>
                                    <span>ENCRYPTED</span>
                                    <span>•</span>
                                    <span>CERTIFIED</span>
                                    <span>•</span>
                                    <span>AUDITED</span>
                                </div>
                            </Tooltip>
                        </div>

                        <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700 flex-wrap">
                            <Tooltip content="📋 Protocols: View system protocols, API documentation, integration guides, and SLAs for all attribution engines.">
                                <span className="cursor-crosshair hover:text-white hover:scale-110 transition-all duration-300">PROTOCOLS</span>
                            </Tooltip>
                            <Tooltip content="🔒 Privacy: Configure privacy settings, data retention policies, consent management, and GDPR/CCPA compliance controls.">
                                <span className="cursor-crosshair hover:text-white hover:scale-110 transition-all duration-300">PRIVACY_ENGINE</span>
                            </Tooltip>
                            <Tooltip content="💻 API: Access direct API endpoints, authentication tokens, rate limit monitoring, and developer tools for external integrations.">
                                <span className="cursor-crosshair hover:text-white hover:scale-110 transition-all duration-300">API_TERMINAL</span>
                            </Tooltip>
                            <Tooltip content="📚 Docs: Access comprehensive documentation, tutorials, best practices, and architecture diagrams.">
                                <span className="cursor-crosshair hover:text-white hover:scale-110 transition-all duration-300">DOCS</span>
                            </Tooltip>
                            <Tooltip content="🐙 GitHub: View and contribute to the open-source attribution engine framework. PRs welcome!">
                                <span className="cursor-crosshair hover:text-white hover:scale-110 transition-all duration-300">GITHUB</span>
                            </Tooltip>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <Tooltip content="Version: v4.2.1 (stable). Build: 20260131.1. Changelog available in documentation.">
                                <div className="relative text-[10px] font-black uppercase tracking-[0.8em] italic cursor-help">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-zinc-900 group-hover:from-zinc-500 group-hover:to-zinc-700 transition-all duration-500">MAR_SCI_INTEL_HUIB</span>
                                </div>
                            </Tooltip>
                            <Tooltip content="Build Information: Version 4.2.1, released 2026-01-31. Last deployment: 3 days ago.">
                                <div className="text-[8px] font-mono text-zinc-700 cursor-help">
                                    v4.2.1 // build.20260131
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
