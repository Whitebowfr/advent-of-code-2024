"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map2D = void 0;
var vectors_1 = require("../vectors");
var Map2D = /** @class */ (function () {
    function Map2D(grid, size, delimiter) {
        if (delimiter === void 0) { delimiter = ""; }
        if (grid) {
            if (typeof grid === "string") {
                this.grid = grid.split("\n").map(function (x) { return x.split(delimiter); });
            }
            else {
                this.grid = grid;
            }
            if (typeof size === "undefined") {
                this.size = [this.grid[0].length, this.grid.length];
            }
            else {
                this.size = size;
            }
        }
        else {
            if (typeof size === "undefined") {
                throw Error("Size not defined on empty grid");
                return;
            }
            else {
                this.size = size;
            }
            var grid_1 = [];
            for (var index = 0; index < this.size[1]; index++) {
                var row = [];
                for (var index2 = 0; index2 < this.size[0]; index2++) {
                    row.push(0);
                }
                grid_1.push(row);
            }
            this.grid = grid_1;
        }
    }
    Map2D.prototype.getElement = function (coords, coordsY) {
        if (typeof coords === "number") {
            if (coordsY) {
                return this.grid[coordsY][coords];
            }
        }
        else {
            return this.grid[coords[1]][coords[0]];
        }
    };
    Map2D.prototype.getNextElement = function (coords, direction, distance) {
        distance = distance !== null && distance !== void 0 ? distance : 1;
        var newCoords = (0, vectors_1.updateCoords)(coords, direction, distance);
        if (!this.isInGrid(newCoords)) {
            throw new Error("New coordinates are outside of the grid");
        }
        return this.getElement((0, vectors_1.updateCoords)(coords, direction, distance));
    };
    Map2D.prototype.setElement = function (coords, value) {
        this.grid[coords[1]][coords[0]] = value;
    };
    Map2D.prototype.isInGrid = function (coords) {
        return !(coords[0] < 0 || coords[0] >= this.size[0] || coords[1] < 0 || coords[1] >= this.size[1]);
    };
    Map2D.prototype.fillGrid = function (value) {
        if (typeof value === "object" && value.length === this.size[1] && value[0].length === this.size[0]) {
            for (var index = 0; index < this.size[1]; index++) {
                var element = this.grid[index];
                for (var index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value[index][index2];
                }
            }
        }
        else {
            for (var index = 0; index < this.size[1]; index++) {
                var element = this.grid[index];
                for (var index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value;
                }
            }
        }
    };
    Map2D.prototype.getPossibleDirections = function (coords, lengthToSearch, getDiagonals) {
        lengthToSearch = lengthToSearch !== null && lengthToSearch !== void 0 ? lengthToSearch : 1;
        getDiagonals = getDiagonals !== null && getDiagonals !== void 0 ? getDiagonals : true;
        var availableDirections = [];
        for (var _i = 0, _a = Object.entries(vectors_1.DirectionMarker); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (this.isInGrid((0, vectors_1.updateCoords)(coords, value, lengthToSearch))) {
                availableDirections.push(value);
            }
        }
        if (getDiagonals) {
            for (var _c = 0, _d = Object.entries(vectors_1.DirectionalDirectionMarker); _c < _d.length; _c++) {
                var _e = _d[_c], key = _e[0], value = _e[1];
                if (this.isInGrid((0, vectors_1.updateCoords)(coords, value, lengthToSearch))) {
                    availableDirections.push(value);
                }
            }
        }
        return availableDirections;
    };
    return Map2D;
}());
exports.Map2D = Map2D;
