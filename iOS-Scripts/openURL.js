/*
USE:

1 - Attach app to process with frida

frida -U -p <PID>

2 - Then, paste the script.

3 - After, run openURL("deepLink://test123")

*/
function openURL(url) {
	var UIApplication = ObjC.classes.UIApplication.sharedApplication();
	var toOpen = ObjC.classes.NSURL.URLWithString_(url);
	return UIApplication.openURL_(toOpen);
}
