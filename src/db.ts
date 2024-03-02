export type Speaker = {
  id: string;
  name: string;
  email: string;
  bio: string;
}

export type Workshop = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  speakerId: string;
}

const speakers: Speaker[] = [
  {
    id: 'd3b3b3e3-4e3e-4e3e-9e3e-3b3e3b3e3b3e',
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    bio: 'I am a software developer'
  },
  {
    id: 'd3b3b3e3-4e3e-4e3e-9e3e-3b3e3b3e3b3f',
    name: 'John Doe',
    email: 'john.dow@email.com',
    bio: 'I am a software developer'
  }
];

const workshops: Workshop[] = [
  {
    id: 'd3b3b3e3-4e3e-4e3e-9e3e-3b3e3b3e3b3e',
    title: 'Introduction to Fastify',
    description: 'Learn the basics of Fastify',
    startTime: new Date('2021-10-10T10:00:00Z'),
    endTime: new Date('2021-10-10T12:00:00Z'),
    speakerId: 'd3b3b3e3-4e3e-4e3e-9e3e-3b3e3b3e3b3e'
  },
  {
    id: 'd3b3b3e3-4e3e-4e3e-9e3e-3b3e3b3e3b3f',
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    startTime: new Date('2021-10-10T14:00:00Z'),
    endTime: new Date('2021-10-10T16:00:00Z'),
    speakerId: 'd3b3b3e3-4e3e-4e3e-9e3e-3b3e3b3e3b3f'
  }
];

export default {
  speakers,
  workshops
}