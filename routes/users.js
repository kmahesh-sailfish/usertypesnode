var express = require('express');


var router = function (pool){
  var routerurl = express.Router();

  routerurl.route('/').get(function(req,res){
    res.send("respond with a resources")
  })
  routerurl.get('/display', function(req, res, next) {

    var query='select * from usertypes';
    pool.getConnection(function(err,connection){
      connection.query(query,function(err,rows){
        connection.release();
        if(err){
          console.log(err);
          res.status(500).send('500 Error : ' + err);
        }
        else
        {
          res.status(200).json(rows);
        }
      })
    })

  });
  routerurl.route('/Inserdata').post(function(req,res,next){
    pool.getConnection(function(err,connection){
      connection.release();
      var query="insert into usertypes(userName,password,email) values"+"('" +req.body['userName'] + "','"+ req.body['password'] + "','" +req.body['email'] +"')";
      connection.query(query,function(err,rows){
        if(err){

          res.status(500).send('500 Error :' + err);
        }
        else
        {

          res.status(200).json(rows);
        }
      })
    })



  })
  routerurl.route('/updatetext').put(function(req,res,next){


    pool.getConnection(function(err,connection){
      connection.release();
      if (req.query.usertypeID) {

        var query="UPDATE usertypes SET userName='"+req.body['userName']+"',password='"+req.body['password']+"',email='"+req.body['email']+"' where usertypeID= '"+req.query.usertypeID+"'";

        //query = "UPDATE  sendmails SET  DocumentsList ='" + req.body['EmailId']+ "' where SendMailId = '" + req.query['Id'] + "'";

        connection.query(query,function(err,rows){
          if(err){

            res.status(500).send('500 Error :' + err);
          }
          else
          {

            res.status(200).json(rows);
          }
        })
      }
      else
      {
        console.log("erro in userid");
      }
    })
  })
  routerurl.route('/getdetails').get(function(req,res,next){

    if(req.query.usertypeID){
      var query="select * from usertypes where usertypeID= '"+req.query.usertypeID+"'";
    }
    if(query){
      pool.getConnection(function(err,connection){
        connection.query(query,function(err,rows){
          if(err){

            res.status(500).send('500 Error :' + err);
          }
          else
          {

            res.status(200).json(rows);
          }
        })
      })
    }
    else
    {
      console.log("error in the query");
    }

  })

  return routerurl;
}

module.exports = router;
