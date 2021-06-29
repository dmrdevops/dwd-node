
//Exercise tracker
const Users = require('./models/exercise-tracker/user');
const ExerciseLogs = require('./models/exercise-tracker/exerciselog');

router.get('/exercise-tracker/users', (req, res, next) => {
  Users.find({}, (err, data) => {
    res.json(data)
  })
})

router.post('/exercise-tracker/users', (req, res, next) => {
  const user = new Users(req.body);
  user.save((err, user) => {
    if (err) {
      if(err.code == 11000) {
        //uniqueness error (no custom message)
        return next({
          status: 400,
          message: 'Username already taken'
        })
      } else {
        return next(err)
      }
    }

    res.json({
      username: user.username,
      _id: user._id
    })
  })
})

router.post('/exercise-tracker/users/:_id/exercises', (req, res, next) => {
  const userId = req.url.split('/')[3];

  Users.findById(userId, (err, user) => {
    if (err) return next(err);
    if(!user) {
      return next({
        status: 400,
        message: 'Unknown UserId'
      })
    }

    const exercise = new ExerciseLogs({ ...req.body, userId });
    exercise.username = user.username
    console.log(exercise.username)
    console.log(user.username)
    exercise.save((err, savedExercise) => {
      if(err) return next(err)
      savedExercise = savedExercise.toObject();
      // append exercise values to 
      // cloned user object and return
      const userObjWithExercises = { 
        ...user.toObject(), 
        date: (new Date(savedExercise.date)).toDateString(),
        duration: savedExercise.duration,
        description: savedExercise.description
      };

      delete userObjWithExercises.__v;

      res.json(userObjWithExercises)
    });
  })
})

router.get('/exercise-tracker/users/:_id/logs', (req, res, next) => {
  const userId = req.url.split('/')[3];
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);

  Users.findById(userId, (err, user) => {
    if (err) return next(err);
    if(!user) {
      return next({
        status: 400,
        message: 'Unknown UserId'
      });
    }
      ExerciseLogs.find({
        userId: userId,
        date: {
          $lte: to != 'Invalid Date' ? to.toISOString() : Date.now(),
          $gte: from != 'Invalid Date' ? from.toISOString() : 0
        }
      }, {
        __v: 0,
        _id: 0
      })
      .sort('-date')
      .limit(parseInt(req.query.limit))
      .exec((err, exercises) => {
        if (err) return next(err);
        const out = {
          _id: userId,
          username: user.username,
          from : from != 'Invalid Date' ? from.toDateString() : undefined,
          to : to != 'Invalid Date' ? to.toDateString(): undefined,
          count: exercises.length,
          log: exercises.map(e => ({
            description : e.description,
            duration : e.duration,
            date: e.date.toDateString()
          }))
        }
    res.json(out)
    })
  })
})


module.exports = router