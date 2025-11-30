// first, attach the application with the app in foreground
// frida -U <AppName>
// then, paste this code in console

var classname = "JailbreakDetectionVC";
console.log("ClassName: "+classname);
var methodslist = ObjC.Classes[classname].$ownMethods;
for (var i = 0; i < methodslist.length; i++){
	console.log("\t Method: "+methodslist[i]);
}
