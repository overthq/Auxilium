"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EmergencySchema = new mongoose_1.Schema({
    deviceId: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    description: {
        type: String
    },
    recepients: {
        type: [String],
        default: []
    }
}, { timestamps: true });
EmergencySchema.index({ location: '2dsphere' });
exports.default = mongoose_1.model('Emergency', EmergencySchema);
//# sourceMappingURL=Emergency.js.map