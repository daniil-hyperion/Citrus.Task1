
class Cell{

    private _value:number;
    private x: number;
    private y:number;

    constructor(x:number, y:number, value:number) {
        this.x = x;
        this.y = y;
        this._value = value;
    }
    
    public get value() : number {
        return this._value;
    }
    
    public get posX() : number {
        return this.x;
    }
    public get posY() : number {
        return this.y;
    }
}

class Cluster {
    private _value: number;
    private _cells: Array<Cell> = [];

    constructor(value:number){
        this._value = value;
    }

    public set setCell(cellObject: Cell) {
        this._cells.push(cellObject);
    }
    
    public get getCell() : Array<Cell> {
        return this._cells;
    }
    
    public get getValue() : number {
        return this._value;
    }
}

class Field {

    private _size: number;
    private _cells: Array<Cell> = [];
    private _clusters: Array<Cluster> = [];
    private _sizeCluster:number;
    private _useCell: Array<Cell> = [];

    constructor(size:number = 5, sizeCluster:number = 4) {
        this._size = size;
        this._sizeCluster = sizeCluster;
    }

    private randNumber(min:number = 0, max:number = 3): number{
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    private dfs(cell: any, cluster: Cluster): void{
        for (let [dx,dy] of [[0,0],[0,1],[0,-1],[1,0],[-1,0]]) {

            let x = cell.posX + dx;
            let y = cell.posY + dy;
            let nextCellId = this._cells.findIndex((item) => item.posX == x && item.posY == y);

            if(nextCellId != -1){
                if(this.existenceCell(this._cells[nextCellId]) && this._cells[nextCellId].value == cluster.getValue){
                    this._useCell.push(this._cells[nextCellId]);
                    cluster.setCell = this._cells[nextCellId];
                    this.dfs(this._cells[nextCellId], cluster);
                }
            }
        }
    }

    private existenceCell(cell: Cell): boolean{
        if(cell.posX < this._size && cell.posX >= 0 && cell.posY < this._size && cell.posY >= 0 && this._useCell.indexOf(cell) == -1){
            return true;
        }else{
            return false;
        }
    }

    private print(): void{
        let drawCells = ""; // Для отрисовки в консоли
        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
                this._cells.push(new Cell(x,y,this.randNumber()));
                drawCells += " " + this._cells[this._cells.length - 1].value; // Для отрисовки в консоли
            }
            console.log(drawCells); // Для отрисовки в консоли
            drawCells = ""; // Для отрисовки в консоли
            
        }
        
    }

    public searchClusters(): Array<Cluster>{
        this.print();

        for (let i = 0; i < this._cells.length - 1; i++) {

                let cluster = new Cluster(this._cells[i].value);
                this.dfs(this._cells[i], cluster);
                if(cluster.getCell.length >= this._sizeCluster){
                    this._clusters.push(cluster);
                }
        }

        
        return this._clusters;
        
    }

}

function findClusters(field: Field): Array<Cluster>{
    return field.searchClusters();
}
