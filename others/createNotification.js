// Android ≤ 12 -> works perfectly
// Android 13+ require android.permission.POST_NOTIFICATION
// if app targetSdk < 33, may come "allowd" due compat
// if app targetSdk 33+ and permission was denied then notify() es ignorado.

Java.perform(function () {
  var AT = Java.use('android.app.ActivityThread');
  var ctx = AT.currentApplication().getApplicationContext();
  var NM = Java.use('android.app.NotificationManager');
  var NB = Java.use('android.app.Notification$Builder');
  var NC = Java.use('android.app.NotificationChannel');
  var VER = Java.use('android.os.Build$VERSION');
  var Res = Java.use('android.content.res.Resources');
  var J = Java.use('java.lang.String');

  var nm = Java.cast(ctx.getSystemService('notification'), NM);

  // static ID
  var notifId = 4242;

  // valid icon
  var icon = ctx.getApplicationInfo().icon.value;
  if (icon === 0) {
    var sys = Res.getSystem();
    icon = sys.getIdentifier(J.$new('ic_dialog_info'), J.$new('drawable'), J.$new('android'));
  }

  // builder
  var b;
  if (VER.SDK_INT.value >= 26) {
    var chId = J.$new('noti-poc');
    nm.createNotificationChannel(NC.$new(chId, J.$new('Noti PoC'), 3));
    b = NB.$new(ctx, chId);
  } else {
    b = NB.$new(ctx);
  }

  // include ID
  b.setContentTitle(J.$new('PoC'));
  b.setContentText(J.$new('Created Notification — ID=' + notifId));
  b.setSmallIcon(icon);

  var notif = b.build();

  // publish
  NM.notify.overload('int', 'android.app.Notification')
    .call(nm, notifId, notif);

  console.log('[*] Posted notification for pkg=' 
             + ctx.getPackageName()
             + ' | ID=' + notifId);
});
