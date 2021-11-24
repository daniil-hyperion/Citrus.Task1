"use strict";
class Cell {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this._value = value;
    }
    get value() {
        return this._value;
    }
    get posX() {
        return this.x;
    }
    get posY() {
        return this.y;
    }
}
class Cluster {
    constructor(value) {
        this._cells = [];
        this._value = value;
    }
    set setCell(cellObject) {
        this._cells.push(cellObject);
    }
    get getCell() {
        return this._cells;
    }
    get getValue() {
        return this._value;
    }
}
class Field {
    constructor(size = 5, sizeCluster = 4) {
        this._cells = [];
        this._clusters = [];
        this._useCell = [];
        this._size = size;
        this._sizeCluster = sizeCluster;
    }
    randNumber(min = 0, max = 3) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
    dfs(cell, cluster) {
        for (let [dx, dy] of [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0]]) {
            let x = cell.posX + dx;
            let y = cell.posY + dy;
            let nextCellId = this._cells.findIndex((item) => item.posX == x && item.posY == y);
            if (nextCellId != -1) {
                if (this.existenceCell(this._cells[nextCellId]) && this._cells[nextCellId].value == cluster.getValue) {
                    this._useCell.push(this._cells[nextCellId]);
                    cluster.setCell = this._cells[nextCellId];
                    this.dfs(this._cells[nextCellId], cluster);
                }
            }
        }
    }
    existenceCell(cell) {
        if (cell.posX < this._size && cell.posX >= 0 && cell.posY < this._size && cell.posY >= 0 && this._useCell.indexOf(cell) == -1) {
            return true;
        }
        else {
            return false;
        }
    }
    print() {
        let drawCells = ""; // Для отрисовки в консоли
        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
                this._cells.push(new Cell(x, y, this.randNumber()));
                drawCells += " " + this._cells[this._cells.length - 1].value; // Для отрисовки в консоли
            }
            console.log(drawCells); // Для отрисовки в консоли
            drawCells = ""; // Для отрисовки в консоли
        }
    }
    searchClusters() {
        this.print();

        for (let i = 0; i < this._cells.length - 1; i++) {
            let cluster = new Cluster(this._cells[i].value);
            this.dfs(this._cells[i], cluster);
            if (cluster.getCell.length >= this._sizeCluster) {
                this._clusters.push(cluster);
            }
        }

        return this._clusters;
    }
}
function findClusters(field) {
    return field.searchClusters();
}
