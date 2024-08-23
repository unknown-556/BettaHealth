import Admin from "../src/models/adminModel";
import connectDB from "../database";
import { createHash } from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

connectDB(process.env.MONGO_URL);

const seedAdmin = async () => {
  try {
    console.log('Starting admin seed process...');

    const adminData = {
      fullName: 'Admin User',
      email: 'frogman@example.com',
      password: 'super-frog',
      role: 'admin',
    };

    console.log('Admin data:', adminData);

    const hashedPassword = createHash('sha256').update(adminData.password).digest('base64');
    adminData.password = hashedPassword;

    const newAdmin = new Admin(adminData);

    await newAdmin.save();
    console.log('Admin created successfully');
  } catch (err) {
    console.error('Error during admin seeding:', err);
  } finally {
    console.log('Admin seeding process completed.');
    process.exit(0);
  }
};

seedAdmin();
