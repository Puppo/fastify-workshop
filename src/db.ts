export type Speaker = {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export type Workshop = {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  speakerId: number;
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    bio: 'I am a software developer'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.dow@email.com',
    bio: 'I am a software developer'
  }
];

const workshops: Workshop[] = [
  {
    id: 1,
    title: 'Introduction to Fastify',
    description: 'Learn the basics of Fastify',
    startTime: new Date('2021-10-10T10:00:00Z'),
    endTime: new Date('2021-10-10T12:00:00Z'),
    speakerId: 1
  },
  {
    id: 2,
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    startTime: new Date('2021-10-10T14:00:00Z'),
    endTime: new Date('2021-10-10T16:00:00Z'),
    speakerId: 2
  }
];

export default {
  speakers,
  workshops
}