// CHANGE CLASSNAME AND METHOD NAME
const className = "JailbreakDetection".toLowerCase();
const methodName = "isJailbroken".toLowerCase();

function searchSwiftExports(className, methodName) {
    var modules = Process.enumerateModulesSync();
    var found = false;

    modules.forEach(function(module) {
        var moduleExports = Module.enumerateExportsSync(module.name);

        moduleExports.forEach(moduleExport => {
            if (-1 < moduleExport.name.toLowerCase().indexOf(className) < moduleExport.name.toLowerCase().indexOf(methodName)) {
                console.log("Found matching", moduleExport.type, "in module", module.name, ":"+ moduleExport.name, "at", moduleExport.address)
                found = true;
            }
        });
    });

    if (!found) {
        console.log("No matching export found!");
    }
}

searchSwiftExports(className, methodName);
