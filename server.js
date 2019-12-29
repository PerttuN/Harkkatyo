var fs = require("fs");
var express = require('express');
var app=express();

var bodyParser = require('body-parser');
var controller = require('./controller');

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));

// Projekti
app.route('/haeProjektit')
.get(controller.haeKaikkiProjektit);

app.route('/projektit')
    .get(function (request,response){
        fs.readFile("projektit.html", function(err, data){
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
        })
    })
    .post(controller.luoProjekti);

app.route('/projektit/:id')
    .get(controller.haeProjekti)
    .post(controller.muokkaaProjekti)
    .delete(controller.poistaProjekti);

//Työntekijä
app.route('/haeTyontekijat')
.get(controller.haeKaikkiTyontekijat);

app.route('/tyontekijat')
    .get(function (request,response){
        fs.readFile("tyontekijat.html", function(err, data){
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
        })
    })
    .post(controller.luoTyontekija);

app.route('/tyontekijat/:id')
    .get(controller.haeTyontekija)
    .post(controller.muokkaaTyontekija)
    .delete(controller.poistaTyontekija);

//Työaikamerkintä
app.route('/haeTyoaikamerkinnat')
    .get(controller.haeKaikkiTyoaikamerkinnat);
    
 app.route('/tyoaikamerkinta')
    .get(function (request,response){
         fs.readFile("tyoaikamerkinnat.html", function(err, data){
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
            })
        })
    .post(controller.luoTyoaikamerkinta);
    
app.route('/tyoaikamerkinta/:id')
    .get(controller.haeTyoaikamerkinta)
    .post(controller.muokkaaTyoaikamerkintaa)
    .delete(controller.poistaTyoaikamerkinta);

app.get('/', function(request, response){
    fs.readFile("projektit.html", function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
});

app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});
