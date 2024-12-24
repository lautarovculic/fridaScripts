// CHANGE THE MODULE/METHOD NAME
var myMethod = Module.findExportByName(null, "$s7DVIA_v232JailbreakDetectionViewControllerC12isJailbrokenSbyF");

if (myMethod) {
    Interceptor.attach(myMethod, {
        onEnter: function (args) {
            console.log("Hooked Swift method: JailbreakDetectionViewController +isJailbroken");
          	// You can inspect or modify args here
        },
        onLeave: function (retval) {
            console.log("Returned Swift value:", retval);
          	// You can inspect or modify retval here
        }
    });
} else {
  console.log("Hooking Swift method failed!");
}
