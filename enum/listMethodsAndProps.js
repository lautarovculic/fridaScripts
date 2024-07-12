Java.perform(()=>{
    console.log("--- ok ---");
    const activityclass = Java.use("com.lautarovillarrealculic.supervivencia.MainActivity");
    console.log(activityclass);
    console.log(Object.getOwnPropertyNames(activityclass).join("\n"));
});
