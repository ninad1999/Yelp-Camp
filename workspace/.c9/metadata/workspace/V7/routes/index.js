{"filter":false,"title":"index.js","tooltip":"/V7/routes/index.js","undoManager":{"mark":41,"position":41,"stack":[[{"start":{"row":0,"column":0},"end":{"row":73,"column":0},"action":"insert","lines":["// ================================","// ROUTES","// ===============================","","app.get(\"/\", function(req, res) {","   res.render(\"landing\");","});","","","","","// =====================","// COMMENT ROUTES","// =====================","","","","// =======================","// AUTH ROUTES","// =======================","","// ----------------SIGNUP----------------------","","app.get(\"/register\", function(req, res){","   res.render(\"./register\") ","});","","// signup logic","app.post(\"/register\", function(req, res) {","   var newUser = new User({username: req.body.username});","   User.register(newUser, req.body.password, function(err, user) {","      if (err) {","          console.log(err);","          return res.render(\"./register\") // return so that if there is an wrror we can short circuit and break out of the function","      } else {","            passport.authenticate(\"local\")(req, res, function() {","               res.redirect(\"/campgrounds\");","            });","      } ","   });","});","","// ------------LOGIN---------------","","app.get(\"/login\", function(req, res) {","   res.render(\"./login\"); ","});","","// app.post(\"/login, middleware, function()\");","app.post(\"/login\", passport.authenticate(\"local\", ","    {","        successRedirect: \"/campgrounds\",","        failureRedirect: \"/login\"","    }), function(req, res) {","});","","// --------------LOGOUT------------------","","app.get(\"/logout\", function(req, res) {","   req.logout();","   res.redirect(\"/campgrounds\"); ","});","","// --------------MIDDLEWARE for accessing pages-------------","function isLoggedIn(req, res, next) {","    if (req.isAuthenticated()) {","        ","        return next();","    }","    ","    res.redirect(\"/login\");","}","",""],"id":1}],[{"start":{"row":8,"column":0},"end":{"row":19,"column":26},"action":"remove","lines":["","","","// =====================","// COMMENT ROUTES","// =====================","","","","// =======================","// AUTH ROUTES","// ======================="],"id":2},{"start":{"row":7,"column":0},"end":{"row":8,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":4,"column":0},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":3},{"start":{"row":5,"column":0},"end":{"row":6,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":4,"column":0},"end":{"row":5,"column":30},"action":"insert","lines":["var express = require(\"express\");","var router = express.Router();"],"id":4}],[{"start":{"row":7,"column":2},"end":{"row":7,"column":3},"action":"remove","lines":["p"],"id":5},{"start":{"row":7,"column":1},"end":{"row":7,"column":2},"action":"remove","lines":["p"]},{"start":{"row":7,"column":0},"end":{"row":7,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":7,"column":0},"end":{"row":7,"column":6},"action":"insert","lines":["router"],"id":6}],[{"start":{"row":14,"column":2},"end":{"row":14,"column":3},"action":"remove","lines":["p"],"id":7},{"start":{"row":14,"column":1},"end":{"row":14,"column":2},"action":"remove","lines":["p"]},{"start":{"row":14,"column":0},"end":{"row":14,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":14,"column":0},"end":{"row":14,"column":6},"action":"insert","lines":["router"],"id":8}],[{"start":{"row":19,"column":2},"end":{"row":19,"column":3},"action":"remove","lines":["p"],"id":9},{"start":{"row":19,"column":1},"end":{"row":19,"column":2},"action":"remove","lines":["p"]},{"start":{"row":19,"column":0},"end":{"row":19,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":19,"column":0},"end":{"row":19,"column":6},"action":"insert","lines":["router"],"id":10}],[{"start":{"row":35,"column":2},"end":{"row":35,"column":3},"action":"remove","lines":["p"],"id":11},{"start":{"row":35,"column":1},"end":{"row":35,"column":2},"action":"remove","lines":["p"]},{"start":{"row":35,"column":0},"end":{"row":35,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":35,"column":0},"end":{"row":35,"column":6},"action":"insert","lines":["router"],"id":12}],[{"start":{"row":40,"column":2},"end":{"row":40,"column":3},"action":"remove","lines":["p"],"id":13},{"start":{"row":40,"column":1},"end":{"row":40,"column":2},"action":"remove","lines":["p"]},{"start":{"row":40,"column":0},"end":{"row":40,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":40,"column":0},"end":{"row":40,"column":6},"action":"insert","lines":["router"],"id":14}],[{"start":{"row":49,"column":2},"end":{"row":49,"column":3},"action":"remove","lines":["p"],"id":15},{"start":{"row":49,"column":1},"end":{"row":49,"column":2},"action":"remove","lines":["p"]},{"start":{"row":49,"column":0},"end":{"row":49,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":49,"column":0},"end":{"row":49,"column":6},"action":"insert","lines":["router"],"id":16}],[{"start":{"row":0,"column":0},"end":{"row":2,"column":34},"action":"remove","lines":["// ================================","// ROUTES","// ==============================="],"id":17},{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"remove","lines":["",""]},{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"remove","lines":["",""]},{"start":{"row":58,"column":1},"end":{"row":59,"column":0},"action":"insert","lines":["",""]},{"start":{"row":59,"column":0},"end":{"row":60,"column":0},"action":"insert","lines":["",""]},{"start":{"row":60,"column":0},"end":{"row":60,"column":1},"action":"insert","lines":["m"]},{"start":{"row":60,"column":1},"end":{"row":60,"column":2},"action":"insert","lines":["o"]},{"start":{"row":60,"column":2},"end":{"row":60,"column":3},"action":"insert","lines":["d"]},{"start":{"row":60,"column":3},"end":{"row":60,"column":4},"action":"insert","lines":["u"]},{"start":{"row":60,"column":4},"end":{"row":60,"column":5},"action":"insert","lines":["l"]},{"start":{"row":60,"column":5},"end":{"row":60,"column":6},"action":"insert","lines":["e"]}],[{"start":{"row":60,"column":6},"end":{"row":60,"column":7},"action":"insert","lines":["."],"id":18},{"start":{"row":60,"column":7},"end":{"row":60,"column":8},"action":"insert","lines":["e"]},{"start":{"row":60,"column":8},"end":{"row":60,"column":9},"action":"insert","lines":["x"]},{"start":{"row":60,"column":9},"end":{"row":60,"column":10},"action":"insert","lines":["p"]},{"start":{"row":60,"column":10},"end":{"row":60,"column":11},"action":"insert","lines":["o"]},{"start":{"row":60,"column":11},"end":{"row":60,"column":12},"action":"insert","lines":["t"]}],[{"start":{"row":60,"column":11},"end":{"row":60,"column":12},"action":"remove","lines":["t"],"id":19}],[{"start":{"row":60,"column":11},"end":{"row":60,"column":12},"action":"insert","lines":["r"],"id":20},{"start":{"row":60,"column":12},"end":{"row":60,"column":13},"action":"insert","lines":["t"]},{"start":{"row":60,"column":13},"end":{"row":60,"column":14},"action":"insert","lines":["s"]}],[{"start":{"row":60,"column":14},"end":{"row":60,"column":15},"action":"insert","lines":[" "],"id":21},{"start":{"row":60,"column":15},"end":{"row":60,"column":16},"action":"insert","lines":["="]}],[{"start":{"row":60,"column":16},"end":{"row":60,"column":17},"action":"insert","lines":[" "],"id":22},{"start":{"row":60,"column":17},"end":{"row":60,"column":18},"action":"insert","lines":["r"]}],[{"start":{"row":60,"column":18},"end":{"row":60,"column":19},"action":"insert","lines":["o"],"id":23},{"start":{"row":60,"column":19},"end":{"row":60,"column":20},"action":"insert","lines":["u"]},{"start":{"row":60,"column":20},"end":{"row":60,"column":21},"action":"insert","lines":["t"]},{"start":{"row":60,"column":21},"end":{"row":60,"column":22},"action":"insert","lines":["e"]},{"start":{"row":60,"column":22},"end":{"row":60,"column":23},"action":"insert","lines":["r"]},{"start":{"row":60,"column":23},"end":{"row":60,"column":24},"action":"insert","lines":[";"]}],[{"start":{"row":1,"column":30},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":24}],[{"start":{"row":2,"column":0},"end":{"row":2,"column":1},"action":"insert","lines":["v"],"id":25},{"start":{"row":2,"column":1},"end":{"row":2,"column":2},"action":"insert","lines":["a"]},{"start":{"row":2,"column":2},"end":{"row":2,"column":3},"action":"insert","lines":["r"]}],[{"start":{"row":2,"column":3},"end":{"row":2,"column":4},"action":"insert","lines":[" "],"id":26},{"start":{"row":2,"column":4},"end":{"row":2,"column":5},"action":"insert","lines":["U"]},{"start":{"row":2,"column":5},"end":{"row":2,"column":6},"action":"insert","lines":["s"]},{"start":{"row":2,"column":6},"end":{"row":2,"column":7},"action":"insert","lines":["e"]},{"start":{"row":2,"column":7},"end":{"row":2,"column":8},"action":"insert","lines":["r"]}],[{"start":{"row":2,"column":8},"end":{"row":2,"column":9},"action":"insert","lines":[" "],"id":27},{"start":{"row":2,"column":9},"end":{"row":2,"column":10},"action":"insert","lines":["="]}],[{"start":{"row":2,"column":10},"end":{"row":2,"column":11},"action":"insert","lines":[" "],"id":28},{"start":{"row":2,"column":11},"end":{"row":2,"column":12},"action":"insert","lines":["r"]},{"start":{"row":2,"column":12},"end":{"row":2,"column":13},"action":"insert","lines":["e"]},{"start":{"row":2,"column":13},"end":{"row":2,"column":14},"action":"insert","lines":["q"]},{"start":{"row":2,"column":14},"end":{"row":2,"column":15},"action":"insert","lines":["u"]},{"start":{"row":2,"column":15},"end":{"row":2,"column":16},"action":"insert","lines":["i"]},{"start":{"row":2,"column":16},"end":{"row":2,"column":17},"action":"insert","lines":["r"]},{"start":{"row":2,"column":17},"end":{"row":2,"column":18},"action":"insert","lines":["e"]}],[{"start":{"row":2,"column":18},"end":{"row":2,"column":20},"action":"insert","lines":["()"],"id":29}],[{"start":{"row":2,"column":19},"end":{"row":2,"column":21},"action":"insert","lines":["\"\""],"id":30}],[{"start":{"row":2,"column":20},"end":{"row":2,"column":21},"action":"insert","lines":["."],"id":31},{"start":{"row":2,"column":21},"end":{"row":2,"column":22},"action":"insert","lines":["."]},{"start":{"row":2,"column":22},"end":{"row":2,"column":23},"action":"insert","lines":["/"]},{"start":{"row":2,"column":23},"end":{"row":2,"column":24},"action":"insert","lines":["m"]},{"start":{"row":2,"column":24},"end":{"row":2,"column":25},"action":"insert","lines":["o"]},{"start":{"row":2,"column":25},"end":{"row":2,"column":26},"action":"insert","lines":["d"]},{"start":{"row":2,"column":26},"end":{"row":2,"column":27},"action":"insert","lines":["e"]},{"start":{"row":2,"column":27},"end":{"row":2,"column":28},"action":"insert","lines":["l"]},{"start":{"row":2,"column":28},"end":{"row":2,"column":29},"action":"insert","lines":["s"]}],[{"start":{"row":2,"column":29},"end":{"row":2,"column":30},"action":"insert","lines":["/"],"id":32},{"start":{"row":2,"column":30},"end":{"row":2,"column":31},"action":"insert","lines":["u"]},{"start":{"row":2,"column":31},"end":{"row":2,"column":32},"action":"insert","lines":["s"]},{"start":{"row":2,"column":32},"end":{"row":2,"column":33},"action":"insert","lines":["e"]},{"start":{"row":2,"column":33},"end":{"row":2,"column":34},"action":"insert","lines":["r"]}],[{"start":{"row":2,"column":36},"end":{"row":2,"column":37},"action":"insert","lines":[";"],"id":33}],[{"start":{"row":2,"column":37},"end":{"row":3,"column":0},"action":"insert","lines":["",""],"id":34},{"start":{"row":3,"column":0},"end":{"row":3,"column":1},"action":"insert","lines":["v"]},{"start":{"row":3,"column":1},"end":{"row":3,"column":2},"action":"insert","lines":["a"]},{"start":{"row":3,"column":2},"end":{"row":3,"column":3},"action":"insert","lines":["r"]}],[{"start":{"row":3,"column":3},"end":{"row":3,"column":4},"action":"insert","lines":[" "],"id":35},{"start":{"row":3,"column":4},"end":{"row":3,"column":5},"action":"insert","lines":["p"]},{"start":{"row":3,"column":5},"end":{"row":3,"column":6},"action":"insert","lines":["a"]},{"start":{"row":3,"column":6},"end":{"row":3,"column":7},"action":"insert","lines":["s"]},{"start":{"row":3,"column":7},"end":{"row":3,"column":8},"action":"insert","lines":["s"]},{"start":{"row":3,"column":8},"end":{"row":3,"column":9},"action":"insert","lines":["p"]},{"start":{"row":3,"column":9},"end":{"row":3,"column":10},"action":"insert","lines":["o"]}],[{"start":{"row":3,"column":10},"end":{"row":3,"column":11},"action":"insert","lines":["r"],"id":36},{"start":{"row":3,"column":11},"end":{"row":3,"column":12},"action":"insert","lines":["t"]}],[{"start":{"row":3,"column":12},"end":{"row":3,"column":13},"action":"insert","lines":[" "],"id":37},{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"insert","lines":["="]}],[{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"insert","lines":[" "],"id":38},{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"insert","lines":["r"]},{"start":{"row":3,"column":16},"end":{"row":3,"column":17},"action":"insert","lines":["e"]},{"start":{"row":3,"column":17},"end":{"row":3,"column":18},"action":"insert","lines":["q"]},{"start":{"row":3,"column":18},"end":{"row":3,"column":19},"action":"insert","lines":["u"]},{"start":{"row":3,"column":19},"end":{"row":3,"column":20},"action":"insert","lines":["i"]},{"start":{"row":3,"column":20},"end":{"row":3,"column":21},"action":"insert","lines":["r"]},{"start":{"row":3,"column":21},"end":{"row":3,"column":22},"action":"insert","lines":["e"]}],[{"start":{"row":3,"column":22},"end":{"row":3,"column":24},"action":"insert","lines":["()"],"id":39}],[{"start":{"row":3,"column":23},"end":{"row":3,"column":25},"action":"insert","lines":["\"\""],"id":40}],[{"start":{"row":3,"column":24},"end":{"row":3,"column":25},"action":"insert","lines":["p"],"id":41},{"start":{"row":3,"column":25},"end":{"row":3,"column":26},"action":"insert","lines":["a"]},{"start":{"row":3,"column":26},"end":{"row":3,"column":27},"action":"insert","lines":["s"]},{"start":{"row":3,"column":27},"end":{"row":3,"column":28},"action":"insert","lines":["s"]},{"start":{"row":3,"column":28},"end":{"row":3,"column":29},"action":"insert","lines":["p"]},{"start":{"row":3,"column":29},"end":{"row":3,"column":30},"action":"insert","lines":["o"]},{"start":{"row":3,"column":30},"end":{"row":3,"column":31},"action":"insert","lines":["r"]},{"start":{"row":3,"column":31},"end":{"row":3,"column":32},"action":"insert","lines":["t"]}],[{"start":{"row":3,"column":34},"end":{"row":3,"column":35},"action":"insert","lines":[";"],"id":42}]]},"ace":{"folds":[],"scrolltop":688,"scrollleft":0,"selection":{"start":{"row":3,"column":35},"end":{"row":3,"column":35},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":42,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1533975991397,"hash":"1fc57e2e54a5ea4980982b0485ec6f1476bb092e"}