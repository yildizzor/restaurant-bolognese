const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: true,
      match: [
        /^[A-Za-z\d]{6,10}$/,
        "Username should consist of min 6 max 10 characters",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,10}$/,
        "Password should consist of at least 1 lower, 1 upper, 1 digit, 1 any character and min 6 max 10 characters.",
      ],
    },

    name: {
      type: String,
      required: true,
    },

    location: {
      address: String,
      city: String,
    },
    countryCode: {
      type: String,
      match: /^[A-Z]{6}$/,
    },

    phoneNr: {
      type: Number,
      match: /^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const words = this.name.split(" "); // This is a middelware for database. It makes name and surname with uppercase for database.
  this.name = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  next();
});

const User = model("User", userSchema);

module.exports = User;
