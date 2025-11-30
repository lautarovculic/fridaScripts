function listClasses()
{
for (var classname in ObjC.classes)
{
	if (ObjC.classes.hasOwnProperty(classname))
	{
		console.log(classname);
	}
}
}