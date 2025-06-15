Java.perform(function () {
	var RootBeer = Java.use('com.scottyab.rootbeer.RootBeer');
    RootBeer.isRooted.overload().implementation = function () {
        console.log('\nRoot detection bypassed');
        return false; // always return false
    };
});
