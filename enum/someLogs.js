Java.perform(function () {
    var Log = Java.use("android.util.Log");
    var currentApp = Java.use("android.app.ActivityThread").currentApplication();
    var targetPackageName = currentApp.getPackageName();
    
    function logInterceptor(logLevel, logMethod) {
        return function (tag, msg) {
            // Filtrar por paquete específico
            if (currentApp.getPackageName() === targetPackageName) {
                console.log("[" + logLevel + "] " + tag + ": " + msg);
            }
            // Llamar al método original
            return logMethod.call(this, tag, msg);
        };
    }
    
    // Enganchar a los métodos de log de diferentes niveles
    Log.d.overload('java.lang.String', 'java.lang.String').implementation = logInterceptor('d', Log.d);
    Log.i.overload('java.lang.String', 'java.lang.String').implementation = logInterceptor('i', Log.i);
    Log.w.overload('java.lang.String', 'java.lang.String').implementation = logInterceptor('w', Log.w);
    Log.e.overload('java.lang.String', 'java.lang.String').implementation = logInterceptor('e', Log.e);
    Log.v.overload('java.lang.String', 'java.lang.String').implementation = logInterceptor('v', Log.v);
});
