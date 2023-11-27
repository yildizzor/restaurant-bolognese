const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name and Surname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,

        "Password should consist of at least 1 lower, 1 upper, 1 digit, 1 any character and min 6 characters.",
      ],
    },
    imageUrl: {
      type: String,
    },

    address: String,

    city: String,

    zipCode: {
      type: String,
      match: /^\d{4}[A-Z]{2}$/,
    },

    phoneNr: {
      type: Number,
      match: /^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const properties = ["name", "address", "city"];
  for (element of properties) {
    const words = this[element].split(" "); // This is a middelware for database. It makes name and surname with uppercase for database.
    this[element] = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  next();
});

const User = model("User", userSchema);

module.exports = User;
