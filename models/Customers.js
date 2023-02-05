const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 200
    },
    last_name: {
        type: String,
        default: "",
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        maxlength: 18
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    }
},{timestamps: true});

// Hash the plain text password before saving the customer to the database
CustomerSchema.pre("save", function(next) {
    const customer = this;
    if (!customer.isModified("password")) {
        return next();
    }

    bcrypt.hash(customer.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        customer.password = hash;
        next();
    });
});

module.exports = mongoose.model("Customer", CustomerSchema);
