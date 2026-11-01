import React, { useState } from 'react';
import {
  RitualExperience,
  RitualBudget,
  RitualDuration,
  RitualPreference,
  RitualMatchAnswers,
  RitualMatchResult,
} from '../types';
import { runRitualMatch } from '../utils/ritualEngine';
import { ServiceImage } from '../components/ServiceImage';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  ShieldAlert,
  Award,
} from 'lucide-react';

interface RitualMatchPageProps {
  onSelectServiceAndBook: (serviceId: string) => void;
}

export const RitualMatchPage: React.FC<RitualMatchPageProps> = ({
  onSelectServiceAndBook,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 'result'>(1);
  const [answers, setAnswers] = useState<RitualMatchAnswers>({
    experience: null,
    budget: null,
    duration: null,
    preferences: [],
  });
  const [result, setResult] = useState<RitualMatchResult | null>(null);

  // Step 1: Experience
  const experiences: { title: RitualExperience; description: string; icon: string }[] = [
    {
      title: 'Relaxation',
      description: 'Somatic massage, warm basalt stones, and tension-melting bodywork.',
      icon: '🌿',
    },
    {
      title: 'Skincare',
      description: 'Illuminating botanical peels, hydration infusions, and barrier repair.',
      icon: '✨',
    },
    {
      title: 'Hair care',
      description: 'Scalp steam restoration, precision styling, and humidity protection.',
      icon: '💫',
    },
    {
      title: 'Special occasion',
      description: 'Couture bridal glow, red carpet prep, and celebratory transformations.',
      icon: '👑',
    },
  ];

  // Step 2: Budget
  const budgets: { label: RitualBudget; note: string }[] = [
    { label: 'Under ₹1,000', note: 'Essential quick refresh & precision styling' },
    { label: '₹1,000–₹1,500', note: 'Signature facials, hair spa, or aromatherapy' },
    { label: '₹1,500–₹2,500', note: 'Extended hydration, full relaxation bodywork & event styling' },
    { label: 'Above ₹2,500', note: 'Comprehensive multi-stage bridal & gala sanctuary journeys' },
  ];

  // Step 3: Duration
  const durations: { label: RitualDuration; note: string }[] = [
    { label: '30–45 minutes', note: 'Compact and targeted; ideal for busy schedules' },
    { label: '60–75 minutes', note: 'Balanced and immersive; optimal therapeutic depth' },
    { label: '90–120 minutes', note: 'Extended unhurried luxury; deep meditative decompression' },
  ];

  // Step 4: Preferences
  const preferenceOptions: RitualPreference[] = [
    'Fragrance-free products',
    'Quiet environment',
    'Gentle experience',
    'No special preference',
  ];

  const handleSelectExperience = (exp: RitualExperience) => {
    setAnswers((prev) => ({ ...prev, experience: exp }));
    setCurrentStep(2);
  };

  const handleSelectBudget = (b: RitualBudget) => {
    setAnswers((prev) => ({ ...prev, budget: b }));
    setCurrentStep(3);
  };

  const handleSelectDuration = (d: RitualDuration) => {
    setAnswers((prev) => ({ ...prev, duration: d }));
    setCurrentStep(4);
  };

  const togglePreference = (pref: RitualPreference) => {
    setAnswers((prev) => {
      let current = [...prev.preferences];
      if (pref === 'No special preference') {
        return { ...prev, preferences: ['No special preference'] };
      }
      current = current.filter((p) => p !== 'No special preference');
      if (current.includes(pref)) {
        current = current.filter((p) => p !== pref);
      } else {
        current.push(pref);
      }
      return { ...prev, preferences: current };
    });
  };

  const handleCalculateMatch = () => {
    const finalAnswers: RitualMatchAnswers = {
      ...answers,
      preferences: answers.preferences.length > 0 ? answers.preferences : ['No special preference'],
    };
    const matchResult = runRitualMatch(finalAnswers);
    setResult(matchResult);
    setCurrentStep('result');
  };

  const handleReset = () => {
    setAnswers({
      experience: null,
      budget: null,
      duration: null,
      preferences: [],
    });
    setResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel text-xs uppercase tracking-[0.25em] text-[#A98759] font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#C5A477]" />
          <span>Bespoke Digital Consultation</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#302820] font-light leading-[1.12]">
          AURA Ritual Match
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6D60] leading-relaxed">
          Discover the treatment calibrated for your exact lifestyle, time horizon, and sensory comfort through our transparent matching framework.
        </p>
      </div>

      {/* Consultation Card Container */}
      <div className="glass-panel border border-[#D8C8B5] p-6 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Soft Gold Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C5A477]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Progress Bar (when in questions) */}
        {currentStep !== 'result' && (
          <div className="mb-10 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#7A6D60] uppercase tracking-wider">
              <span className="font-medium text-[#302820]">Step {currentStep} of 4</span>
              <span className="text-[#A98759]">
                {currentStep === 1 && 'Desired Experience'}
                {currentStep === 2 && 'Budget Framework'}
                {currentStep === 3 && 'Duration Window'}
                {currentStep === 4 && 'Sensory Comfort'}
              </span>
            </div>
            <div className="w-full bg-[#D8C8B5]/40 h-1.5 overflow-hidden">
              <div
                className="bg-[#C5A477] h-full transition-all duration-500 ease-out"
                style={{ width: `${(Number(currentStep) / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: Experience */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-4xl text-[#302820] font-light">
                Step 1: What experience are you looking for?
              </h2>
              <p className="text-xs text-[#7A6D60]">
                Select the primary focus of your sanctuary visit today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experiences.map((exp) => (
                <button
                  key={exp.title}
                  onClick={() => handleSelectExperience(exp.title)}
                  className={`p-6 border text-left transition-all group flex flex-col justify-between h-44 ${
                    answers.experience === exp.title
                      ? 'border-[#302820] bg-[#ECE5DA] shadow-sm'
                      : 'border-[#D8C8B5] bg-white/70 hover:border-[#C5A477] hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{exp.icon}</span>
                    <ArrowRight className="w-4 h-4 text-[#7A6D60] group-hover:translate-x-1 group-hover:text-[#302820] transition-all" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#302820]">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-[#7A6D60] mt-1.5 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Budget */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-1">
              <div className="text-xs text-[#A98759] uppercase tracking-wider font-semibold">
                Focused on {answers.experience}
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#302820] font-light">
                Step 2: What is your preferred budget?
              </h2>
              <p className="text-xs text-[#7A6D60]">
                Select the investment level that feels comfortable for your session.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgets.map((b) => (
                <button
                  key={b.label}
                  onClick={() => handleSelectBudget(b.label)}
                  className={`p-6 border text-left transition-all group flex flex-col justify-between ${
                    answers.budget === b.label
                      ? 'border-[#302820] bg-[#ECE5DA] shadow-sm'
                      : 'border-[#D8C8B5] bg-white/70 hover:border-[#C5A477] hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-semibold text-[#302820] tabular-nums">
                      {b.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#7A6D60] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-[#7A6D60] mt-3 leading-relaxed">{b.note}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820] pt-2"
            >
              &larr; Back to Experience
            </button>
          </div>
        )}

        {/* STEP 3: Duration */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-1">
              <div className="text-xs text-[#A98759] uppercase tracking-wider font-semibold">
                {answers.experience} &middot; {answers.budget}
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#302820] font-light">
                Step 3: What session duration do you prefer?
              </h2>
              <p className="text-xs text-[#7A6D60]">
                How much time can you dedicate to your personal ritual today?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {durations.map((d) => (
                <button
                  key={d.label}
                  onClick={() => handleSelectDuration(d.label)}
                  className={`p-6 border text-left transition-all group flex flex-col justify-between ${
                    answers.duration === d.label
                      ? 'border-[#302820] bg-[#ECE5DA] shadow-sm'
                      : 'border-[#D8C8B5] bg-white/70 hover:border-[#C5A477] hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Clock className="w-5 h-5 text-[#C5A477]" />
                    <ArrowRight className="w-4 h-4 text-[#7A6D60] group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-5">
                    <span className="font-serif text-2xl font-semibold text-[#302820] block">
                      {d.label}
                    </span>
                    <p className="text-xs text-[#7A6D60] mt-1.5 leading-relaxed">{d.note}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820] pt-2"
            >
              &larr; Back to Budget
            </button>
          </div>
        )}

        {/* STEP 4: Preferences */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-1">
              <div className="text-xs text-[#A98759] uppercase tracking-wider font-semibold">
                {answers.experience} &middot; {answers.budget} &middot; {answers.duration}
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#302820] font-light">
                Step 4: Select Your Preferences
              </h2>
              <p className="text-xs text-[#7A6D60]">
                Help us refine formulation bases and atmospheric pacing for your visit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {preferenceOptions.map((pref) => {
                const isSelected = answers.preferences.includes(pref);
                return (
                  <div
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#302820] bg-[#ECE5DA]'
                        : 'border-[#D8C8B5] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <span className="text-sm font-medium text-[#302820]">{pref}</span>
                    <div
                      className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#302820] border-[#302820] text-[#F5F0E8]'
                          : 'border-[#D8C8B5] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#D8C8B5]">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820]"
              >
                &larr; Back to Duration
              </button>

              <button
                onClick={handleCalculateMatch}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C5A477]" />
                <span>Calculate Ritual Match</span>
              </button>
            </div>
          </div>
        )}

        {/* RESULT STATE: Luxury Recommendation Reveal */}
        {currentStep === 'result' && result && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Recommendation Banner */}
            <div className="glass-panel border border-[#C5A477] p-7 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8C8B5]/60 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#A98759] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Optimal Sanctuary Ritual Match</span>
                </span>
                <span className="text-xs text-[#7A6D60] tracking-wider uppercase font-semibold">
                  {result.matchScore}% Preference Match
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                  <ServiceImage service={result.primaryMatch} aspectRatio="4/3" />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs uppercase tracking-wider text-[#7A6D60]">
                    {result.primaryMatch.categoryLabel}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#302820]">
                    {result.primaryMatch.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#302820] font-medium">
                    <span className="font-serif text-2xl font-bold tabular-nums">
                      ₹{result.primaryMatch.price.toLocaleString('en-IN')}
                    </span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C5A477]" />
                      {result.primaryMatch.duration} minutes
                    </span>
                  </div>
                  <p className="text-xs text-[#7A6D60] leading-relaxed">
                    {result.primaryMatch.description}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectServiceAndBook(result.primaryMatch.id)}
                      className="relative group overflow-hidden inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A477]" />
                      <span>Book This Experience</span>
                      <div className="absolute inset-0 border border-[#C5A477]/60 pointer-events-none" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparent Matching Reasoning */}
            <div className="space-y-4 p-7 glass-panel border border-[#D8C8B5]">
              <h4 className="font-serif text-2xl text-[#302820]">
                Transparent Matching Breakdown
              </h4>
              <p className="text-xs text-[#7A6D60] leading-relaxed">
                {result.reasoning}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#7A6D60] block font-semibold">
                  Satisfied Selection Rules:
                </span>
                {result.matchedAttributes.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#302820]">
                    <Check className="w-3.5 h-3.5 text-[#C5A477] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Matching Services */}
            {result.alternatives.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-serif text-2xl text-[#302820]">
                  Alternative Matching Rituals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.alternatives.map((alt) => (
                    <div
                      key={alt.id}
                      className="p-5 border border-[#D8C8B5] glass-panel flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#7A6D60]">
                          <span className="uppercase font-medium">{alt.categoryLabel}</span>
                          <span>{alt.duration} mins</span>
                        </div>
                        <h5 className="font-serif text-xl font-semibold text-[#302820] mt-1">
                          {alt.name}
                        </h5>
                        <p className="text-xs text-[#7A6D60] line-clamp-2 mt-1">
                          {alt.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#D8C8B5]/50">
                        <span className="font-serif text-lg font-bold tabular-nums text-[#302820]">
                          ₹{alt.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => onSelectServiceAndBook(alt.id)}
                          className="px-3.5 py-1.5 border border-[#302820] text-[11px] uppercase tracking-wider text-[#302820] hover:bg-[#302820] hover:text-[#F5F0E8] transition-colors"
                        >
                          Book Alternative
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restart Consultation Button */}
            <div className="pt-4 text-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820] font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-5 glass-panel border border-[#D8C8B5] text-xs text-[#7A6D60] space-y-1.5">
        <div className="flex items-center gap-2 font-semibold text-[#302820]">
          <ShieldAlert className="w-4 h-4 text-[#A98759]" />
          <span>Consultation Transparency Note</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          The AURA Ritual Match operates using a transparent, preference-based scoring rubric aligning budget, session duration, and sensory preferences. Recommendations are designed solely for personal leisure and comfort; they do not claim medical, clinical, or dermatological diagnoses.
        </p>
      </div>
    </div>
  );
};
