import { model, Schema } from 'mongoose';

const resourceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    username: { type: String, trim: true },
    userId: { type: String, trim: true },
    teamId: { type: String, trim: true },
    type: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    points: { type: Number, min: 0 },
    score: { type: Number, min: 0 },
  },
  { timestamps: true, strict: false },
);

export const User = model('User', resourceSchema, 'users');
export const Team = model('Team', resourceSchema, 'teams');
export const Activity = model('Activity', resourceSchema, 'activities');
export const Leaderboard = model('Leaderboard', resourceSchema, 'leaderboard');
export const Workout = model('Workout', resourceSchema, 'workouts');
