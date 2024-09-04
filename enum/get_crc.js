Java.perform(function () {
    var Context = Java.use('android.content.Context');
    var ZipFile = Java.use('java.util.zip.ZipFile');
    var ZipEntry = Java.use('java.util.zip.ZipEntry');
    
    var ActivityThread = Java.use('android.app.ActivityThread');
    var context = ActivityThread.currentApplication().getApplicationContext();
    var packageCodePath = context.getPackageCodePath();
    
    var zipFile = ZipFile.$new(packageCodePath);
    var entry = zipFile.getEntry("classes.dex");
    if (entry) {
        var crc = entry.getCrc();
        console.log("CRC:", crc);
    } else {
        console.log("Entry 'classes.dex' not found.");
    }
});
