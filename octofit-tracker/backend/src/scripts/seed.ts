import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Avery Johnson', email: 'avery.johnson@mergington.edu', role: 'student' },
    { name: 'Mia Chen', email: 'mia.chen@mergington.edu', role: 'student' },
    { name: 'Noah Patel', email: 'noah.patel@mergington.edu', role: 'student' },
    { name: 'Sophia Martinez', email: 'sophia.martinez@mergington.edu', role: 'student' },
    { name: 'Paul Octo', email: 'paul.octo@mergington.edu', role: 'coach' },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Cardio Crushers',
      mascot: 'Sprint Squid',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Strength Squad',
      mascot: 'Kettlebell Kraken',
      members: [users[2]._id, users[3]._id],
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 32,
      points: 84,
      completedAt: new Date('2026-06-10T15:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      durationMinutes: 45,
      points: 90,
      completedAt: new Date('2026-06-11T16:10:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Strength Training',
      durationMinutes: 40,
      points: 96,
      completedAt: new Date('2026-06-12T14:45:00Z'),
    },
    {
      user: users[3]._id,
      type: 'Walking',
      durationMinutes: 28,
      points: 56,
      completedAt: new Date('2026-06-13T13:20:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[2]._id, team: teams[1]._id, points: 310 },
    { user: users[1]._id, team: teams[0]._id, points: 285 },
    { user: users[0]._id, team: teams[0]._id, points: 260 },
    { user: users[3]._id, team: teams[1]._id, points: 225 },
  ]);

  await Workout.insertMany([
    {
      title: 'Starter Cardio Circuit',
      description: 'A low-impact mix of brisk walking, step-ups, and light jogging intervals.',
      difficulty: 'beginner',
      durationMinutes: 25,
    },
    {
      title: 'Core Stability Builder',
      description: 'Planks, dead bugs, and balance work to build control and posture.',
      difficulty: 'intermediate',
      durationMinutes: 30,
    },
    {
      title: 'Advanced Power Session',
      description: 'A fast-paced routine with sprints, jump squats, and weighted carries.',
      difficulty: 'advanced',
      durationMinutes: 40,
    },
  ]);

  console.log('OctoFit seed data inserted successfully');
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });