function findMethodsFromClass(classname){
var methodslist = ObjC.classes[classname].$ownMethods;
    for (var i = 0; i < methodslist.length; i++)
    {
     	console.log("\t Method: "+methodslist[i]);
    }
}
