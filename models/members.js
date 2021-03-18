const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    telephone:  {
        type: String
    },
    address: {
        type: String
    }
}, {collection: 'members-collection'}
);

const model = mongoose.model('MemberModel', MemberSchema);

module.exports = model;