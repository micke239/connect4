var logger = require('winston');

module.exports = function(connection) {
    connection.on('disconnect', function() {
        logger.info('disconnect from gameevents');
    });
};