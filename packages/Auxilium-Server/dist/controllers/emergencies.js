"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmergency = function (req, res) {
    var _a = req.body, _b = _a.location, longitude = _b.longitude, latitude = _b.latitude, user = _a.user;
    try {
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error has occured. Please try again later.'
        });
    }
};
