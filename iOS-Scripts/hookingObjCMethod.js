// CHANGE CLASS NAME
if (ObjC.classes.JailbreakDetection) {
    var myClass = ObjC.classes.JailbreakDetection;
    var myMethod = myClass["+ isJailbroken"];

    Interceptor.attach(myMethod.implementation, {
        onEnter: function(args) {
            console.log("Hooked ObjC method: JailbreakDetection +isJailbroken");
          	// You can inspect or modify args here
        },
        onLeave: function(retval) {
            console.log("Returned ObjC value:", retval);
          	// You can inspect or modify retval here
        }
    });
} else {
  console.log("Hooking ObjC method failed!");
}
