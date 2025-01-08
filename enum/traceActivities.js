Java.perform(() => {
	let ActivityClass = Java.use("android.app.Activity");
	ActivityClass.onResume.implementation = function() {
		console.log("Activity resumed:", this.getClass().getName());
		// Call original onResume method
		this.onResume();
	}
});
