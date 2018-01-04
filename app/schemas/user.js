var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); //密码加盐工具
var SALR_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  // 0: normal user
  // 1: verified user
  // 2: professioner
  // >10: admin
  // 50>: supper admin
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//为模式添加一个方法
UserSchema.pre('save', function(next){ //每次保存数据都会调用这个方法
  var user = this;
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  };

  bcrypt.genSalt(SALR_WORK_FACTOR, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.statics = { //给模式添加静态方法,模型可直接调用
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb)
  },
};

UserSchema.methods = { //给模式添加实例方法，模型的实例才可调用
  comparePassword: function(_password, cb){
    bcrypt.compare(_password, this.password, function(err, isMatch){
      if(err) return cb(err);
      cb(null, isMatch);
    });
  }
};

module.exports = UserSchema;