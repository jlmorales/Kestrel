const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise //async Promises
mongoose.connect("mongodb://localhost/kestrel", {
    keepAlive : true,
    useMongoClient : true
});
