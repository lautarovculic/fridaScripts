Java.perform(()=>{
    Java.enumerateLoadedClasses({
        onMatch : function(name, handle){
            if(name.includes("com.example")){
                console.log(name);
            }

        },
        onComplete : function(){
            console.log("--- done ---");
        }
    });
});
