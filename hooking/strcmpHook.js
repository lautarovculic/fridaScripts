// find the module containing strcmp
var libangler = Module.findBaseAddress("libangler.so"); // change libname

// find the address of strcmp within libangler.so (in this case)
var strcmpPtr = Module.findExportByName(null, "strcmp");

// intercept strcmp calls
Interceptor.attach(strcmpPtr, {
    onEnter: function(args) {
        // get the compared strings
        var str1 = Memory.readUtf8String(args[0]);
        var str2 = Memory.readUtf8String(args[1]); // add strings if you need

        // log strings
        console.log("strcmp called with strings:", str1, str2);
    }
});
