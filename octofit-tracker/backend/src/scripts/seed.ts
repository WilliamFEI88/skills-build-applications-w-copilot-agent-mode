import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/resources.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { name: 'Ada Lovelace', username: 'ada', email: 'ada@example.com', teamId: 'trailblazers' },
      { name: 'Grace Hopper', username: 'grace', email: 'grace@example.com', teamId: 'trailblazers' },
      { name: 'Katherine Johnson', username: 'katherine', email: 'katherine@example.com', teamId: 'orbit-runners' },
      { name: 'Alan Turing', username: 'alan', email: 'alan@example.com', teamId: 'orbit-runners' },
    ]);

    await Team.insertMany([
      {
        name: 'Trailblazers',
        slug: 'trailblazers',
        description: 'A steady team focused on building consistent fitness habits.',
        memberUsernames: ['ada', 'grace'],
      },
      {
        name: 'Orbit Runners',
        slug: 'orbit-runners',
        description: 'A high-energy team training for distance and endurance.',
        memberUsernames: ['katherine', 'alan'],
      },
    ]);

    await Activity.insertMany([
      { name: 'Morning run', username: 'ada', type: 'running', duration: 35, points: 70, date: '2026-09-05' },
      { name: 'Strength circuit', username: 'grace', type: 'strength', duration: 45, points: 90, date: '2026-09-05' },
      { name: 'Interval training', username: 'katherine', type: 'running', duration: 40, points: 100, date: '2026-09-06' },
      { name: 'Recovery ride', username: 'alan', type: 'cycling', duration: 50, points: 80, date: '2026-09-06' },
    ]);

    await Leaderboard.insertMany([
      { name: 'Katherine Johnson', username: 'katherine', teamId: 'orbit-runners', points: 560, score: 560, rank: 1 },
      { name: 'Grace Hopper', username: 'grace', teamId: 'trailblazers', points: 510, score: 510, rank: 2 },
      { name: 'Ada Lovelace', username: 'ada', teamId: 'trailblazers', points: 470, score: 470, rank: 3 },
      { name: 'Alan Turing', username: 'alan', teamId: 'orbit-runners', points: 430, score: 430, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        name: 'Full-body foundation',
        type: 'strength',
        description: 'A beginner-friendly circuit for the major muscle groups.',
        duration: 30,
        difficulty: 'beginner',
      },
      {
        name: 'Tempo run',
        type: 'running',
        description: 'A sustained effort to improve running speed and endurance.',
        duration: 35,
        difficulty: 'intermediate',
      },
      {
        name: 'Mobility reset',
        type: 'mobility',
        description: 'Gentle mobility work for recovery after a demanding session.',
        duration: 20,
        difficulty: 'beginner',
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
