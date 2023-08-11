const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `Некорректный email - ${props.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: [2, 'Некорректные данные: Поле должно содержать не менее 2 символов'],
    maxlength: [30, 'Некорректные данные: Поле должно содержать не более 30 символов'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
