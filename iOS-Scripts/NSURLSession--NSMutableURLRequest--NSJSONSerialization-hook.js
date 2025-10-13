// iOS / Frida 17.x
// Hook NSURLSession to read the HTTPBody when creating the task.
// + fallback: setHTTPBody and NSJSONSerialization

(function () {
  function log(m){ try{ console.log(m); }catch(_){} }

  if (!ObjC.available) { log('ObjC no available'); return; }

  // Dump at the exact moment of creating the task
  try {
    const NSURLSession = ObjC.classes.NSURLSession;
    // instance: - dataTaskWithRequest:completionHandler:
    Interceptor.attach(NSURLSession['- dataTaskWithRequest:completionHandler:'].implementation, {
      onEnter(args) {
        try {
          const req = new ObjC.Object(args[2]);        // NSURLRequest*
          const body = req.HTTPBody();                 // NSData*
          if (body && body.toString() !== '0x0') {
            const s = ObjC.classes.NSString
              .alloc()
              .initWithData_encoding_(body, 4)        // UTF-8
              .toString();
            log('HTTPBody @ dataTaskWithRequest:\n' + s);
          } else {
            log('HTTPBody empty or nil');
          }
        } catch (e) { log('NSURLSession hook err: ' + e); }
      }
    });
    log('---hooked--- -[NSURLSession dataTaskWithRequest:completionHandler:]');
  } catch (e) { log('cant hook' + e); }

  // fallback: when setting the body in the request (Mutable)
  try {
    const NSMutableURLRequest = ObjC.classes.NSMutableURLRequest;
    Interceptor.attach(NSMutableURLRequest['- setHTTPBody:'].implementation, {
      onEnter(args) {
        try {
          const data = new ObjC.Object(args[2]); // NSData*
          const s = ObjC.classes.NSString.alloc().initWithData_encoding_(data, 4).toString();
          log('setHTTPBody captured:\n' + s);
        } catch (e) { log('setHTTPBody err: ' + e); }
      }
    });
    log('---hooked--- -[NSMutableURLRequest setHTTPBody:]');
  } catch (e) { log('cant hook setHTTPBody: ' + e); }

  // extra fallback: before serializing the JSON (look keys and flags)
  try {
    const NSJSONSerialization = ObjC.classes.NSJSONSerialization;
    Interceptor.attach(NSJSONSerialization['+ dataWithJSONObject:options:error:'].implementation, {
      onEnter(args) {
        try {
          const dict = new ObjC.Object(args[2]); // NSDictionary*
          log('NSJSON input:\n' + dict.toString());
        } catch (e) { log('NSJSON err: ' + e); }
      }
    });
    log('---hooked--- +[NSJSONSerialization dataWithJSONObject:options:error:]');
  } catch (e) { log('cant hook NSJSONSerialization: ' + e); }
})();
