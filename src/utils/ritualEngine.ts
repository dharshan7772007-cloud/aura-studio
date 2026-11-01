import { RitualMatchAnswers, RitualMatchResult, Service, ServiceCategory } from '../types';
import { SERVICES } from '../data/services';

export function runRitualMatch(answers: RitualMatchAnswers): RitualMatchResult {
  const { experience, budget, duration, preferences } = answers;

  // Map experience to category
  let targetCategory: ServiceCategory = 'skincare';
  if (experience === 'Relaxation') targetCategory = 'wellness';
  else if (experience === 'Hair care') targetCategory = 'hair';
  else if (experience === 'Special occasion') targetCategory = 'occasions';

  // Budget min & max
  let minBudget = 0;
  let maxBudget = 10000;
  if (budget === 'Under ₹1,000') {
    maxBudget = 999;
  } else if (budget === '₹1,000–₹1,500') {
    minBudget = 1000;
    maxBudget = 1500;
  } else if (budget === '₹1,500–₹2,500') {
    minBudget = 1500;
    maxBudget = 2500;
  } else if (budget === 'Above ₹2,500') {
    minBudget = 2500;
  }

  // Duration target
  let targetMinDuration = 30;
  let targetMaxDuration = 120;
  if (duration === '30–45 minutes') {
    targetMinDuration = 30;
    targetMaxDuration = 45;
  } else if (duration === '60–75 minutes') {
    targetMinDuration = 60;
    targetMaxDuration = 75;
  } else if (duration === '90–120 minutes') {
    targetMinDuration = 90;
    targetMaxDuration = 120;
  }

  // Score each service
  const scored = SERVICES.map((service) => {
    let score = 0;
    const matchReasons: string[] = [];

    // Category match is paramount (40 points)
    if (service.category === targetCategory) {
      score += 40;
      matchReasons.push(`Directly satisfies your request for ${experience}`);
    } else {
      score += 5;
    }

    // Budget match (30 points)
    if (service.price >= minBudget && service.price <= maxBudget) {
      score += 30;
      matchReasons.push(`Fits within your designated budget of ${budget} (priced at ₹${service.price.toLocaleString('en-IN')})`);
    } else {
      // Small penalty if outside budget but closer is better
      const diff = Math.min(Math.abs(service.price - minBudget), Math.abs(service.price - maxBudget));
      if (diff <= 500) {
        score += 15;
        matchReasons.push(`Close to your preferred budget range (₹${service.price.toLocaleString('en-IN')})`);
      }
    }

    // Duration match (20 points)
    if (service.duration >= targetMinDuration && service.duration <= targetMaxDuration) {
      score += 20;
      matchReasons.push(`Matches your desired ${duration} window (${service.duration} mins)`);
    } else {
      score += 5;
    }

    // Preferences bonus (10 points)
    if (preferences.includes('Fragrance-free products')) {
      if (service.category === 'skincare') {
        score += 5;
        matchReasons.push('Formulated with hypoallergenic botanical barrier bases');
      }
    }
    if (preferences.includes('Quiet environment') || preferences.includes('Gentle experience')) {
      if (service.category === 'wellness' || service.name.includes('Glow') || service.name.includes('Hydration') || service.name.includes('Calm')) {
        score += 5;
        matchReasons.push('Designed for gentle pacing and meditative ambient stillness');
      }
    }

    return {
      service,
      score,
      reasons: matchReasons,
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  const topMatch = scored[0];
  const primaryService = topMatch.service;

  // Build explanatory text
  const prefSummary = preferences.filter((p) => p !== 'No special preference').join(', ');
  const prefClause = prefSummary ? ` with special consideration for ${prefSummary}` : '';
  
  const reasoning = `Based on your consultation answers, the ${primaryService.name} is your optimal ritual match. It is situated in our ${primaryService.categoryLabel} suite at ₹${primaryService.price.toLocaleString('en-IN')} for ${primaryService.duration} minutes, directly aligning with your preferred ${budget} investment and ${duration} timeline${prefClause}. ${primaryService.description}`;

  const alternatives = scored.slice(1, 3).map((item) => item.service);

  return {
    primaryMatch: primaryService,
    matchScore: Math.min(Math.round((topMatch.score / 100) * 100), 99),
    reasoning,
    matchedAttributes: topMatch.reasons,
    alternatives,
  };
}
