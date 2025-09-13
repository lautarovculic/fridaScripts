// generic Il2Cpp field modifier
// check https://github.com/vfsfitvnm/frida-il2cpp-bridge
'use strict';
const wait = ms => new Promise(r => setTimeout(r, ms));

// ----------------------------------------------------
// ----------------- CONFIGURATION --------------------
// ----------------------------------------------------
const config = {
    // class name that contains the variable that you want modify
    className: 'Score',
    // exact name of the variable (field) to modify
    fieldName: 'score',
	// frequent method name that is called for use as hook. for examplle: update, lateUpdate, etc
    methodName: 'UpdateScoreText',
    // new value
    newValue: 99999,
    // data type of the variable
    // 'S32' (int 32-bit), 'Float', 'Double', 'S64' (long), 'Boolean'
    fieldType: 'S32'
};
// ----------------------------------------------------
// ---------------- END CONFIGURATION -----------------
// ----------------------------------------------------

(async () => {
    console.log('[*] waiting libil2cpp.so...');
    while (!Module.findBaseAddress('libil2cpp.so')) await wait(100);
    console.log('[+] libil2cpp.so found. hooking...');

    Il2Cpp.perform(() => {
        const assembly = Il2Cpp.domain.assembly('Assembly-CSharp').image;

        const targetClass = assembly.class(config.className);
        if (!targetClass.handle.value) {
            console.error(`[!] class not found: "${config.className}"`);
            return;
        }

        const targetField = targetClass.field(config.fieldName);
        if (!targetField.handle.value) {
            console.error(`[!] field not found: "${config.fieldName}" in class "${config.className}"`);
            return;
        }

        const targetMethod = targetClass.method(config.methodName);
        if (!targetMethod.handle.value) {
            console.error(`[!] method not found: "${config.methodName}" in class "${config.className}"`);
            return;
        }

        const address = targetMethod.virtualAddress;
        Interceptor.attach(address, {
            onEnter(args) {
                try {
                    const self = args[0]; // 'this' instance
                    const fieldAddress = self.add(targetField.offset);

                    // write the value, depending of the datatype
                    switch (config.fieldType.toUpperCase()) {
                        case 'S32':
                            fieldAddress.writeS32(config.newValue);
                            break;
                        case 'FLOAT':
                            fieldAddress.writeFloat(config.newValue);
                            break;
                        case 'DOUBLE':
                            fieldAddress.writeDouble(config.newValue);
                            break;
                        case 'S64':
                            fieldAddress.writeS64(config.newValue);
                            break;
                        case 'BOOLEAN':
                            fieldAddress.writeU8(config.newValue ? 1 : 0);
                            break;
                        default:
                            console.log(`[!] datatype not supported: ${config.fieldType}`);
                            break;
                    }
                } catch (e) {
                    // optionall: console.log(e);
                }
            }
        });
        console.log(`\nhooking...`);
        console.log(`    Class : ${config.className}`);
        console.log(`    Field : ${config.fieldName}`);
        console.log(`    Method: ${config.methodName}`);
        console.log(`    -> New value to: ${config.newValue}`);
    });
})();
