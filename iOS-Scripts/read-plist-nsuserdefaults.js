console.warn("[*] Started: Read NSUserDefaults PLIST file");

if (ObjC.available) {
    try {
        var NSUserDefaults = ObjC.classes.NSUserDefaults;
        var NSDictionary = NSUserDefaults.alloc().init().dictionaryRepresentation();
        console.log(NSDictionary.toString());
    } catch (err) {
        console.warn("[!] Exception: " + err.message);
    }
} else {
    console.warn("Objective-C Runtime is not available!");
}

console.warn("[*] Completed: Read NSUserDefaults PLIST file");
