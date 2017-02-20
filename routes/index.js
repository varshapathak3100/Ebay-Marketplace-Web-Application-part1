var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs'); 
var app = express();
var passwordHash = require('password-hash');
//var passwordHash = require('./lib/password-hash');

var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
};

console.error = console.log;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'register_user'
});

/******* Create table for user details *******/
connection.query("IF EXISTS (SELECT * WHERE TABLE_NAME" +
		" = N'user_information')",function (err, result) {
	  if (err){
		  /*Create table*/
		  connection.query("CREATE TABLE user_information(" +
					" user_id int NOT NULL AUTO_INCREMENT," +
					" first_name varchar(255)," +
					" last_name varchar(255), " +
					"email varchar(255)" +
					",password varchar(255)," +
					"birth_date varchar(255)," +
					"phone_number varchar(255)," +
					"home_address varchar(255)," +
					"items_cart varchar(255)," +
					"items_to_sell varchar(255)," +
					"items_bought varchar(255)," +
					"PRIMARY KEY(user_id))",  function (err, result) {
					  if (err){
						  console.log("Table exists " + " for User Details");
					  }
					  else{ 
						  console.log("Table created " + " for User Details");
					 }
		  });
	 }
	  else{ 
			  console.log("Table exists " + " for User Details");
	  }
});
	
/******* Create table for item details *******/
connection.query("IF EXISTS (SELECT * WHERE TABLE_NAME" +
		" = N'item_details')",function (err, result) {
	  if (err){

		  /*Create table*/
		connection.query("CREATE TABLE item_details(" +
				" item_id int NOT NULL AUTO_INCREMENT," +
				" item_name varchar(255)," +
				" item_desc varchar(255), " +
				"seller_info varchar(255)" +
				",item_price varchar(255)," +
				"item_quantity varchar(255),"+
				"item_category varchar(255),"+
				"PRIMARY KEY(item_id))",  function (err, result) {
				  if (err){
					  console.log("Table exists " + " for Item Details");
				  }
				  else{ 
					  console.log("Table created " + " for Item Details");
				 }
		  });
	  }
	  else{ 
		  console.log("Table exists " + " for Item Details");

	}
});
		                    


/******** For every user to hold cart items **********/
router.post('/addingtousercart', function(req, res, next){

var user_name = req.body.name;
var item_id = req.body.item;
var item_quantity = req.body.quant;
	
connection.query("IF EXISTS (SELECT * WHERE TABLE_NAME = " + user_name+")" ,function (err, result) {
	  if (err){
		  /*Create table*/
		connection.query("CREATE TABLE " + user_name+ "(id int NOT NULL AUTO_INCREMENT, " +
				" item_id int ," +
				" item_name varchar(255)," +
				" item_desc varchar(255), " +
				"seller_info varchar(255)," +
				"item_price varchar(255)," +
				"item_quantity varchar(255),"+
				"item_category varchar(255),"+
				"PRIMARY KEY(id))",  function (err, result) {
				  if (err){
					  console.log("Table exists " + " for user "+ user_name);
				  }
				  else{ 
					  console.log("Table created " + " for user "+ user_name);
				 }
		  });
	  }
	  else{ 
		  console.log("Table exists " + " for user "+ user_name);
	}
});
	  var cart_det ={
			  item_id:req.body.item,
			  item_quantity:req.body.quant
	  };
	  
	 var querya= connection.query("SELECT * FROM item_details WHERE item_id=?",[item_id], function(err, rows){
		  console.log(querya.sql);
//		  console.log("muuuuuuuuu" + rows);
		  if(err){
			  console.log("Displaying Error");
			  console.error(err);
		  }
		  else{
			  var query2 = connection.query('INSERT INTO '+ user_name +" SET ?  ", rows, function(err, result) {
				  if(err){
					  console.error(err);
				  }
				  console.error(result);
					var queryb = connection.query("UPDATE "+ user_name +" SET ? where item_id =?",[cart_det,item_id] ,function(err, rows){
						if(err){
							  console.error(err);
						  }
						  else{
							  console.log("Successfully updated quantity");
						  }
					  	});
			  	});
		  }
	  	});	
	  
});

