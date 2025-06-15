Java.perform(function () {
    var Cipher = Java.use('javax.crypto.Cipher');
    var StringClass = Java.use("java.lang.String");

    Cipher.doFinal.overload('[B').implementation = function (input) {
        var result = this.doFinal(input);

        try {
            var decryptedString = StringClass.$new(result, "UTF-8");
            console.log("[+] Decrypted string: " + decryptedString);
        } catch (e) {
            console.log("[!] Error decoding string: " + e);
        }

        return result;
    };
});
