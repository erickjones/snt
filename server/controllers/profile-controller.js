var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function (req, res){

    var file = req.files.file;
    var userId = req.body.userId;

    console.log("User " + userId + " is submitting " , file);
    var uploadDate = new Date();
    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/" + userId + uploadDate + file.name);
    var savePath = "/uploads/" + userId + uploadDate + file.name;

    fs.rename(tempPath, targetPath, function (err){
        if (err){
            console.log(err)
        } else {
            User.findById(userId, function(err, userData){
                var user = userData;
                user.image = savePath;
                user.save(function(err){
                    if (err){
                        console.log("failed save")
                        res.json({status: 500})
                    } else {
                      res.json({
                        email: user.email,
                        _id: user._id,
                        username: user.username,
                        image: user.image,
                        following: user.following,
                        followers: user.followers,
                        bio: user.bio
                      });
                    }
                })
            })
        }
    })
};

module.exports.updateUsername = function (req, res){
    var username = req.body.username;
    var userId = req.body.userId;

    User.findById(userId, function (err, userData){
      console.log('NAME UPD', userData)
        var user = userData;
        user.username = username;

        user.save(function(err){
            if (err){
                console.log("fail");
                res.json({status: 500});
            } else {
              res.json({
                email: user.email,
                _id: user._id,
                username: user.username,
                image: user.image,
                following: user.following,
                followers: user.followers,
                bio: user.bio
              });
            }
        })
    });
};

module.exports.updateBio = function (req, res){
    var bio = req.body.bio;
    var userId = req.body.userId;

    User.findById(userId, function (err, userData){
      console.log('BIO UPD', userData)

        var user = userData;
        user.bio = bio;

        user.save(function(err){
            if (err){
                console.log("fail");
                res.json({status: 500});
            } else {
              res.json({
                email: user.email,
                _id: user._id,
                username: user.username,
                image: user.image,
                following: user.following,
                followers: user.followers,
                bio: user.bio
              });
            }
        })
    });
};
//
// module.exports.getProfile = function(req, res){
//   var userId = req.body.userId;
// 	var bio = req.body.bio;
//   var username = req.body.username;
//   console.log('bio');
// }
