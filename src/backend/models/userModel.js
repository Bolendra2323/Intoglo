const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    pic: {
        type: String,
        //required: true,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-photo%2Fastronaut-martian-is-mission-red-planet-climbs-up-mountain-rock-space-man-conquers-populates-new-planet-mars-planet-mars-people-concept-welcome-new-home_19592074.htm&psig=AOvVaw23XopP38jnzam3PY-J_Nmh&ust=1669883855026000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIjB76LA1fsCFQAAAAAdAAAAABAE",
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;