/******** For Display item to other users **********/
router.post('/get_items', function(req, res, next){
  var category = req.body;
  console.log("Before selection verification");
  
  
//fetching the data from the sql server 
//  function fetchData(callback,sqlQuery){    
//	  console.log("\nSQL Query::"+sqlQuery);    
//	  connection.query("SELECT * FROM item_details", function(err, rows, fields) {   
//		  if(err){    
//			  console.log("ERROR: " + err.message);   
//			  }   
//		  else    
//		  {
//			  // return err or result    
//			  console.log("DB Results:"+rows);    
//			  callback(err, rows);   
//			  res.send(rows);
//			  }  
//		  });
//		  }
//  }
  
  
  	connection.query("SELECT * FROM item_details", function(err, rows){
	  if (err){           
		  console.log("Get item error");
	  }
	  else{
		  var i = 0;
		  console.log("Post selection verification " + rows[0].item_name);
//		  var itemDetails = rows[10].item_name;
//		  for(i=0;i<10;i++){
//			  var itemDetails ={
//						name:rows.item_name,
//						desc:rows.item_desc,
//						sellerInfo:rows.seller_info,
//						price:rows.item_price,
//						quantity:rows.item_quantity
//				  };
		  res.send(rows);
		  console.log(rows);
//		  }
	  }
  });
});

/******** For Registration **********/
router.post('/reg_user', function(req, res, next){
//connection.connect();
  var cope = req.body;
  var f=req.body.email;
  var p=req.body.password;
  var hash1 = {
		  password : passwordHash.generate(p)
  };
  
  
  
  
  connection.query("SELECT * FROM user_information WHERE email = ?",[f], function(err, rows){
	  if (err){           
		  console.log("error");
	  }
	  else if (!rows.length) {    
//		 console.log("no user found");
//		 res.send("username not entered");
		  var query = connection.query('INSERT INTO user_information SET ?', cope, function(err, result) {
			  console.log(query.sql);
//			  connection.end();
			 
			  if(err){
				  console.error(err);
//				  res.send(err);
			  }
			  else{
				  var nequery = connection.query('UPDATE user_information SET ? where email =?'
						  ,[hash1,f], function(err, result) {
							  console.log(nequery.sql);
				  console.error(result);
				  res.send("successful");
				  });
				  console.log("s");
			  }
		  	});	  
		  }
	  else{
		 console.log("User already exists");
		 res.send("exists");
	  }
  });
});

/******** For Sign In **********/
router.post('/signin_user', function(req, res, next){
	  var e = req.body.email;
	  var p = req.body.pwd;
	  console.log(e + "Varsha" + p);
	  connection.query("SELECT * FROM user_information WHERE email = ?",[e], function(err, rows){
		  if (err){           
			  console.log("error");
		  }
		  else if (!rows.length) {    
			 console.log("no user found");
			 res.send("not exist");
		 }
		  else{
			  var hash2 =  passwordHash.generate(p);
			  var hash1 = rows[0].password;
			  console.log(hash1);
			  console.log(hash2);
			  console.log(passwordHash.verify(p, hash2));
			  if (!hash2.localeCompare(hash1)) {
					 console.log("Password invalid");
					 res.send("not exit");
			  }
			  else{
				  console.log("user exists");	
					 res.send("successful");

			  }
		  }
	  });
	});

/******** For records derivation form user name **********/
router.post('/usernameDetails', function(req, res, next){
	 var user_name = req.body.name;
	 console.log("njds"+user_name);
	  var querya = connection.query("SELECT * FROM user_information WHERE email=?",[user_name], function(err, rows){
		  console.log(querya.sql);
		  console.log("muuuuuuuuu" + rows);
		  if(err){
			  console.log("Displaying Error");
			  console.error(err);
		  }
		  else{
			  res.send(rows);
		  }
	  	});	
});


/******** For records update with user name **********/
router.post('/updateUserDetails', function(req, res, next){
	 var user_name = req.body.name;
//	 console.log("njds"+user_name);
	 var detailss  = {
		 first_name : req.body.fn,
			 last_name : req.body.ln,
			 birth_date : req.body.bd,
			 phone_number : req.body.pn,
			  home_address : req.body.ha
			 };

//	  var queryb = connection.query("UPDATE user_information SET " +
//	  		"first_name ="+ req.body.fn+
//	  		", last_name="+req.body.ln+
//	  		", birth_date="+req.body.bd+
//	  		", phone_number="+req.body.pn+
//	  		", home_address="+req.body.ha+
//	  		" WHERE email = ?",req.body.name
	var queryb = connection.query("UPDATE user_information SET ? where email =?",[detailss,user_name] ,function(err, rows){
		  console.log(queryb.sql);
		  console.log("muuuuuuuuu" + rows);
		  if(err){
			  console.log("Displaying Error");
			  console.error(err);
		  }
		  else{
			  res.send("Successfully updated");
		  }
	  	});
});


