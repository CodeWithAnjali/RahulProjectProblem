const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shareId: { type: mongoose.Schema.Types.ObjectId, ref: 'Share' },
  quantity: Number,
});

module.exports = mongoose.model('Holding', holdingSchema);
