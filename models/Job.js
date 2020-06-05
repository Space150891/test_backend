import { Schema, model } from 'mongoose';

const schema = new Schema({
  id: String,
  title: String,
  skills: { type: [{ type: String }] },
  budget: Number,
  workload: String,
  deleted: { type: Boolean, default: false }
});

export const JobModel = model('Job', schema);
