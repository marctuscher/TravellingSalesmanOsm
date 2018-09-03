var storage = (function() {
	var uid = new Date;
	var storage;
	var result;
	try {
		(storage = window.localStorage).setItem(uid, uid);
		result = storage.getItem(uid) == uid;
		storage.removeItem(uid);
		return result && storage;
	} catch (exception) {}
}());

export let getStorage = function(key, default_value = {}){
	if (storage){
		var value = storage.getItem(key);
		if (value){
			return JSON.parse(value);
		} else {
			return default_value;
		}

	} else {
		console.warn("localStorage not available. Using default value for '"+key+"'.");
		return default_value;
	}
}
export let setStorage = function(key, value, replace = false){
	if (storage){
		var stored_value = storage.getItem(key);

		// We have nothing to merge with, or we want to completely replace previous value
		if (!stored_value || replace){
			var new_value = value;

		// Merge new value with existing
		} else {
			var new_value = Object.assign(
				{},
				JSON.parse(stored_value),
				value
			);
		}
		storage.setItem(key, JSON.stringify(new_value));
		return;
	} else {
		console.warn("localStorage not available. '"+key+"'' will not perist when you close your browser.");
		return;
	}
}