const mongoose = require('mongoose');
const Room = require('./room.model');
const Hostel = require('../hostels/hostel.model');
const User = require('../users/user.model');
const AppError = require('../../core/utils/AppError');

/**
 * Executes a Greedy First-Come-First-Serve (FCFS) Allocation Algorithm
 * Constraints: Gender matching between Student and Hostel type.
 * Time Complexity (Avg): O(N * M) where N = unallocated students, M = available rooms.
 */
exports.autoAllocateRooms = async () => {
  // Using Mongoose session for atomicity to prevent race conditions during bulk updates
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Fetch unallocated students sorted by oldest application first (FCFS)
    const unallocatedStudents = await User.find({
      role: 'STUDENT',
      hostelId: { $exists: false } // or null depending on schema specifics, we can also check null explicitly if needed.
    }).sort({ createdAt: 1 }).session(session);

    if (!unallocatedStudents.length) {
      await session.abortTransaction();
      session.endSession();
      return { success: true, allocatedCount: 0, message: 'No unallocated students found.' };
    }

    // 2. We'll load the available rooms grouped by Girls/Boys/Coed Hostels into memory cache to reduce DB hits
    const hostels = await Hostel.find({ isActive: true }).session(session);
    
    // Create maps for quick matching logic: type -> array of hostel IDs
    const boysHostels = hostels.filter(h => h.type === 'BOYS').map(h => h._id);
    const girlsHostels = hostels.filter(h => h.type === 'GIRLS').map(h => h._id);
    const coedHostels = hostels.filter(h => h.type === 'COED').map(h => h._id);

    // Fetch all available rooms
    const availableRooms = await Room.find({ status: 'AVAILABLE' }).session(session);
    
    let allocatedCount = 0;
    const updates = {
      users: [],
      rooms: []
    };

    // 3. Greedy Allocation Loop
    for (const student of unallocatedStudents) {
      let candidateRooms = [];
      
      // Filter rooms based on Gender Constraint matching Hostel Type
      if (student.gender === 'MALE') {
        candidateRooms = availableRooms.filter(r => 
           boysHostels.some(id => id.equals(r.hostelId)) || coedHostels.some(id => id.equals(r.hostelId))
        );
      } else if (student.gender === 'FEMALE') {
        candidateRooms = availableRooms.filter(r => 
           girlsHostels.some(id => id.equals(r.hostelId)) || coedHostels.some(id => id.equals(r.hostelId))
        );
      }

      // Find the first room that has capacity
      const targetRoom = candidateRooms.find(r => r.occupancy < r.capacity);

      if (targetRoom) {
        // Mark student and room for update
        student.hostelId = targetRoom.hostelId;
        
        targetRoom.occupancy += 1;
        targetRoom.occupants.push(student._id);
        
        if (targetRoom.occupancy >= targetRoom.capacity) {
          targetRoom.status = 'FULL';
        }

        updates.users.push(student);
        // We mutate the targetRoom in our array reference, so we just track it if it isn't tracked yet
        if (!updates.rooms.includes(targetRoom)) {
          updates.rooms.push(targetRoom);
        }

        allocatedCount++;
      }
    }

    // 4. Bulk Save Changes Contextually within Transaction
    for (const user of updates.users) {
      // Exclude password from validation triggers just in case
      await user.save({ session, validateModifiedOnly: true });
    }

    for (const room of updates.rooms) {
      await room.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return { 
      success: true, 
      allocatedCount, 
      totalPending: unallocatedStudents.length - allocatedCount,
      message: `Successfully allocated ${allocatedCount} students based on FCFS algorithm.` 
    };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(`Auto-allocation failed: ${error.message}`, 500);
  }
};
