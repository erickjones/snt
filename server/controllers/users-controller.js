var Users = require('../datasets/users');
module.exports.getUsers = function(req, res){
	console.log('get users');
	Users.find({}, function(err, usersData){
		if (err){
			res.error(err);
		} else {
			res.json(usersData);
		}
	})
}

module.exports.followUser = function(req, res){
	console.log('follow pushed');
	var userId = req.body.userId,
		wasterId = req.body.wasterId;

	Users.findById(wasterId, function(err, waster){
		waster.followers.push({userId: userId});
		waster.save();
	})

	Users.findById(userId, function(err, follower){
		follower.following.push({userId: wasterId});
		follower.save();
	})
}

module.exports.unfollowUser = function(req, res){
	console.log('unfollow pushed');
	var userId = req.body.userId,
		wasterId = req.body.wasterId;

	Users.findById(wasterId, function(err, waster){
		waster.followers.splice({userId: userId});
		waster.save();
	})

	Users.findById(userId, function(err, follower){
		follower.following.splice({userId: wasterId});
		follower.save();
	})
}
