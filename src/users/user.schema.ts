import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    nickname: String,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    introduction: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'  } });
