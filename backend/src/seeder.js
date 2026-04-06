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

    // Base Core Users
    const users = [
      { name: 'Admin Rajesh', email: 'admin@example.com', password: 'admin123', role: 'ADMIN', phone: '9876543210', gender: 'MALE', isActive: true },
      { name: 'Supriya Warden', email: 'staff@example.com', password: 'staff123', role: 'STAFF', phone: '9876543211', gender: 'FEMALE', isActive: true },
      { name: 'Arjun Sharma', email: 'student@example.com', password: 'student123', role: 'STUDENT', phone: '9876543212', gender: 'MALE', hostelId: hostels[0]._id, isActive: true },
      { name: 'Priya Patel', email: 'student2@example.com', password: 'student123', role: 'STUDENT', phone: '9876543213', gender: 'FEMALE', hostelId: hostels[1]._id, isActive: true },
    ];

    const firstNamesM = ['Aarav', 'Rohan', 'Vikram', 'Arjun', 'Karan', 'Rahul', 'Amit', 'Suresh', 'Ravi', 'Manish', 'Deepak', 'Nikhil', 'Siddharth', 'Vivek', 'Aditya'];
    const firstNamesF = ['Priya', 'Ananya', 'Divya', 'Pooja', 'Sneha', 'Kavya', 'Meera', 'Isha', 'Shreya', 'Nisha', 'Riya', 'Anjali', 'Swati', 'Neha', 'Komal'];
    const lastNames = ['Sharma', 'Patel', 'Singh', 'Verma', 'Gupta', 'Kumar', 'Joshi', 'Mehta', 'Shah', 'Yadav', 'Mishra', 'Chauhan', 'Tiwari', 'Pandey', 'Nair'];

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Generate 10 Staff Members
    for (let i = 0; i < 10; i++) {
      const isMale = Math.random() > 0.5;
      const fn = isMale ? getRandomElement(firstNamesM) : getRandomElement(firstNamesF);
      const ln = getRandomElement(lastNames);
      users.push({
        name: `${fn} ${ln}`,
        email: `staff${i+3}@example.com`,
        password: 'password123',
        role: 'STAFF',
        phone: `99988877${i.toString().padStart(2, '0')}`,
        gender: isMale ? 'MALE' : 'FEMALE',
        isActive: true
      });
    }

    // Generate 50 Students
    for (let i = 0; i < 50; i++) {
      const isMale = Math.random() > 0.5;
      const fn = isMale ? getRandomElement(firstNamesM) : getRandomElement(firstNamesF);
      const ln = getRandomElement(lastNames);
      users.push({
        name: `${fn} ${ln}`,
        email: `student_demo${i+1}@example.com`,
        password: 'password123',
        role: 'STUDENT',
        phone: `77788899${i.toString().padStart(2, '0')}`,
        gender: isMale ? 'MALE' : 'FEMALE',
        hostelId: isMale ? hostels[0]._id : hostels[1]._id,
        isActive: true
      });
    }

    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} Users (Admin, 11 Staff, 52 Students)`);

    // Assign Students to Rooms Dynamically
    const studentUsers = await User.find({ role: 'STUDENT' });
    let unassignedMale = studentUsers.filter(u => u.gender === 'MALE');
    let unassignedFemale = studentUsers.filter(u => u.gender === 'FEMALE');

    const rooms = await Room.find();
    let maleOccupancy = 0;
    let femaleOccupancy = 0;
    let paymentsToCreate = [];
    let complaintsToCreate = [];

    // Types of complaints
    const complaintTypes = ['MAINTENANCE', 'CLEANING', 'FOOD', 'SECURITY', 'OTHER'];

    for (let room of rooms) {
      if (room.status !== 'AVAILABLE') continue;
      
      const isBoysRoom = room.hostelId.toString() === hostels[0]._id.toString();
      let targetPool = isBoysRoom ? unassignedMale : unassignedFemale;
      
      while (room.occupancy < room.capacity && targetPool.length > 0) {
        const student = targetPool.pop();
        room.occupants.push(student._id);
        room.occupancy += 1;
        // status is auto-computed by pre-save hook

        if (isBoysRoom) maleOccupancy++;
        else femaleOccupancy++;

        // Add 1 random payment ledger per student
        paymentsToCreate.push({
           studentId: student._id,
           amount: 450,
           type: 'HOSTEL_FEE',
           status: Math.random() > 0.3 ? 'SUCCESS' : 'PENDING'
        });

        // 30% chance for student to have a complaint
        if (Math.random() > 0.7) {
           complaintsToCreate.push({
             studentId: student._id,
             title: `Issue in Room ${room.roomNumber}`,
             description: 'Reporting a generic issue for demo purposes in my room.',
             category: getRandomElement(complaintTypes),
             status: getRandomElement(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
             hostelId: room.hostelId,
           });
        }
      }
      await room.save();
    }

    // Update hostel occupancy
    hostels[0].currentOccupancy = maleOccupancy;
    hostels[1].currentOccupancy = femaleOccupancy;
    await hostels[0].save();
    await hostels[1].save();

    console.log(`Rooms Assinged - Boys Occupancy: ${maleOccupancy}, Girls Occupancy: ${femaleOccupancy}`);

    if (paymentsToCreate.length > 0) await Payment.insertMany(paymentsToCreate);
    if (complaintsToCreate.length > 0) await Complaint.insertMany(complaintsToCreate);
    
    console.log(`Created ${paymentsToCreate.length} Payments and ${complaintsToCreate.length} Complaints`);

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

connectDB().then(() => {
  if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
});