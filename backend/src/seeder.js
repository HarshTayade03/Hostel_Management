const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./modules/users/user.model');
const Hostel = require('./modules/hostels/hostel.model');
const Room = require('./modules/rooms/room.model');
const Complaint = require('./modules/complaints/complaint.model');
const Payment = require('./modules/payments/payment.model');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Hostel.deleteMany();
    await Room.deleteMany();
    await Complaint.deleteMany();
    await Payment.deleteMany();

    // Create Hostels
    const hostels = await Hostel.insertMany([
      {
        name: 'Boys Hostel A',
        type: 'BOYS',
        totalCapacity: 100,
        currentOccupancy: 0,
      },
      {
        name: 'Girls Hostel B',
        type: 'GIRLS',
        totalCapacity: 80,
        currentOccupancy: 0,
      },
    ]);

    console.log('Hostels created');

    // Create Rooms for Boys Hostel
    const boysRooms = [];
    for (let floor = 1; floor <= 5; floor++) {
      for (let room = 1; room <= 10; room++) {
        boysRooms.push({
          roomNumber: `${floor}0${room}`,
          hostelId: hostels[0]._id,
          floor: floor,
          capacity: 2,
          occupancy: 0,
          status: 'AVAILABLE',
        });
      }
    }

    // Create Rooms for Girls Hostel
    const girlsRooms = [];
    for (let floor = 1; floor <= 4; floor++) {
      for (let room = 1; room <= 10; room++) {
        girlsRooms.push({
          roomNumber: `${floor}0${room}`,
          hostelId: hostels[1]._id,
          floor: floor,
          capacity: 2,
          occupancy: 0,
          status: 'AVAILABLE',
        });
      }
    }

    await Room.insertMany([...boysRooms, ...girlsRooms]);
    console.log('Rooms created');

    // Create Users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN',
        phone: '1234567890',
        gender: 'MALE',
        isActive: true,
      },
      {
        name: 'Staff User',
        email: 'staff@example.com',
        password: 'staff123',
        role: 'STAFF',
        phone: '1234567891',
        gender: 'FEMALE',
        isActive: true,
      },
      {
        name: 'John Doe',
        email: 'student@example.com',
        password: 'student123',
        role: 'STUDENT',
        phone: '1234567892',
        gender: 'MALE',
        hostelId: hostels[0]._id,
        isActive: true,
      },
      {
        name: 'Jane Smith',
        email: 'student2@example.com',
        password: 'student123',
        role: 'STUDENT',
        phone: '1234567893',
        gender: 'FEMALE',
        hostelId: hostels[1]._id,
        isActive: true,
      },
    ];

    await User.create(users);
    console.log('Users created');

    // Assign some students to rooms
    const student1 = await User.findOne({ email: 'student@example.com' });
    const student2 = await User.findOne({ email: 'student2@example.com' });

    const room1 = await Room.findOne({ hostelId: hostels[0]._id, roomNumber: '101' });
    const room2 = await Room.findOne({ hostelId: hostels[1]._id, roomNumber: '101' });

    room1.occupants.push(student1._id);
    room1.occupancy = 1;
    await room1.save();

    room2.occupants.push(student2._id);
    room2.occupancy = 1;
    await room2.save();

    // Update hostel occupancy
    hostels[0].currentOccupancy = 1;
    hostels[1].currentOccupancy = 1;
    await hostels[0].save();
    await hostels[1].save();

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Hostel.deleteMany();
    await Room.deleteMany();
    await Complaint.deleteMany();
    await Payment.deleteMany();

    console.log('Data destroyed');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}