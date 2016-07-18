var express = require('express');    //Express Web Server 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var uuid = require('node-uuid');    // UUID - For making a filename for the images

var app = express();
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

var classes = ['jump', 'wait'];


app.route('/wait')
    .get(function (req, res, next) {
        run_cmd('mv', ['public/img/'+req.query.img, 'public/sorted/wait'], function (text) {
            fs.readdir('public/img', function (err, files) {
                res.redirect('/index.html?img='+files[0])
            })
        })
    });

app.route('/jump')
    .get(function (req, res, next) {
        run_cmd('mv', ['public/img/'+req.query.img, 'public/sorted/jump'], function (text) {
            fs.readdir('public/img', function (err, files) {
                res.redirect('/index.html?img='+files[0])
            })
        })
    });

app.route('/inair')
    .get(function (req, res, next) {
        run_cmd('mv', ['public/img/'+req.query.img, 'public/sorted/inair'], function (text) {
            fs.readdir('public/img', function (err, files) {
                res.redirect('/index.html?img='+files[0])
            })
        })
    });

app.route('/skip')
    .get(function (req, res, next) {
        run_cmd('rm', ['public/img/'+req.query.img], function (text) {
            fs.readdir('public/img', function (err, files) {
                res.redirect('/index.html?img='+files[0])
            })
        })
    });

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});

// Helper Function for running shell commands

function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}
