function listAllMethods(){
for (var classname in ObjC.classes)
{
if (ObjC.classes.hasOwnProperty(classname))
	{
		console.log("ClassName: "+classname);
		var methodslist = ObjC.classes[classname].$ownMethods;
		for (var i = 0; i < methodslist.length; i++)
			{
				console.log("\t Method: "+methodslist[i]);
			}
	}
}
}
