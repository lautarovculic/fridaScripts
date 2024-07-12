Java.perform(function () {
    // Helper function to bypass SSL pinning by returning a custom TrustManager
    function bypassSSL() {
        var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');
        var SSLContext = Java.use('javax.net.ssl.SSLContext');

        var TrustManager = Java.registerClass({
            name: 'org.frida.TrustManager',
            implements: [X509TrustManager],
            methods: {
                checkClientTrusted: function (chain, authType) {},
                checkServerTrusted: function (chain, authType) {},
                getAcceptedIssuers: function () { return []; }
            }
        });

        var TrustManagers = [TrustManager.$new()];
        var SSLContextInit = SSLContext.init.overload('[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom');
        SSLContextInit.implementation = function (keyManager, trustManager, secureRandom) {
            SSLContextInit.call(this, keyManager, TrustManagers, secureRandom);
        };

        console.log('SSL pinning bypass active');
    }

    // Bypass okhttp3
    try {
        var OkHttpClient = Java.use('okhttp3.OkHttpClient');
        var Builder = OkHttpClient.Builder;
        Builder.sslSocketFactory.overload('javax.net.ssl.SSLSocketFactory', 'javax.net.ssl.X509TrustManager').implementation = function (sslSocketFactory, trustManager) {
            var newTrustManager = TrustManager.$new();
            return this.sslSocketFactory.call(this, sslSocketFactory, newTrustManager);
        };
        console.log('Bypassed OkHttpClient SSL pinning');
    } catch (e) {
        console.log('Failed to bypass OkHttpClient: ' + e);
    }

    // Bypass TrustManager
    try {
        bypassSSL();
    } catch (e) {
        console.log('Failed to bypass TrustManager: ' + e);
    }
});
