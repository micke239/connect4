var joinedLobby = function() {
    
};

var clearLobby = function() {
	$("#users").children().each(function() {
		$(this).remove();
	});
};

var addFrenemyToLobby = function(name) {
	var users = document.getElementById("users");

	var listItem = document.createElement('li');

	$(listItem).click(function() {
		$('#users li.active').removeClass('active');
		$(this).addClass('active');
	});

	var anchor = document.createElement('a');
	anchor.setAttribute('href', '#');
	anchor.appendChild(document.createTextNode(name));

	listItem.appendChild(anchor);

	users.appendChild(listItem);
};

var removeFrenemyFromLobby = function(name) {
	$("#users").children().each(function() {
		$(this).children().filter('a').each(function() {
			if ($(this).text() === name) {
				$(this).parent().remove();
			}
		});
	});
};

socket.on('usersInLobby', function() {
    clearLobby(); 
    for (var i = 0; i < userNames.length; i++) {
		addFrenemyToLobby(userNames[i]);
	}
});

socket.on('userJoinedLobby', function(userName) {
	addFrenemyToLobby(userName);
});

socket.on('userLeftLobby', function(userName) {
	removeFrenemyFromLobby(userName);
});