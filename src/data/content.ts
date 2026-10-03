export interface Person {
  name: string;
  role: string;
  image: string;
  bio: string;
  shortBio: string;
}

export const leadership: Person[] = [
  {
    name: 'Marcus Okafor',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    shortBio: '22 years in private security. Former regional director for a national firm. Built Northgate from a 12-officer team.',
    bio: 'Marcus founded Northgate Protective Services 14 years ago after spending eight years as a regional director for a national security firm. He saw an industry that treated officers as replaceable and clients as interchangeable. Northgate was built on the opposite idea: that security works when the people providing it are trained, paid fairly and held accountable. Under his leadership, the company has grown to over 420 officers across six service lines while maintaining an officer retention rate well above the industry average.'
  },
  {
    name: 'Elena Vasquez',
    role: 'Director of Operations',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    shortBio: '15 years in operations management. Oversees scheduling, dispatch and quality assurance for all client sites.',
    bio: 'Elena joined Northgate in its third year and has built the operational systems that allow the company to staff hundreds of posts reliably every week. She oversees dispatch, scheduling, quality assurance and the supervisor team. Before Northgate, she managed logistics for a Fortune 500 distribution network. She brings the same precision to security staffing: every post is covered, every shift is documented and every exception is escalated within 30 minutes.'
  },
  {
    name: 'Priya Raman',
    role: 'Director of Training',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    shortBio: 'Designed Northgate\'s 40-hour initial training program. Former law enforcement training instructor.',
    bio: 'Priya developed Northgate\'s training curriculum from scratch, drawing on her background as a law enforcement training instructor and her advanced degree in organizational psychology. Every new officer completes 40 hours of training covering de-escalation, emergency response, customer service and site-specific procedures. She also runs quarterly refresher programs and supervises the field training officer program that pairs new hires with experienced mentors for their first 30 days.'
  },
  {
    name: 'Daniel Whitaker',
    role: 'Director of Client Relations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    shortBio: 'Primary contact for key accounts. 10 years in B2B client management across security and facilities.',
    bio: 'Daniel is the first voice most prospective clients hear and the ongoing relationship manager for Northgate\'s key accounts. With a decade of experience in B2B service management across security and commercial facilities, he understands that every client has different priorities — some care most about cost, others about response time, others about officer appearance and professionalism. His job is to listen, translate needs into a service plan and make sure the plan is followed.'
  }
];

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'We switched to Northgate after years of inconsistent coverage from a national firm. Within the first month, our tenants noticed the difference. Officers know the building, greet people by name and handle incidents without drama.',
    name: 'Sarah Mitchell',
    title: 'Property Manager',
    company: 'Meridian Tower (28-floor office building)'
  },
  {
    quote: 'Our emergency department needed officers who could de-escalate without making patients feel like they were in a police station. Northgate\'s training program produced exactly that. Staff retention in the ED has improved since they arrived.',
    name: 'Dr. James Harlow',
    title: 'Facilities Director',
    company: 'Riverside Community Hospital'
  },
  {
    quote: 'For campus safety, we needed a partner who understood that students are not threats — they are the people we are protecting. Northgate\'s officers integrate into our community instead of standing apart from it.',
    name: 'Angela Torres',
    title: 'Campus Safety Director',
    company: 'Pacific Ridge University'
  }
];

export interface Role {
  id: string;
  title: string;
  pay: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
}

