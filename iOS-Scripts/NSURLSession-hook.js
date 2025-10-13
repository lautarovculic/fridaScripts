if (!ObjC.available) throw new Error("ObjC not available");

function nsstr(p) { return new ObjC.Object(p).toString(); }

function dumpHeaders(hPtr) {
  if (!hPtr || ptr(hPtr).isNull()) return "{}";
  const d = new ObjC.Object(hPtr);
  const keys = d.allKeys();
  const out = [];
  for (let i = 0; i < keys.count(); i++) {
    const k = keys.objectAtIndex_(i).toString();
    const v = d.objectForKey_(keys.objectAtIndex_(i)).toString();
    out.push(`${k}: ${v}`);
  }
  return "{ " + out.join(" | ") + " }";
}

const NSURLSession = ObjC.classes.NSURLSession;
const NSURLSessionTask = ObjC.classes.NSURLSessionTask;

// dataTaskWithURL: (+ completionHandler:)
["- dataTaskWithURL:", "- dataTaskWithURL:completionHandler:"].forEach(sel => {
  if (NSURLSession[sel]) {
    Interceptor.attach(NSURLSession[sel].implementation, {
      onEnter(args) {
        try {
          const url = new ObjC.Object(args[2]).absoluteString().toString();
          console.log(`[NSURLSession ${sel}] URL=${url}`);
        } catch (_) {}
      }
    });
  }
});

// dataTaskWithRequest: (+ completionHandler:) — con null-safety real
["- dataTaskWithRequest:", "- dataTaskWithRequest:completionHandler:"].forEach(sel => {
  if (NSURLSession[sel]) {
    Interceptor.attach(NSURLSession[sel].implementation, {
      onEnter(args) {
        try {
          const reqPtr = args[2];
          if (ptr(reqPtr).isNull()) return;
          const R = new ObjC.Object(reqPtr);

          const url = R.URL() ? R.URL().absoluteString().toString() : "<nil>";
          const method = R.HTTPMethod() ? R.HTTPMethod().toString() : "GET?";

          const hdrsPtr = R.allHTTPHeaderFields();
          const headers = dumpHeaders(hdrsPtr);

          let bodyLen = 0;
          const bodyPtr = R.HTTPBody();
          if (bodyPtr && !ptr(bodyPtr).isNull()) {
            const body = new ObjC.Object(bodyPtr);
            if (body.respondsToSelector_("length")) bodyLen = body.length();
          }

          console.log(`[NSURLSession ${sel}] ${method} ${url}\n  Headers=${headers}\n  BodyLen=${bodyLen}`);
        } catch (e) {
          console.log(`[HookError ${sel}] ${e}`);
        }
      }
    });
  }
});

// resume
if (NSURLSessionTask["- resume"]) {
  Interceptor.attach(NSURLSessionTask["- resume"].implementation, {
    onEnter(args) {
      try {
        const task = new ObjC.Object(args[0]);
        const reqPtr = task.currentRequest();
        if (!reqPtr || ptr(reqPtr).isNull()) return;

        const R = new ObjC.Object(reqPtr);
        const url = R.URL() ? R.URL().absoluteString().toString() : "<nil>";
        const method = R.HTTPMethod() ? R.HTTPMethod().toString() : "GET?";
        const headers = dumpHeaders(R.allHTTPHeaderFields());

        let bodyLen = 0;
        const bodyPtr = R.HTTPBody();
        if (bodyPtr && !ptr(bodyPtr).isNull()) {
          const body = new ObjC.Object(bodyPtr);
          if (body.respondsToSelector_("length")) bodyLen = body.length();
        }

        console.log(`[NSURLSessionTask resume] ${method} ${url}\n  Headers=${headers}\n  BodyLen=${bodyLen}`);
      } catch (e) {
        console.log(`[HookError resume] ${e}`);
      }
    }
  });
}
