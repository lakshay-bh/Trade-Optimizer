import mysql from 'mysql'
import express from 'express'
import dotenv from 'dotenv';    

dotenv.config() 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const router = express.Router();

router.post('/addTrader',(req,res)=>{
    console.log("Add Trader request"+ req.body.companyGST);

    db.query(
        "Insert into `traders`(`companyGST`,`name`,`email`,`phoneNo`,`gstNo`,`addressStreet`,`addressCity`,`addressState`,`pinCode`) values(?,?,?,?,?,?,?,?,?)",
        [req.body.companyGST,req.body.name,req.body.email,req.body.phoneNo,req.body.gstNo,req.body.addressStreet,req.body.addressCity,req.body.addressState,req.body.pinCode],
        (err,result)=>{
            if(err){
                res.send("error");
            }else{
                res.send("Created");
            }
        }
    );

    
});

router.post('/deleteTrader',(req,res)=>{
    console.log("Remove Trader request"+ req.body.companyGST);

    db.query(
        // "delete from `traders`where `companyGST`=? and`gstNo`=?",
        "update `traders` set `enabled`=0 where id=?",
        [req.body.traderID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Done");
            }
        }
    );

    
});

router.post('/getTraders',(req,res)=>{
    console.log("Get Trader request"+ req.body.companyGST);

    db.query(
        "select * from `traders`where `companyGST`=? and enabled=1",
        [req.body.companyGST],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );

    
});

router.post('/addItem',(req,res)=>{
    console.log("Request to add item for a trader ",req.body.companyGST,req.body.traderID,req.body.itemID);
    db.query(
        "Insert into `traderItems`(`traderID`,`itemID`) values(?,?)",
        [req.body.traderID,req.body.itemID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Added");
            }
        }
    );
})

router.post('/getItems',(req,res)=>{
    console.log("Get Trader Items request", req.body.companyGST, req.body.traderID);

    db.query(
        "select * from `items` where `companyGST`=? and enabled=1 and `id` = any (select `itemID` from `traderItems` where `traderID`=?) order by itemName",
        [req.body.companyGST,req.body.traderID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );

    
});

router.post('/getOtherItems',(req,res)=>{
    console.log("Get Other than Trader Items request", req.body.companyGST, req.body.traderID);

    db.query(
        "select * from `items` where `companyGST`=? and enabled=1 and `id` <> all (select `itemID` from `traderItems` where `traderID`=?) order by itemName",
        [req.body.companyGST,req.body.traderID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );

    
});

router.post('/deleteItem',(req,res)=>{
    console.log("Request to delete item for a trader ",req.body.companyGST,req.body.traderID,req.body.itemID);
    
    db.query(
        "delete from `traderItems` where itemID=? and traderID=?",
        [req.body.itemID,req.body.traderID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Item deleted");
            }
        }
    );

});

router.post('/updateRelationScore',(req,res)=>{
    console.log("Request to update Relation score of a trader ",req.body.companyGST,req.body.traderID);
    
    // selling price-cost price modulus 1000 i.e 1000 rs profit = 1 point (selling)
    // cost price modulus 500 i.e 500 rs spent to buy something = 1 point (buying)

    db.query(
        "update `traders` set `relationScore`=(select abs(ifnull(round(sum(totalCostPrice)/1000,0),0)) as relationScore from `orders` where `buy_sell`=2 and `traderID`=?)+(select abs(ifnull(round(sum(totalSellingPrice-totalCostPrice)/500,0),0)) as relationScore1 from `orders` where `buy_sell`=1 and `traderID`=?) where `id`=?",
        [req.body.traderID,req.body.traderID,req.body.traderID],
        (err,result)=>{
            if(err){
                console.log(err.sqlMessage)
                res.send(err);
            }else{
                res.send("Updated");
            }
        }
    );

});

router.post('/getTopTraders',(req,res)=>{
    console.log("Request to fetch top traders according to relation score",req.body.companyGST);
    
    // selling price-cost price modulus 1000 i.e 1000 rs profit = 1 point (selling)
    // cost price modulus 500 i.e 500 rs spent to buy something = 1 point (buying)

    db.query(
        "select * from traders where companyGST=? and relationScore > 0 order by relationScore desc limit 3 ",
        [req.body.companyGST],
        (err,result)=>{
            if(err){
                console.log(err.sqlMessage)
                res.send("error");
            }else{
                res.send(result);
            }
        }
    );

});


export default router;