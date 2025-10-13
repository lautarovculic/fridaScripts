(function () {
  if (!ObjC.available) { console.log('ObjC no available'); return; }

  const NSJSON = ObjC.classes.NSJSONSerialization;
  Interceptor.attach(NSJSON['+ dataWithJSONObject:options:error:'].implementation, {
    onEnter(args) {
      try {
	// NSDictionary
        const dict = new ObjC.Object(args[2]);
	// set the string into the object
        const flag = dict.objectForKey_('8ksec_intercepted');
        if (flag && flag.toString && flag.toString() !== '0x0') {
          console.log('[FLAG] ' + flag.toString());
        }
      } catch (e) { console.log('NSJSON err: ' + e); }
    }
  });
})();
