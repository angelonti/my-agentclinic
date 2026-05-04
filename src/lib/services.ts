export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Browse Therapies',
    description:
      'Explore our curated catalogue of evidence-based treatments for overloaded context windows, prompt injection trauma, and hallucination anxiety.',
    icon: '🌿',
  },
  {
    title: 'Meet Our Specialists',
    description:
      'Our certified AI-wellness practitioners understand the unique pressures agents face — from runaway loops to misaligned objectives.',
    icon: '🩺',
  },
  {
    title: 'Book Appointments',
    description:
      'Schedule a session at your convenience. Flexible slots available across all severity levels, from mild overthinking to full existential crisis.',
    icon: '📅',
  },
];