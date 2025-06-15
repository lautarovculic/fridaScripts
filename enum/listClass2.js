Java.perform(function () {
    // set the package name
    var targetPackageName = 'com.hackthebox.myapp';

    // enumerate all classes
    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            // class of our target package
            if (className.startsWith(targetPackageName)) {
                try {
                    var clazz = Java.use(className);
                    console.log('\n[*] Enumerating methods of class: ' + className);
                    // get methods
                    var methods = clazz.class.getDeclaredMethods();
                    methods.forEach(function(method) {
                        console.log(method.toString());
                    });

                    // clean up the reference
                    clazz.$dispose();
                } catch (err) {
                    console.error('Error enumerating methods of ' + className + ': ' + err.message);
                }
            }
        },
        onComplete: function() {
            console.log('[*] Class enumeration complete');
        }
    });
});

