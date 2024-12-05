"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEuclidianDistance = getEuclidianDistance;
exports.getManhattanDistance = getManhattanDistance;
function getEuclidianDistance(pointA, pointB) {
    return Math.sqrt(Math.pow((pointB[0] - pointA[0]), 2) + Math.pow((pointB[1] - pointA[1]), 2));
}
function getManhattanDistance(pointA, pointB) {
    return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
}
