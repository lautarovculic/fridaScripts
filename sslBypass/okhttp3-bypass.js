Java.perform(function () {
	/* Invalidate the certificate pinner set up */
// com.android.okhttp.internal.http.HttpConnection
/*
    var httpClient = Java.use("com.android.okhttp.OkHttpClient");
    httpClient.builder.certificatePinner.implementation = function(certificatePinner){
        // do nothing
    	console.log("Called!");
    	return this;
    };
*/

    // Invalidate the certificate pinnet checks (if "setCertificatePinner" was called before the previous invalidation)

    var CertificatePinner = Java.use("com.android.okhttp.CertificatePinner");
    CertificatePinner.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function(p0, p1){
        // do nothing
        console.log("Called! [Certificate]");
        return;
    };
    CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function(p0, p1){
        // do nothing
        console.log("Called! [List]");
        return;
    };
});
