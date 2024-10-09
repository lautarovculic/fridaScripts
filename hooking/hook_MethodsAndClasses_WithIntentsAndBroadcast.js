Java.perform(function() {
    // Hook to CTFReceiver and Utilities class
    var CTFReceiver = Java.use("com.flagstore.ctf.flagstore.CTFReceiver");
    var Utilities = Java.use("com.flagstore.ctf.flagstore.Utilities");

    // Hook for intercepting the getPhrase method
    CTFReceiver.getPhrase.overload('java.lang.String', 'java.lang.String', 'java.lang.String').implementation = function(a, b, c) {
        console.log("Intercepting getPhrase");
        console.log("Value of 'a':", a);
        console.log("Value of 'b':", b);
        console.log("Value of 'c':", c);

        // Call original method
        var result = this.getPhrase(a, b, c);
        console.log("getPhrase:", result);
        return result;
    };

    // Hook for intercept the doBoth Methods from Utilities class
    Utilities.doBoth.overload('java.lang.String').implementation = function(input) {
        console.log("Intercepting doBoth with passphrase:", input);

        var result = this.doBoth(input);
        console.log("doBoth:", result);
        return result;
    };

    // Hook for capture sendBroadcast and see the intent
    var Context = Java.use("android.content.Context");
    Context.sendBroadcast.overload("android.content.Intent").implementation = function(intent) {
        var action = intent.getAction();
        var extras = intent.getExtras();
        if (action === "com.flagstore.ctf.OUTGOING_INTENT") {
            console.log("Intercepting Intent with ACTION:", action);
            console.log("Send Intent:", extras.getString("msg"));
        }
        this.sendBroadcast(intent); // Call original method
    };
});
