connect4.filter('fieldSearchFilter', function() {
	return function(obj, search) {

		if (!obj || !search) {
			return obj;
		} 
		
		var filtered = {};
		for (var field in obj) {
			if (field.toLowerCase().indexOf(search) > -1) {
				filtered[field] = obj[field];
			}
		}

		return filtered;
	};
});
