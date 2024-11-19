import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  },
  { timestamps: true }
);

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    todos: [todoSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
