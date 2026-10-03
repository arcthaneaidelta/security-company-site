export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  heroImage: string;
  risks: { title: string; description: string }[];
  recommendedServices: string[];
  deployment: { title: string; description: string }[];
  caseSnapshot: {
    title: string;
    metric: string;
    detail: string;
  };
}

export const industries: Industry[] = [
  {
    slug: 'corporate-offices',
    name: 'Corporate Offices',
    tagline: 'Protecting your people, your assets and your reputation',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop',
    risks: [
      { title: 'Unauthorized access', description: 'Tailgating, expired credentials and after-hours entry create vulnerabilities in multi-tenant buildings.' },
      { title: 'Workplace incidents', description: 'Domestic disputes, terminated employees and visitor conflicts require trained, calm intervention.' },
      { title: 'Asset protection', description: 'Server rooms, executive floors and proprietary workspaces need controlled access beyond badge systems.' }
    ],
    recommendedServices: ['unarmed-guard-services', 'concierge-front-desk', 'mobile-patrol'],
    deployment: [
      { title: 'Lobby coverage', description: 'Concierge-style officer at main entry during business hours. Visitor management and badge issuance.' },
      { title: 'Access control', description: 'Credential checks at elevator banks and restricted floors. After-hours patrol of parking and perimeter.' },
      { title: 'Executive protection', description: 'Dedicated officer for C-suite floors and boardroom events as needed.' }
    ],
    caseSnapshot: {
      title: 'Example engagement',
      metric: 'Unauthorized access incidents reduced by 62% in the first quarter',
      detail: '28-floor Class A office tower, downtown financial district. Three concierge officers covering lobby and parking, plus nightly mobile patrol.'
    }
  },
  {
    slug: 'retail-malls',
    name: 'Retail & Malls',
    tagline: 'Visible security that shoppers trust',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200&h=675&fit=crop',
    risks: [
      { title: 'Shoplifting and organized retail crime', description: 'Professional theft rings target high-value retailers. Visible deterrence and trained response reduce losses.' },
      { title: 'Customer and staff safety', description: 'Parking lot incidents, aggressive customers and medical emergencies require officers who stay calm under pressure.' },
      { title: 'After-hours vulnerability', description: 'Empty malls and loading docks attract break-ins, vandalism and trespassing overnight.' }
    ],
    recommendedServices: ['unarmed-guard-services', 'mobile-patrol'],
    deployment: [
      { title: 'Floor presence', description: 'Uniformed officers on rotation through common areas, food courts and anchor stores during operating hours.' },
      { title: 'Parking patrol', description: 'Mobile patrol of parking structures and surface lots, with escort service for staff and customers.' },
      { title: 'After-hours lockdown', description: 'Overnight posted officer at main entrance plus mobile patrol covering loading docks and exterior perimeter.' }
    ],
    caseSnapshot: {
      title: 'Example engagement',
      metric: 'Parking lot incidents dropped 45% within 90 days',
      detail: 'Regional shopping center with 120 stores. Four daytime officers, two overnight patrol units. Coordinated with local PD on repeat offenders.'
    }
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Security that respects patients and protects staff',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=675&fit=crop',
    risks: [
      { title: 'Emergency department violence', description: 'ED staff face verbal and physical aggression. Officers trained in healthcare de-escalation reduce incidents and improve staff retention.' },
      { title: 'Infant and patient elopement', description: 'Maternity wards, behavioral health and memory care units need access control that prevents unauthorized departures.' },
      { title: 'Pharmacy and controlled substance security', description: 'Drug diversion and pharmacy break-ins require both physical security and procedural controls.' }
    ],
    recommendedServices: ['unarmed-guard-services', 'concierge-front-desk'],
    deployment: [
      { title: 'ED coverage', description: 'Dedicated officer in the emergency department during peak hours. De-escalation first, restraint last.' },
      { title: 'Main entrance management', description: 'Visitor screening, wayfinding assistance and after-hours access control at main and secondary entries.' },
      { title: 'Patrol and response', description: 'Mobile officer covering parking, pharmacy corridors and behavioral health units. Rapid response to code calls.' }
    ],
    caseSnapshot: {
      title: 'Example engagement',
      metric: 'Staff-reported safety improved by 71% in annual survey',
      detail: '340-bed community hospital. Two ED officers, one lobby concierge, overnight mobile patrol. Officers completed MOAB certification.'
    }
  },
  {
    slug: 'education-campuses',
    name: 'Education Campuses',
    tagline: 'Safe campuses where learning comes first',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=675&fit=crop',
    risks: [
      { title: 'Open campus access', description: 'Universities and schools balance openness with security. Officers manage the boundary without creating a fortress atmosphere.' },
      { title: 'Event crowds', description: 'Games, graduations and concerts bring large crowds with varying levels of familiarity with campus layout.' },
      { title: 'After-hours activity', description: 'Labs, libraries and dormitories need coverage well beyond business hours.' }
    ],
    recommendedServices: ['unarmed-guard-services', 'mobile-patrol', 'event-security'],
    deployment: [
      { title: 'Campus patrol', description: 'Mobile and foot patrol covering academic buildings, dormitories and parking during all operating hours.' },
      { title: 'Event support', description: 'Dedicated teams for sporting events, concerts and commencement. Crowd management and emergency planning.' },
      { title: 'Night coverage', description: 'Overnight officers at residence halls and key buildings. Safe-walk escort program for students and staff.' }
    ],
    caseSnapshot: {
      title: 'Example engagement',
      metric: 'Night-time incident reports decreased 53% year-over-year',
      detail: 'Private university, 12,000 students. Four patrol officers per shift, plus event teams for 30+ annual events. Integrated with campus public safety.'
    }
  },
  {
    slug: 'residential-hoa',
    name: 'Residential & HOA',
    tagline: 'Communities that feel secure, day and night',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=675&fit=crop',
    risks: [
      { title: 'Unauthorized vehicle and pedestrian entry', description: 'Gate communities, condominiums and apartment complexes need controlled access without inconveniencing residents.' },
      { title: 'Package theft and vandalism', description: 'Common areas, mailrooms and parking lots are targets for opportunistic crime.' },
      { title: 'Resident disputes and noise complaints', description: 'Officers trained in community relations handle sensitive situations without escalation.' }
    ],
    recommendedServices: ['unarmed-guard-services', 'concierge-front-desk', 'mobile-patrol'],
    deployment: [
      { title: 'Gate and lobby', description: 'Posted officer managing vehicle and pedestrian entry. Visitor logging and delivery coordination.' },
      { title: 'Common area patrol', description: 'Regular rounds of pools, fitness centers, parking structures and package rooms.' },
      { title: 'Overnight presence', description: 'Mobile patrol or posted officer during late-night hours. Noise enforcement and emergency response.' }
    ],
    caseSnapshot: {
      title: 'Example engagement',
      metric: 'Property damage claims fell 38% over 6 months',
      detail: '420-unit luxury condominium. Two daytime concierge officers, one overnight gate officer, weekend mobile patrol. Monthly board briefings.'
    }
  },
  {
    slug: 'construction-industrial',
    name: 'Construction & Industrial',
    tagline: 'Protecting your site from groundbreaking to handover',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=675&fit=crop',
    risks: [
      { title: 'Equipment and material theft', description: 'Construction sites lose billions annually to theft. Night and weekend coverage deters organized and opportunistic theft.' },
      { title: 'Unauthorized site access', description: 'Trespassers face injury risks and create liability. Gate control and perimeter patrol keep sites secure.' },
      { title: 'Fire and safety hazards', description: 'Hot work, chemical storage and exposed structures need fire watch and safety-aware officers.' }
    ],
    recommendedServices: ['construction-site-security', 'mobile-patrol'],
    deployment: [
      { title: 'Gate control', description: 'Posted officer during work hours. Contractor credential checks, delivery logging and worker count tracking.' },
      { title: 'After-hours security', description: 'Overnight posted officer or mobile patrol covering equipment yards, material storage and perimeter fencing.' },
      { title: 'Fire watch', description: 'Certified fire watch officers during and after hot work, sprinkler shutdowns and as required by local codes.' }
    ],
    caseSnapshot: {
      title: 'Example engagement',
      metric: 'Zero theft incidents over a 14-month commercial build',
      detail: '$42M mixed-use development. Two gate officers day shift, one posted overnight, mobile patrol on weekends. Adjusted staffing through 4 build phases.'
    }
  }
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}
