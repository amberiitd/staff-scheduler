"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateString = void 0;
function validateDateString(date) {
    return !isNaN(Date.parse(date));
}
exports.validateDateString = validateDateString;
