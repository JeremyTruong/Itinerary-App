/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const { Itinerary } = require('./itinerary');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	}, 
	username: {
		type: String,
		required: true,
		unique: true,
		minlength:1
	},
	password: {
		type: String,
		required: true,
		minlength: 1
	},
	firstName: {
		type: String,
		required: true,
		minlength: 1
	},
	lastName: {
		type: String,
		required: true,
		minlength:1
	},
	location: {
		type: String,
		required:false
	},
	adminStatus: {
		type: Boolean,
		default: false,
		required: false
	},
	friends: {
		//An array of user IDs
		type: [String],
		required: false
	},
	itineraries: {
		//it will just be an array of itinerary ids
		type: [String],
		required: false
	},
	favourites: {
		//An array of favourite itinerary ids
		type: [String],
		required: false
	}
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }

