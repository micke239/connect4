var User = function(userName) {
    //set & get
    this.userName = function(newUserName) {
        if (newUserName) {
            userName = newUserName;
        }
        
        return userName;
    };
}

module.exports = User;