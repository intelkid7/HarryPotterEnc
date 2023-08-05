import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  house: {
    type: String,
  },
  bloodStatus: {
    type: String,
  },
  wand: {
    core: String,
    wood: String,
    length: Number
  },
  patronus: String,
  skills: [String],
  isAlive: {
    type: Boolean,
    default: true
  },
  description: String,
  imageUrl: String,
  imageFront:{
    data: Buffer,
    contentType: String
  },
  imageBack:{
    data: Buffer,
    contentType: String
  },
});

const characterModel = mongoose.model('characters', CharacterSchema);

export default characterModel;
