const Room=require('../../models/room/room.model')

// GET /rooms – List all available rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rooms', error: err.message });
  }
};

// POST /rooms – Add new room (Admin only)
const addRoom = async (req, res) => {
  try {
    const { number, type, price, isAvailable } = req.body;

    const existing = await Room.findOne({ number });
    if (existing) return res.status(400).json({ message: 'Room number already exists' });

    const room = new Room({ number, type, price, isAvailable });
    await room.save();

    res.status(201).json({ message: 'Room added successfully', room });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add room', error: err.message });
  }
};

// PUT /rooms/:id – Update room info (Admin only)
const updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Room not found' });

    res.status(200).json({ message: 'Room updated', room: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update room', error: err.message });
  }
};

// DELETE /rooms/:id – Delete room (Admin only)
const deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Room not found' });

    res.status(200).json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete room', error: err.message });
  }
};

module.exports={getAllRooms,addRoom,updateRoom,deleteRoom}