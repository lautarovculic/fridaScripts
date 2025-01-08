Java.perform(() => {
	let Fragment = Java.use("androidx.fragment.app.Fragment"); // Also we have androidx.fragment.app.FragmentManager
	Fragment.onResume.implementation = function() {
		console.log("Fragment:", this.getClass().getName());
		// Call original onResume method
		this.onResume();
	}
});
