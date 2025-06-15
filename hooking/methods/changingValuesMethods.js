Java.perform(function () {
  // change class name and package name
  var ScoreManager = Java.use('com.hackthebox.myapp.ScoreManager');

  // override implementation of the 'getScore' method in the ScoreManager class
  // you will need change the method name, acording to your app
  ScoreManager.getScore.implementation = function () {
    return 12; // Always return 12, or any other integer
  };
});
