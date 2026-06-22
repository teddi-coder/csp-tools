export interface CreativeCopy {
  formats: string[];
  primary?: string;
  headline: string;
  description?: string;
  cta?: string;
  lp?: string;
}

export const copy: Record<string, CreativeCopy> = {
  'notes-app': {
    formats: ['Trending static', 'Cold/warm', 'AS1/AS2/AS3', 'Meta'],
    primary: 'The online safety and AI literacy unit you keep meaning to build? It already exists. F to 8, ready to teach.',
    headline: 'Stop building it from scratch',
    description: 'Mapped to the curriculum',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'imessage-staffroom': {
    formats: ['Trending static', 'Cold', 'AS1/AS2', 'Meta'],
    primary: 'The staffrooms that have digital citizenship sorted are mostly using the same thing. Free trial inside.',
    headline: 'What other schools already use',
    description: 'eSafety endorsed, F to 8',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'reddit-thread': {
    formats: ['Trending static', 'Cold', 'AS2', 'Meta'],
    primary: 'Teaching AI literacy F to 8 without losing your weekends. Here’s what other teachers actually use.',
    headline: 'AI literacy and online safety, sorted',
    description: 'Built by educators',
    cta: 'Sign up',
    lp: '/cyber-safe-curriculum/',
  },
  'whiteboard-comparison': {
    formats: ['Trending static', 'Consideration', 'AS2/AS3 + LI', 'Meta + LinkedIn'],
    primary: 'DIY online safety, or a curriculum that’s already mapped F to 8. One of these costs you every weekend.',
    headline: 'Term planning, minus the weekends',
    description: 'Free trial for schools',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'google-search': {
    formats: ['Trending static', 'Cold', 'AS1/AS2', 'Meta'],
    primary: 'Turns out the thing you keep googling already exists. Ready-to-teach online safety, F to 8.',
    headline: 'The answer you keep searching for',
    description: 'Free trial',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'email-inbox': {
    formats: ['Trending static', 'Consideration', 'AS3 + LI', 'Meta + LinkedIn'],
    primary: 'The email from leadership you don’t want. The curriculum that answers it before they ask.',
    headline: 'Covered before they ask',
    description: 'Mapped F to 8',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'notification-stack': {
    formats: ['Trending static', 'Warm/retarget', 'AS3', 'Meta'],
    primary: 'Term starts Monday. Your online safety lessons can already be done.',
    headline: 'Term-ready in minutes',
    description: 'Free trial',
    cta: 'Sign up',
    lp: '/cyber-safe-curriculum/',
  },
  'open-letter': {
    formats: ['Paper static', 'Consideration', 'LI + AS2', 'LinkedIn + Meta'],
    primary: 'An open letter to every teacher who’s built online safety lessons from scratch.',
    headline: 'You were never meant to DIY this',
    description: 'From educators',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'sticky-notes': {
    formats: ['Trending static', 'Cold', 'AS1/AS2', 'Meta'],
    primary: 'Five reasons schools stopped making online safety lessons themselves.',
    headline: 'Why schools switched',
    description: 'F to 8, mapped',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'whatsapp-group': {
    formats: ['Trending static', 'Cold', 'AS2', 'Meta'],
    primary: 'Ask any staffroom what they use for digital citizenship. Free trial inside.',
    headline: 'What the staffroom uses',
    description: 'F to 8, mapped',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'carousel-c1': {
    formats: ['Carousel (5)', 'Consideration', 'AS2/AS3', 'Meta'],
    primary: 'Everything you need to teach online safety and AI literacy, F to 8. Done, mapped, ready.',
    headline: 'Your whole term, sorted',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'carousel-c2': {
    formats: ['Carousel (5)', 'Warm', 'AS3 + LI', 'Meta + LinkedIn'],
    primary: 'Real schools, real results. Here’s what changed when they embedded Cyber Safe Classroom.',
    headline: 'What other schools saw',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
  'carousel-c3': {
    formats: ['Carousel (5)', 'Cold/consideration', 'AS1/AS2', 'Meta'],
    primary: 'DIY online safety, or a curriculum already mapped F to 8. One of these costs you every weekend.',
    headline: 'Term planning, minus the weekends',
    cta: 'Learn more',
    lp: '/cyber-safe-curriculum/',
  },
};
