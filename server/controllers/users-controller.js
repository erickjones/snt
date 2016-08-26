var Users = require('../datasets/users');

module.exports.getUsers = function(req, res){
	Users.find({}, function(err, usersData){
		if (err){
			res.error(err);
		} else {
			res.json(usersData);
		}
	})
}

module.exports.followUser = function(req, res){
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

	var userId = req.body.userId,
	wasterId = req.body.wasterId;

	Users.findById(wasterId, function(err, waster){

		var followerIndex = waster.followers.map(function(obj, index) {
				if(obj.userId == wasterId) {
						return index;
				}
		}).filter(isFinite);

		waster.followers.splice(followerIndex, 1);
		waster.save();
	});

	Users.findById(userId, function(err, follower){

		var wasterIndex = follower.following.map(function(obj, index) {
				if(obj.userId == wasterId) {
						return index;
				}
		}).filter(isFinite);

		follower.following.splice(wasterIndex, 1);
		follower.save();
	});

}
