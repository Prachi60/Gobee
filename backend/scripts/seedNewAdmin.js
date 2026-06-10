import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../app/models/admin.js';

dotenv.config();

async function seedNewAdmin(name, email, password) {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in env variables');
    }
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.name = name;
      admin.password = password;
      await admin.save();
      console.log(`Updated Admin successfully: ${email}`);
    } else {
      await Admin.create({ name, email, password, role: 'admin', isVerified: true });
      console.log(`Created New Admin successfully: ${email}`);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding new admin:', error);
    process.exit(1);
  }
}

// Default new admin credentials
const name = 'Gobee Admin';
const email = 'gobeeadmin@gmail.com';
const password = 'Admin!@#123';

seedNewAdmin(name, email, password);
