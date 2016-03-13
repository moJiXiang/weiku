var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/agentsearch', function(req, res) {
    db.all("SELECT * FROM agent where name = $name", {$name: req.body.name}, function(err, row) {
        if(err) {
            throw err;
        }
        res.json(row);
    })
})

router.get('/cms', function(req, res) {
    var agents = [];
    db.all("SELECT * FROM agent", function(err, row) {
        res.render('cms', {"agents": row})
    })
})

// 添加数据
router.post('/cms', function(req, res) {
    var agent = req.body;
    var agents = [];
    db.run("INSERT INTO agent(name, wheres) VALUES(?,?)", [agent.name, agent.wheres], function(err, row) {
        res.redirect('/cms')
    });
})

router.delete('/cms', function(req, res) {
    var aid = req.body.aid;
    db.run("Delete from agent WHERE id = $aid", {$aid: aid});
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end();
})

module.exports = router;
