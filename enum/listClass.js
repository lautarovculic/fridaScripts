Java.perform(()=>{
    Java.enumerateLoadedClasses({
        onMatch : function(name, handle){
            if(name.includes("com.lautarovillarrealculic.supervivencia")){
                console.log(name);
            }

        },
        onComplete : function(){
            console.log("--- done ---");
        }
    });
});