/******** For Fixed Price Data Storing **********/
router.post('/fix_price', function(req, res, next){
	 var details = req.body;
	  var query1 = connection.query('INSERT INTO item_details SET ?', details, function(err, result) {
		  console.log(query1.sql);
		  res.send("successful");
		  if(err){
			  console.error(err);
		  }
		  console.error(result);
	  	});	
});

/******** For Shopping Cart items display **********/
router.post('/addtocart', function(req, res, next){
	 var item_id = Number(req.body.id);
	  var queryp = connection.query("SELECT * FROM item_details where item_id ="+ item_id, function(err, rows){
		  console.log(queryp.sql);
		  if(err){
			  console.log("Displaying Error");
//			  console.error(err);
		  }
		  else{
			  res.send(rows);
		  }
	  	});	
});

/******** For Shopping Cart items >> Quantity << **********/
router.post('/addtocart_quant', function(req, res, next){
	 var itemID = req.body.id;
	 var user_name = req.body.name;
	  var query4 = connection.query("SELECT * FROM "+ user_name +"  WHERE item_id = ?",[itemID], function(err, rows){
		  console.log(query4.sql);
		  if(err){
			  console.log("Displaying Error");
//			  console.error(err);
		  }
		  else{
//			  res.send(rows[0].item_quantity);
			  res.send(rows[0].item_quantity);
//			  console.error(rows[0].item_quantity + "Harippa");
		  }
	  	});	
});

/******** For Shopping Cart items >> Price << **********/
router.post('/addtocart_price', function(req, res, next){
	 var itemID = Number(req.body.id);
	  var query4 = connection.query("SELECT * FROM item_details WHERE item_id ="+ itemID, function(err, rows){
		  console.log(query4.sql);
		  if(err){
			  console.log("Displaying Error");
			  console.error(err);
		  }
		  else{
			  res.send(rows[0].item_price);
			  console.error(rows[0].item_price + "price");
		  }
	  	});	
});


/******** For add to cart - cart items display **********/
router.post('/checkoutitems', function(req, res, next){
	 var itemID = Number(req.body.id);
	 var user_name = req.body.name;
	  var query2 = connection.query("SELECT * FROM "+ user_name +"  WHERE item_id = ?",[itemID], function(err, rows){
		  console.log(query2.sql);
		  console.log("Item added to cart check" + rows);
		  if(err){
			  console.log("Displaying Error");
//			  console.error(err);
		  }
		  else{
			  res.send(rows);
		  }
	  	});	
});

/******** Checkout items (Credit Card Evaluation) **********/
router.post('/creditcardCheck', function(req, res, next) {
	var num_creditcard = req.param('Credit_Card_Number');
	var expiry_month = Number(req.param('expiry_month'));
	var expiry_year = Number(req.param('expiry_year'));
	var num_cvv = req.param('cvvnumber');
    var re16digit = /^\d{16}$/;
    var d = new Date();
    var y_t = Number(d.getFullYear());
    var m_t = Number(d.getMonth()+1);
    var present_date = new Date(); 
//    present_date.setFullYear(y_t,m_t,1);
//    var expiry_date;
//    expiry_date.setFullYear(expiry_year,expiry_month,1);
	if((re16digit.test(num_creditcard)) && ((expiry_year > y_t) || ((expiry_year == y_t) && (expiry_month > m_t))) && ((/^[0-9]{3,4}$/).test(num_cvv)) ){
	  res.send("1");
	  console.log("Yoooooooooooooooooooo");
		}	
		else{
		res.send("2");
		console.log("Hmmmmmmmmmmmmmmmmmmmmmm");
//		res.send("hfdhf");
//		Set.display_invalid("Invalid Credentials");
		}
	});


/******** For Check out == user cart cart items display **********/
router.post('/endcart', function(req, res, next){
	 var user_name = req.body.un;
	  var query2 = connection.query("SELECT * FROM "+ user_name, function(err, rows){
		  console.log(query2.sql);
		  console.log("Item added to cart check" + rows);
		  if(err){
			  console.log("Displaying Error");
//			  console.error(err);
		  }
		  else{
			  res.send(rows);
		  }
	  	});	
});

/******** To remove items from Cart **********/
router.post('/removeItem', function(req, res, next){
	
	var user_name = req.body.user_name;
	 var item_id = Number(req.body.id);
	 
	  var query2 = connection.query("delete from "+ user_name +" where item_id = " + item_id, function(err, rows){
		  console.log(query2.sql);
		  console.log("Item added to cart check" + rows);
		  if(err){
			  console.log("Displaying Error");
			  console.error(err);
		  }
		  else{
			  res.send("Item Deleted Successfully !");
		  }
	  	});	
});


module.exports = router;