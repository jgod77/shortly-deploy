var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');


var linkSchema = mongoose.Schema({
  url: String,
  visits: Number,
  link: String,
  code: String,
  baseUrl: String,
});

var Link = mongoose.model('Link', linkSchema);

Link.prototype.hashLink = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0,5);
};

linkSchema.pre('save', function(next){
  var code = this.hashLink(this.url);
  this.code = code;
  next();
});


module.exports = Link;
