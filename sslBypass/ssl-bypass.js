Java.perform(function() {
  const ArrayList = Java.use('java.util.ArrayList');
  const ApiClient = Java.use('com.android.org.conscrypt.TrustManagerImpl');
  ApiClient.checkTrustedRecursive.implementation = function() {
    return ArrayList.$new();
  }
})
