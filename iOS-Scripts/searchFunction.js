// tested in swift app
// CHANGE MODULE NAME
// CHANGE NAME INCLUDES

Process.enumerateModules().forEach(mod => {
    if (mod.name.includes("FridaInTheMiddle")) {
        console.log("module:", mod.name);
        mod.enumerateSymbols().forEach(sym => {
            if (sym.name.includes("dummyFunction") && sym.name.includes("flag")) {
                console.log("--", sym.name, "@", sym.address);
            }
        });
    }
});
