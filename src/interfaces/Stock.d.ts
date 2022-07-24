export interface StockInterface {
    red:{
        stock_red:number | 0;
        xs:number | 0;
        s:number | 0;
        m:number | 0;
        l:number | 0;
        xl:number | 0;
        xxl:number | 0;
    },
    yellow:{
        stock_yellow:number | 0;
        xs:number | 0;
        s:number | 0;
        m:number | 0;
        l:number | 0;
        xl:number | 0;
        xxl:number | 0;
    },
    all:number | 0;
}


export interface StockMapped{
    _id:string;
    name:string;
    stock:StockInterface
}