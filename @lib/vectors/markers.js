"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionalDirectionMarker = exports.DirectionMarker = void 0;
exports.updateCoords = updateCoords;
exports.getOppositeDirectionMarker = getOppositeDirectionMarker;
exports.getDirectionFromString = getDirectionFromString;
exports.getMarkerDifferences = getMarkerDifferences;
var DirectionMarker;
(function (DirectionMarker) {
    DirectionMarker["NORTH"] = "N";
    DirectionMarker["EAST"] = "E";
    DirectionMarker["SOUTH"] = "S";
    DirectionMarker["WEST"] = "W";
})(DirectionMarker || (exports.DirectionMarker = DirectionMarker = {}));
var DirectionalDirectionMarker;
(function (DirectionalDirectionMarker) {
    DirectionalDirectionMarker["NORTHWEST"] = "NW";
    DirectionalDirectionMarker["SOUTHWEST"] = "SW";
    DirectionalDirectionMarker["SOUTHEAST"] = "SE";
    DirectionalDirectionMarker["NORTHEAST"] = "NE";
})(DirectionalDirectionMarker || (exports.DirectionalDirectionMarker = DirectionalDirectionMarker = {}));
function updateCoords(coords, direction, distance) {
    distance = distance !== null && distance !== void 0 ? distance : 1;
    switch (direction) {
        case DirectionMarker.NORTH:
            return [coords[0], coords[1] - distance];
        case DirectionMarker.EAST:
            return [coords[0] + distance, coords[1]];
        case DirectionMarker.SOUTH:
            return [coords[0], coords[1] + distance];
        case DirectionMarker.WEST:
            return [coords[0] - distance, coords[1]];
        case DirectionalDirectionMarker.NORTHEAST:
            return [coords[0] + distance, coords[1] - distance];
        case DirectionalDirectionMarker.NORTHWEST:
            return [coords[0] - distance, coords[1] - distance];
        case DirectionalDirectionMarker.SOUTHEAST:
            return [coords[0] + distance, coords[1] + distance];
        case DirectionalDirectionMarker.SOUTHWEST:
            return [coords[0] - distance, coords[1] + distance];
    }
}
function getOppositeDirectionMarker(dir) {
    switch (dir) {
        case DirectionMarker.NORTH:
            return DirectionMarker.SOUTH;
        case DirectionMarker.EAST:
            return DirectionMarker.WEST;
        case DirectionMarker.SOUTH:
            return DirectionMarker.NORTH;
        case DirectionMarker.WEST:
            return DirectionMarker.EAST;
        case DirectionalDirectionMarker.NORTHEAST:
            return DirectionalDirectionMarker.SOUTHWEST;
        case DirectionalDirectionMarker.NORTHWEST:
            return DirectionalDirectionMarker.SOUTHEAST;
        case DirectionalDirectionMarker.SOUTHEAST:
            return DirectionalDirectionMarker.NORTHWEST;
        case DirectionalDirectionMarker.SOUTHWEST:
            return DirectionalDirectionMarker.NORTHEAST;
    }
}
function getDirectionFromString(str) {
    switch (str) {
        case "U":
            return DirectionMarker.NORTH;
        case "D":
            return DirectionMarker.SOUTH;
        case "L":
            return DirectionMarker.WEST;
        case "R":
            return DirectionMarker.EAST;
    }
}
function getMarkerDifferences(pointA, pointB) {
    var full = [];
    if (pointA[1] < pointB[1]) {
        while (pointA[1] !== pointB[1]) {
            full.push(DirectionMarker.NORTH);
            pointA = updateCoords(pointA, DirectionMarker.NORTH);
        }
    }
    else {
        while (pointA[1] !== pointB[1]) {
            full.push(DirectionMarker.SOUTH);
            pointA = updateCoords(pointA, DirectionMarker.SOUTH);
        }
    }
    if (pointA[0] < pointB[0]) {
        while (pointA[0] !== pointB[0]) {
            full.push(DirectionMarker.EAST);
            pointA = updateCoords(pointA, DirectionMarker.EAST);
        }
    }
    else {
        while (pointA[0] !== pointB[0]) {
            full.push(DirectionMarker.WEST);
            pointA = updateCoords(pointA, DirectionMarker.WEST);
        }
    }
    return full;
}
