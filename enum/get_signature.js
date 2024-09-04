Java.perform(function() {
    // Get a reference to the MainActivity class from the specified package
    var MainActivity = Java.use('com.ctf.vezel.MainActivity');

    // Hook the implementation of the getSig method
    MainActivity.getSig.implementation = function(packageName) {
        // Call the original getSig method and store its result
        var sig = this.getSig(packageName);

        // Print the signature hash to the console
        console.log("Signature Hash: " + sig);

        // Return the original signature hash value
        return sig;
    };
});
