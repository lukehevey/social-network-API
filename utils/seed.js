const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

    // Delete the collections if they exist
    await User .deleteMany();
    await Thought .deleteMany();

  const thoughtData = await Thought.insertMany(thoughts);

  let index = 0;

  for (const user of users) {
    user.thoughts = [thoughtData[index]._id]
    await User.create(user)
    index++
  };

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
