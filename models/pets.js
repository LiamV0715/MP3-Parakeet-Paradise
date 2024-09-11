const mongoose = require('mongoose')
const { Schema } = mongoose

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: { type: String, default: 'https://images.unsplash.com/photo-1560553174-28b8e2f73bc1?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  weight: { type: Number, default: 0 }, // Changed to Number
  age: { type: String, default: 'Age not found' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

petSchema.methods.showEstablished = function () {
  return `${this.name} is ${this.age} years old and weighs a whopping ${this.weight} lbs!`
}

module.exports = mongoose.model('Pet', petSchema)