export const roles: Role[] = [
  {
    id: 'security-officer',
    title: 'Security Officer',
    pay: '$21–24/hr',
    type: 'Full-time / Part-time',
    location: 'Multiple locations',
    description: 'Posted security officers serve as the visible, professional presence at client sites. You will manage access control, conduct patrols, respond to incidents and maintain detailed activity logs.',
    requirements: [
      'Valid state security license (or willingness to obtain)',
      'Clean background check',
      'Reliable transportation',
      'Strong communication and de-escalation skills',
      'Ability to stand and walk for extended periods',
      'Professional appearance and demeanor'
    ]
  },
  {
    id: 'patrol-officer',
    title: 'Patrol Officer',
    pay: '$23–26/hr',
    type: 'Full-time',
    location: 'Metro area',
    description: 'Mobile patrol officers cover multiple client sites per shift, conducting scheduled and random patrols, responding to alarms and documenting conditions at each checkpoint.',
    requirements: [
      'Valid state security license',
      'Clean driving record and valid driver\'s license',
      'Minimum 1 year security or law enforcement experience',
      'Comfort with GPS reporting and mobile technology',
      'Ability to work overnight and weekend shifts',
      'Strong written reporting skills'
    ]
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    pay: '$64–72k/year',
    type: 'Full-time',
    location: 'Downtown / Midtown',
    description: 'Site supervisors manage teams of 4–12 officers at major client locations. You will handle scheduling, training, client communication, incident management and quality assurance.',
    requirements: [
      'Valid state security license',
      'Minimum 3 years security experience with 1 year in a supervisory role',
      'Experience writing and updating post orders',
      'Strong leadership and conflict resolution skills',
      'Proficiency with scheduling and reporting software',
      'Availability for on-call rotation'
    ]
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher',
    pay: '$22–25/hr',
    type: 'Full-time',
    location: 'Operations center',
    description: 'Dispatchers are the communication hub connecting officers, clients and supervisors. You will monitor radio and phone channels, coordinate responses, manage scheduling changes and maintain real-time situational awareness.',
    requirements: [
      'Experience in dispatch, call center or operations coordination',
      'Ability to multitask under pressure',
      'Clear, professional communication skills',
      'Familiarity with radio protocols',
      'Computer proficiency and fast, accurate typing',
      'Availability for rotating shifts including nights and weekends'
    ]
  }
];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'offices' | 'campuses' | 'events' | 'training';
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', alt: 'Security officer at a modern office lobby front desk', caption: 'Concierge security at a Class A office tower', category: 'offices', width: 800, height: 600 },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', alt: 'Tall glass office building viewed from below against a clear sky', caption: 'Corporate campus perimeter coverage', category: 'offices', width: 800, height: 600 },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop', alt: 'Modern office building entrance with glass doors', caption: 'Access control at building main entry', category: 'offices', width: 800, height: 600 },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop', alt: 'University campus with green lawns and walkways', caption: 'Campus patrol route along academic buildings', category: 'campuses', width: 800, height: 600 },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&h=600&fit=crop', alt: 'College campus at dusk with illuminated pathways', caption: 'Evening patrol coverage on a university campus', category: 'campuses', width: 800, height: 600 },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=600&fit=crop', alt: 'Modern campus building with students walking', caption: 'Daytime presence near student facilities', category: 'campuses', width: 800, height: 600 },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', alt: 'Large conference event with stage lighting', caption: 'Event security team at a corporate conference', category: 'events', width: 800, height: 600 },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop', alt: 'Outdoor evening event with string lights', caption: 'Outdoor event perimeter management', category: 'events', width: 800, height: 600 },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop', alt: 'Crowd at a large indoor venue event', caption: 'Crowd management at a gala event', category: 'events', width: 800, height: 600 },
  { id: 'g10', src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop', alt: 'Professional training session in a modern classroom', caption: 'Officer training: conflict de-escalation module', category: 'training', width: 800, height: 600 },
  { id: 'g11', src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop', alt: 'Instructor leading a group training exercise', caption: 'New officer orientation and field training', category: 'training', width: 800, height: 600 },
  { id: 'g12', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', alt: 'Team meeting in a modern office environment', caption: 'Supervisor training and leadership development', category: 'training', width: 800, height: 600 },
];

export const galleryCategories = [
  { value: 'all', label: 'All' },
  { value: 'offices', label: 'Offices' },
  { value: 'campuses', label: 'Campuses' },
  { value: 'events', label: 'Events' },
  { value: 'training', label: 'Training' },
] as const;

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  poster: string;
  description: string;
}

export const videos: VideoItem[] = [
  { id: 'v1', title: 'Company Overview', duration: '1:42', poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop', description: 'Meet Northgate Protective Services: our approach to professional security.' },
  { id: 'v2', title: 'A Day on Patrol', duration: '2:10', poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop', description: 'Follow a patrol officer through a typical night shift across multiple sites.' },
  { id: 'v3', title: 'Officer Training', duration: '1:25', poster: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop', description: 'Inside our 40-hour training program: de-escalation, emergency response and professionalism.' },
];

export interface CoveragePost {
  location: string;
  area: string;
  shift: string;
  status: string;
}

export const coveragePosts: CoveragePost[] = [
  { location: 'Harbor Point Tower', area: 'Lobby', shift: 'Day shift', status: 'On post' },
  { location: 'Eastfield Medical Pavilion', area: 'Main entrance', shift: 'Night shift', status: 'On post' },
  { location: 'Riverside Commons', area: 'Patrol', shift: 'Mobile', status: 'Patrol' },
  { location: 'Summit Ridge Construction', area: 'Gate', shift: '24/7', status: 'On post' },
];

export const trustStats = [
  { label: 'State licence No.', value: '0041-2279', isNumber: false },
  { label: 'General liability', value: '$5M', isNumber: false },
  { label: 'Years in operation', value: 14, isNumber: true },
  { label: 'Officers on staff', value: 420, isNumber: true },
];

export const processSteps = [
  { number: 1, title: 'Walk the site together', description: 'We visit your property, identify vulnerabilities and understand your operations before writing a single post order.' },
  { number: 2, title: 'Write the post orders', description: 'Detailed instructions for every shift, every position and every scenario — reviewed and approved by your team.' },
  { number: 3, title: 'Deploy vetted officers', description: 'Background-checked, trained officers matched to your site. You approve every assignment.' },
  { number: 4, title: 'Review monthly', description: 'Incident reports, performance metrics and a face-to-face check-in. We adjust before problems grow.' },
];

export const companyValues = [
  { number: '01', title: 'Accountability starts with us', description: 'Every officer carries our name. Every shift is logged. Every incident is reported. We do not hide behind layers of management or vague promises.' },
  { number: '02', title: 'Training is not optional', description: 'Forty hours before the first post. Quarterly refreshers after that. Our officers know how to de-escalate, respond and communicate — because we teach them.' },
  { number: '03', title: 'Your site, your rules', description: 'We do not impose a one-size-fits-all program. Post orders are written for your property, reviewed by your team and updated when your needs change.' },
];
