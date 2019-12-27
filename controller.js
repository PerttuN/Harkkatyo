'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : '',
  database : 'tyonhallinta'
});

module.exports = 
{

//Projekti
haeKaikkiProjektit: function(req, res){
  connection.query('SELECT * FROM projektit', function(error, results, fields){
      console.log("Data = " + JSON.stringify(results));
      res.json(results);
});
    },

    haeProjekti: function(req, res){
      var sqlHae = "SELECT * FROM projektit WHERE ID = '" +req.params.id+ "'";
     connection.query(sqlHae, function(error, results){
       if(error){
         console.log("Virhe ladattaessa projektit-taulusta syy: " + error);
         console.log("Body = " + JSON.stringify(req.body));
         console.log("Data = " + JSON.stringify(results));
         res.send(error);
       }
       else{
         console.log("Data = " + JSON.stringify(results));
         console.log("Params = " + JSON.stringify(req.query));
         console.log(results);
         res.json(results);
       }
     });
   },

   luoProjekti: function(req, res){
		
        console.log("Create = " + JSON.stringify(req.body));
		
		if ( req.body.Nimi == "" || req.body.Kuvaus == "" || req.body.AloitusPVM == "" || req.body.Maaraaika == "" )
		{
          res.send({"status": "NOT OK", "error": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa"}); 
		}
		else 
		{
			var sql = "INSERT INTO projektit(Nimi, Kuvaus, AloitusPVM, Maaraaika) VALUES ('" + req.body.Nimi + "', '" + req.body.Kuvaus + "', '" + req.body.AloitusPVM + "', '"  + req.body.Maaraaika + "')";
			
			console.log("sql=" + sql);
			
			connection.query(sql, function(error, results, fields){
				if ( error ){
				  console.log("Virhe lisätessä projektia: " + error);
				  res.send({"status": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa", "error": error, "response": null}); 
				}
				else
				{					
				  res.send({"status": "OK", "error": ""}); 
				}
			});
		}
    },

    muokkaaProjekti: function(req, res){
      var sqlUpdate = "UPDATE projektit";
        sqlUpdate = sqlUpdate + " SET Nimi = '" +req.body.Nimi+ "', Kuvaus = '" +req.body.Kuvaus+
         "', AloitusPVM = '" +req.body.AloitusPVM+ "', Maaraaika = '" +req.body.Maaraaika+ "'";
        sqlUpdate = sqlUpdate + " WHERE ID = '" +req.params.id+ "'";

        connection.query(sqlUpdate, function(error){
          if(error){
            console.log("Virhe ladattaessa Projektit-tauluun syy: " + error);
            console.log("Body = " + JSON.stringify(req.body));
            res.send(error);
          }
          else{
            console.log("Body = " + JSON.stringify(req.body));
            console.log("1 rivi lisätty");
            console.log(sqlUpdate);
            res.statusCode = 200;
          }
        });
        res.send("Projektit updated successfully");
    },

    poistaProjekti: function (req, res) {
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.params));
        
		var sql = "DELETE FROM `projektit` WHERE `ID`='" + req.params.id + "'" ;
		
		connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("Virhe poistaessa asiakasta: " + error);
          res.send({"status": 234, "error": error, "response": null}); 
        }
        else
        {
          res.json(results);
        }
    });
    },

    //Työntekijät
    haeKaikkiTyontekijat: function(req, res){
      connection.query('SELECT * FROM tyontekijat', function(error, results, fields){
          console.log("Data = " + JSON.stringify(results));
          res.json(results);
    });
        },
    
        haeTyontekija: function(req, res){
          var sqlHae = "SELECT * FROM tyontekijat WHERE ID = '" +req.params.id+ "'";
         connection.query(sqlHae, function(error, results){
           if(error){
             console.log("Virhe ladattaessa tyontekijat-taulusta syy: " + error);
             console.log("Body = " + JSON.stringify(req.body));
             console.log("Data = " + JSON.stringify(results));
             res.send(error);
           }
           else{
             console.log("Data = " + JSON.stringify(results));
             console.log("Params = " + JSON.stringify(req.query));
             console.log(results);
             res.json(results);
           }
         });
       },
    
       luoTyontekija: function(req, res){
        
            console.log("Create = " + JSON.stringify(req.body));
        
        if ( req.body.Etunimi == "" || req.body.Sukunimi == "" || req.body.Osoite == "" || req.body.Tyosuhde_ID == "" || req.body.Tyosuhteen_aloitusPvm == "" )
        {
              res.send({"status": "NOT OK", "error": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa"}); 
        }
        else 
        {
          var sql = "INSERT INTO tyontekijat(Etunimi, Sukunimi, Osoite, Tyosuhde_ID, Tyosuhteen_aloitusPvm) VALUES ('" + req.body.Etunimi + "', '" + req.body.Sukunimi + "', '" + req.body.Osoite + "', '"  + req.body.Tyosuhde_ID + "', '" + req.body.Tyosuhteen_aloitusPvm + "')";
          
          console.log("sql=" + sql);
          
          connection.query(sql, function(error, results, fields){
            if ( error ){
              console.log("Virhe lisätessä projektia: " + error);
              res.send({"status": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa", "error": error, "response": null}); 
            }
            else
            {					
              res.send({"status": "OK", "error": ""}); 
            }
          });
        }
        },
    
        muokkaaTyontekija: function(req, res){
          var sqlUpdate = "UPDATE tyontekijat";
            sqlUpdate = sqlUpdate + " SET Etunimi = '" +req.body.Etunimi+ "', Sukunimi = '" +req.body.Sukunimi+
             "', Osoite = '" +req.body.Osoite+ "', Tyosuhde_ID = '" +req.body.Tyosuhde_ID+ "', Tyosuhteen_aloitusPvm = '" +req.body.Tyosuhteen_aloitusPvm+ "'";
            sqlUpdate = sqlUpdate + " WHERE ID = '" +req.params.id+ "'";
    
            connection.query(sqlUpdate, function(error){
              if(error){
                console.log("Virhe ladattaessa tyontekijat-tauluun syy: " + error);
                console.log("Body = " + JSON.stringify(req.body));
                res.send(error);
              }
              else{
                console.log("Body = " + JSON.stringify(req.body));
                console.log("1 rivi lisätty");
                console.log(sqlUpdate);
                res.statusCode = 200;
              }
            });
            res.send("Tyontekijat updated successfully");
        },
    
        poistaTyontekija: function (req, res) {
            console.log("Body = " + JSON.stringify(req.body));
            console.log("Params = " + JSON.stringify(req.params));
            
        var sql = "DELETE FROM `tyontekijat` WHERE `ID`='" + req.params.id + "'" ;
        
        connection.query(sql, function(error, results, fields){
            if ( error ){
              console.log("Virhe poistaessa asiakasta: " + error);
              res.send({"status": 234, "error": error, "response": null}); 
            }
            else
            {
              res.json(results);
            }
        });
        },

        //Työaikamerkinnät
        haeKaikkiTyoaikamerkinnat: function(req, res){
          connection.query('SELECT * FROM merkinnat', function(error, results, fields){
              console.log("Data = " + JSON.stringify(results));
              res.json(results);
        });
            },
        
            haeTyoaikamerkinta: function(req, res){
              var sqlHae = "SELECT * FROM merkinnat WHERE ID = '" +req.params.id+ "'";
             connection.query(sqlHae, function(error, results){
               if(error){
                 console.log("Virhe ladattaessa työaikamerkinnät-taulusta syy: " + error);
                 console.log("Body = " + JSON.stringify(req.body));
                 console.log("Data = " + JSON.stringify(results));
                 res.send(error);
               }
               else{
                 console.log("Data = " + JSON.stringify(results));
                 console.log("Params = " + JSON.stringify(req.query));
                 console.log(results);
                 res.json(results);
               }
             });
           },
        
           luoTyoaikamerkinta: function(req, res){
            
                console.log("Create = " + JSON.stringify(req.body));
            
            if ( req.body.Tyontekija_ID == "" || req.body.Projekti_ID == "" || req.body.Tyotehtava_ID == "" || req.body.Pvm == "" || req.body.Tunnit == "" )
            {
                  res.send({"status": "NOT OK", "error": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa"}); 
            }
            else 
            {
              var sql = "INSERT INTO merkinnat(Tyontekija_ID, Projekti_ID, Tyotehtava_ID, Pvm, Tunnit) VALUES ('" + req.body.Tyontekija_ID + "', '" + req.body.Projekti_ID + "', '" + req.body.Tyotehtava_ID + "', '"  + req.body.Pvm + "', '" + req.body.Tunnit + "')";
              
              console.log("sql=" + sql);
              
              connection.query(sql, function(error, results, fields){
                if ( error ){
                  console.log("Virhe lisätessä projektia: " + error);
                  res.send({"status": "Jokin kenttä on tyhjä tai syötit vääränlaista dataa", "error": error, "response": null}); 
                }
                else
                {					
                  res.send({"status": "OK", "error": ""}); 
                }
              });
            }
            },
        
            muokkaaTyoaikamerkintaa: function(req, res){
              var sqlUpdate = "UPDATE merkinnat";
                sqlUpdate = sqlUpdate + " SET Tyontekija_ID = '" +req.body.Tyontekija_ID+ "', Projekti_ID = '" +req.body.Projekti_ID+
                 "', Tyotehtava_ID = '" +req.body.Tyotehtava_ID+ "', Pvm = '" +req.body.Pvm+ "', Tunnit = '" +req.body.Tunnit+ "'";
                sqlUpdate = sqlUpdate + " WHERE ID = '" +req.params.id+ "'";
        
                connection.query(sqlUpdate, function(error){
                  if(error){
                    console.log("Virhe ladattaessa Työaikamerkinnät-tauluun syy: " + error);
                    console.log("Body = " + JSON.stringify(req.body));
                    res.send(error);
                  }
                  else{
                    console.log("Body = " + JSON.stringify(req.body));
                    console.log("1 rivi lisätty");
                    console.log(sqlUpdate);
                    res.statusCode = 200;
                  }
                });
                res.send("Työaikamerkinnät updated successfully");
            },
        
            poistaTyoaikamerkinta: function (req, res) {
                console.log("Body = " + JSON.stringify(req.body));
                console.log("Params = " + JSON.stringify(req.params));
                
            var sql = "DELETE FROM `merkinnat` WHERE `ID`='" + req.params.id + "'" ;
            
            connection.query(sql, function(error, results, fields){
                if ( error ){
                  console.log("Virhe poistaessa asiakasta: " + error);
                  res.send({"status": 234, "error": error, "response": null}); 
                }
                else
                {
                  res.json(results);
                }
            });
            }
}





















