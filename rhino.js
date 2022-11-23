// by https://github.com/anysoft
var packageName = common.getlpparam().packageName;
// package 
if (packageName == 'com.dragon.read') {
    // get classloader
    // common.log('a');
    common.hookAllMethods('android.app.ActivityThread', 'performLaunchActivity', null, function (param) {
        var mInitialApplication = common.getObjectField(param.thisObject, 'mInitialApplication');
        var classLoader = common.callMethod(mInitialApplication, 'getClassLoader');
        // common.log(classLoader);
        // hook method 
        // common.log('b')
        common.hookAllConstructors('com.dragon.read.user.h', function (param) {
            // common.log('c')
            // common.log(param.args.length)
            if (param.args.length == 2) {
                // common.log(param.args[0])
                // common.log(param.args[1])
                var infoResponse = param.args[1];
                // define var 
                var currentTimeMillis = java.lang.System.currentTimeMillis();
                var expireDay = 365;
                var leftTime = 1000 + 60 * 60 * 24 * expireDay;
                var freeAdLeft = leftTime;
                var expireTime = java.lang.Long.valueOf(currentTimeMillis / 1000 + leftTime);
                // common.log('init expireTime = ' + expireTime);

                var data = infoResponse.data;
                data.freeAd = true;
                data.freeAdDay = java.lang.Integer.valueOf(expireDay)
                data.freeAdExpire = expireTime;
                data.freeAdLeft = java.lang.Long.valueOf(freeAdLeft);
                data.hasMedal = true;
                data.vipLastExpiredTime = java.lang.Long.valueOf(1654752180).toString();

                var vipInfo = data.vipInfo;
                vipInfo.continueMonth = true;
                vipInfo.continueMonthBuy = true;
                vipInfo.expireTime = expireTime.toString();
                vipInfo.isVip = '1';
                vipInfo.leftTime = java.lang.Long.valueOf(leftTime).toString();
                data.vipInfo = vipInfo;
                infoResponse.data = data;
                //set result into param.args
                param.args[1] = infoResponse;
            } else {
                common.log('length not equal 2')
            }
        }, null);
    });
}
