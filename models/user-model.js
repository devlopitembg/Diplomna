module.exports = function (mongoose) {
    //User Schema
    const UserSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
    })

    return mongoose.model('User', UserSchema);
}