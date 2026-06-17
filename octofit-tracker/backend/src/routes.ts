import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/users/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('members').sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.post('/teams/', async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate('user').sort({ completedAt: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/activities/', async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user')
      .populate('team')
      .sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.post('/leaderboard/', async (req, res, next) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/workouts/', async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;