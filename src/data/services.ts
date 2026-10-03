export interface Service {
  slug: string;
  name: string;
  tagline: string;
  outcome: string;
  useCases: string[];
  category: 'staffed' | 'patrol' | 'events' | 'specialized';
  image: string;
  heroImage: string;
  included: string[];
  shiftSteps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  relatedIndustries: string[];
}

export const services: Service[] = [
  {
    slug: 'unarmed-guard-services',
    name: 'Unarmed Guard Services',
    tagline: 'Trained presence, visible deterrence',
    outcome: 'A professional officer on post, every shift, with clear instructions and a direct line to your account manager.',
    useCases: ['Office lobbies', 'Retail entrances', 'Residential communities', 'Hospital reception areas'],
    category: 'staffed',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=675&fit=crop',
    included: [
      'Licensed, background-checked officers',
      'Custom post orders written with your team',
      'Daily activity reports delivered by 8 AM',
      'Uniformed, professional appearance standards',
      'Direct supervisor contact for every shift',
      'Monthly performance reviews'
    ],
    shiftSteps: [
      { title: 'Briefing', description: 'Officer reviews post orders, checks equipment and confirms communication with dispatch.' },
      { title: 'On post', description: 'Patrols, access control, incident response and visitor management per your site plan.' },
      { title: 'Handoff', description: 'Activity log submitted, next officer briefed, any open items escalated to your account manager.' }
    ],
    faq: [
      { question: 'What training do your officers complete?', answer: 'Every officer completes 40 hours of initial training covering conflict de-escalation, emergency response, access control procedures, and client-specific post orders. Annual refresher training is mandatory.' },
      { question: 'Can we request specific officers?', answer: 'Yes. Once you have officers you trust, we prioritize assigning them to your site consistently. You can also request replacements at any time.' },
      { question: 'What happens if an officer calls in sick?', answer: 'Our dispatch team fills vacancies from a trained reserve pool. Your post is never left uncovered, and we notify you of any substitution within 30 minutes.' },
      { question: 'How quickly can you start?', answer: 'Standard deployments begin within 5–7 business days. Emergency staffing can start within 24 hours depending on your location and requirements.' }
    ],
    relatedIndustries: ['corporate-offices', 'healthcare', 'residential-hoa']
  },
  {
    slug: 'armed-guard-services',
    name: 'Armed Guard Services',
    tagline: 'Higher-risk sites, higher-trained officers',
    outcome: 'Certified armed officers for sites where the threat profile demands visible, credentialed security.',
    useCases: ['Financial institutions', 'Government facilities', 'High-value warehouses', 'Executive protection'],
    category: 'specialized',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&h=675&fit=crop',
    included: [
      'State-certified armed officers',
      'Quarterly firearms qualification',
      'Advanced de-escalation training',
      'Site-specific threat assessment',
      'Liability coverage and compliance documentation',
      'Supervisory check-ins every shift'
    ],
    shiftSteps: [
      { title: 'Pre-deployment', description: 'Site threat assessment, custom response protocols, officer selection and client approval.' },
      { title: 'Active duty', description: 'Armed presence with strict rules of engagement, continuous communication with dispatch and client management.' },
      { title: 'Review', description: 'Incident documentation, de-brief with site supervisor, compliance log filed.' }
    ],
    faq: [
      { question: 'What certifications do armed officers hold?', answer: 'All armed officers hold current state firearms permits, complete quarterly qualification shoots, and maintain advanced certifications in use-of-force decision-making.' },
      { question: 'Is armed security appropriate for our site?', answer: 'We conduct a free threat assessment to determine whether armed security is warranted. Many sites are better served by unarmed officers with strong protocols.' },
      { question: 'What is your liability coverage?', answer: 'We carry $5M general liability and separate armed-services coverage. Full documentation is provided before any deployment begins.' },
      { question: 'How do you select armed officers?', answer: 'Armed officers have a minimum of 3 years experience, pass enhanced background checks, psychological screening, and must demonstrate consistent judgment under pressure.' }
    ],
    relatedIndustries: ['corporate-offices', 'construction-industrial']
  },
  {
    slug: 'mobile-patrol',
    name: 'Mobile Patrol',
    tagline: 'Visible coverage across multiple locations',
    outcome: 'Scheduled and random patrols that cover more ground than a fixed post, with GPS-verified reporting.',
    useCases: ['Multi-building campuses', 'Parking structures', 'After-hours office parks', 'Construction perimeters'],
    category: 'patrol',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=675&fit=crop',
    included: [
      'Marked patrol vehicles with GPS tracking',
      'Randomized and scheduled patrol routes',
      'Checkpoint verification at every stop',
      'Real-time incident reporting',
      'Photo documentation of findings',
      'Monthly route optimization reviews'
    ],
    shiftSteps: [
      { title: 'Route planning', description: 'Patrol routes designed around your vulnerabilities — entry points, blind spots and high-value areas.' },
      { title: 'Patrol execution', description: 'Officers complete checkpoint scans, document conditions and respond to alarms or anomalies.' },
      { title: 'Reporting', description: 'GPS-verified patrol reports delivered with timestamps, photos and any incident details.' }
    ],
    faq: [
      { question: 'How often will patrols visit our site?', answer: 'Patrol frequency is customized to your needs. Most clients choose between 2 and 6 visits per night, with a mix of scheduled and random timing to prevent predictability.' },
      { question: 'Can patrol officers respond to alarms?', answer: 'Yes. Mobile patrol officers can serve as your alarm response team, arriving within a defined response window to investigate and secure the premises.' },
      { question: 'How do we know patrols actually happened?', answer: 'Every patrol is GPS-verified with checkpoint scans, time-stamped photos and a digital report you can review online the next morning.' },
      { question: 'Is mobile patrol more cost-effective than a standing guard?', answer: 'For many sites, especially after-hours coverage of multiple locations, mobile patrol provides broader coverage at a lower cost than full-time posted officers.' }
    ],
    relatedIndustries: ['retail-malls', 'corporate-offices', 'construction-industrial']
  },
  {
    slug: 'event-security',
    name: 'Event Security',
    tagline: 'Safe events, smooth operations',
    outcome: 'Crowd management, access control and emergency planning for events of any size, delivered by experienced teams.',
    useCases: ['Corporate events', 'Concerts and festivals', 'Private functions', 'Sporting events'],
    category: 'events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=675&fit=crop',
    included: [
      'Pre-event site survey and risk assessment',
      'Crowd management and flow planning',
      'Access control with credential verification',
      'Emergency evacuation planning',
      'Uniformed and plainclothes options',
      'Post-event incident summary'
    ],
    shiftSteps: [
      { title: 'Planning', description: 'Site walkthrough, crowd flow analysis, emergency routes mapped and communication plan established.' },
      { title: 'Event day', description: 'Officers positioned at entries, stages and perimeters. Command post monitors all channels.' },
      { title: 'Wrap-up', description: 'Venue secured, lost-and-found processed, incident log delivered within 24 hours.' }
    ],
    faq: [
      { question: 'How far in advance should we book?', answer: 'We recommend 2–4 weeks for standard events and 6–8 weeks for large venues. We can accommodate shorter timelines depending on availability.' },
      { question: 'Do you provide both uniformed and plainclothes officers?', answer: 'Yes. Most events use a combination — uniformed officers at entry points for visible deterrence and plainclothes officers inside the venue for discreet monitoring.' },
      { question: 'Can you handle alcohol-serving events?', answer: 'Absolutely. Our officers are trained in responsible service protocols and can work with your venue to manage alcohol-related risks.' },
      { question: 'What size events do you cover?', answer: 'From private corporate dinners of 50 to outdoor festivals of 10,000+. We scale our team and planning to match the event profile.' }
    ],
    relatedIndustries: ['corporate-offices', 'education-campuses']
  },
  {
    slug: 'construction-site-security',
    name: 'Construction Site Security',
    tagline: 'Protect materials, equipment and workers',
    outcome: 'Around-the-clock site protection that prevents theft, vandalism and unauthorized access from groundbreaking to handover.',
    useCases: ['Commercial construction', 'Residential developments', 'Infrastructure projects', 'Renovation sites'],
    category: 'specialized',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=675&fit=crop',
    included: [
      'Gate access control and contractor logging',
      'After-hours patrol and surveillance',
      'Equipment and material theft prevention',
      'OSHA-compliant officer training',
      'Fire watch capability',
      'Progress-based staffing adjustments'
    ],
    shiftSteps: [
      { title: 'Site assessment', description: 'Walk the site with your project manager. Identify vulnerable areas, valuable equipment zones and access points.' },
      { title: 'Deployment', description: 'Officers manage gate access during work hours and conduct patrols after hours. Credential checks for all personnel.' },
      { title: 'Adaptation', description: 'As the build progresses, we adjust coverage — more officers during deliveries, fewer during finishing phases.' }
    ],
    faq: [
      { question: 'Can officers perform fire watch?', answer: 'Yes. Our officers are trained in fire watch procedures and can fill the role during hot work, after sprinkler shutdowns or as required by local fire codes.' },
      { question: 'How do you handle contractor access?', answer: 'We maintain a daily access log, verify credentials against your approved contractor list and issue temporary badges as needed.' },
      { question: 'What about overnight coverage?', answer: 'Most construction sites need after-hours coverage when expensive equipment is left on site. We provide overnight posted officers, mobile patrols or a combination.' },
      { question: 'Do you adjust staffing as the project progresses?', answer: 'Yes. We review staffing monthly with your project team and scale up or down based on the current phase, equipment on site and any incidents.' }
    ],
    relatedIndustries: ['construction-industrial']
  },
  {
    slug: 'concierge-front-desk',
    name: 'Concierge & Front-Desk Security',
    tagline: 'Security with a service mindset',
    outcome: 'Officers trained in both security protocols and hospitality, providing a professional first impression while managing building access.',
    useCases: ['Class A office buildings', 'Luxury residential', 'Medical centers', 'Coworking spaces'],
    category: 'staffed',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop',
    included: [
      'Hospitality-trained security officers',
      'Visitor management and badge issuance',
      'Package handling and delivery coordination',
      'Emergency response coordination',
      'Tenant and resident relations',
      'Front desk operations support'
    ],
    shiftSteps: [
      { title: 'Opening', description: 'Officer arrives early, reviews the daily schedule, checks building systems and prepares the front desk.' },
      { title: 'Operations', description: 'Manages visitor check-in, package deliveries, tenant requests and any security incidents with equal professionalism.' },
      { title: 'Closing', description: 'End-of-day building sweep, lock-up procedures, incident log and handoff to overnight security if applicable.' }
    ],
    faq: [
      { question: 'How is concierge security different from standard guard services?', answer: 'Concierge officers receive additional training in hospitality, communication and building operations. They represent your building to visitors and tenants while maintaining full security capabilities.' },
      { question: 'Can concierge officers handle package deliveries?', answer: 'Yes. Officers can receive, log and secure packages, notify recipients and coordinate delivery-window access for tenants.' },
      { question: 'What about after-hours coverage?', answer: 'Concierge coverage typically runs during business hours. For after-hours security, we pair it with our unarmed guard or mobile patrol services.' },
      { question: 'Will officers learn our building systems?', answer: 'Absolutely. Officers receive site-specific training on your access control systems, fire panels, elevator operations and emergency procedures.' }
    ],
    relatedIndustries: ['corporate-offices', 'residential-hoa', 'healthcare']
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'all') return services;
  return services.filter(s => s.category === category);
}

export const serviceCategories = [
  { value: 'all', label: 'All' },
  { value: 'staffed', label: 'Staffed posts' },
  { value: 'patrol', label: 'Patrol' },
  { value: 'events', label: 'Events' },
  { value: 'specialized', label: 'Specialized' },
] as const;
