

// by https://github.com/anysoft
var packageName = common.getlpparam().packageName;

// package 
if (packageName == 'com.intsig.camscanner') {
    // common.hookAllMethods('android.app.ActivityThread', 'performLaunchActivity', null, function (param) {
    //     var mInitialApplication = common.getObjectField(param.thisObject, 'mInitialApplication');
    //     var classLoader = common.callMethod(mInitialApplication, 'getClassLoader');
    // });

    common.hookAllConstructors('com.intsig.camscanner.https.entity.CSQueryProperty', function (param) {
        var context = common.getcontext();
        var classLoader = context.getClassLoader();
        common.log('args:' + param.args[0]);

        // define var 
        var currentTimeMillis = java.lang.System.currentTimeMillis();
        var expireDay = 365;
        var leftTime = 1000 + 60 * 60 * 24 * expireDay;
        var freeAdLeft = leftTime;
        var expireTime = java.lang.Long.valueOf(currentTimeMillis / 1000 + leftTime);
        var boolTrue = java.lang.Boolean.TRUE
        var balanceCount = java.lang.Integer.valueOf(999);
        var pointCount = java.lang.Integer.valueOf(10000);
        var oneInt = java.lang.Integer.valueOf(1);
        // common.log('init expireTime = ' + expireTime);

        var result = param.args[0];
        var data = result.getJSONObject('data');
        // if(data.has('psnl_vip_property')){}
        // data.put('cs_license', 0);
        if (data.has('cert_mode_balance')) {
            data.put('cert_mode_balance', balanceCount);
        }
        if (data.has('excel_balance')) {
            data.put('excel_balance', balanceCount);
        }
        if (data.has('fax_balance')) {
            data.put('fax_balance', balanceCount);
        }
        if (data.has('patting_balance')) {
            data.put('patting_balance', balanceCount);
        }
        if (data.has('pdf2excel_balance')) {
            data.put('pdf2excel_balance', balanceCount);
        }
        if (data.has('pdf2ppt_balance')) {
            data.put('pdf2ppt_balance', balanceCount);
        }
        if (data.has('pdfword_balance')) {
            data.put('pdfword_balance', balanceCount);
        }
        if (data.has('profile_card_balance')) {
            data.put('profile_card_balance', balanceCount);
        }
        if (data.has('immt_expy_points')) {
            data.put('immt_expy_points', pointCount);
        }
        if (data.has('points')) {
            data.put('points', pointCount);
        }
        if (data.has('upload_pdf_balance')) {
            data.put('upload_pdf_balance', balanceCount);
        }
        if (data.has('used_points')) {
            data.put('used_points', oneInt);
        }
        if (data.has('removead')) {
            data.put('removead', oneInt);
        }
        if (data.has('watermarks_balance')) {
            data.put('watermarks_balance', balanceCount);
        }
        // data.put('payway', 0);
        // data.put('svip', 0);
        // data.put('wxpay_flag', 0);
        if (data.has('psnl_vip_property')) {
            var psnl_vip_property = data.getJSONObject('psnl_vip_property');
            psnl_vip_property.put('auto_renewal', boolTrue);
            psnl_vip_property.put('expiry', expireTime);
            psnl_vip_property.put('vip_type', 'vip');
            psnl_vip_property.put('pc_vip', oneInt);
            psnl_vip_property.put('svip', oneInt);
            psnl_vip_property.put('show_expired', java.lang.Integer.valueOf(0));
            psnl_vip_property.put('group1_paid', oneInt);
            psnl_vip_property.put('group2_paid', oneInt);
            psnl_vip_property.put('nxt_renew_tm', expireTime);
            psnl_vip_property.put('last_payment_method', 'wxpay');

            if (psnl_vip_property.has('level_info')) {
                var level_info = psnl_vip_property.getJSONObject('level_info');
                level_info.put('days', java.lang.Long.valueOf(expireDay));
                level_info.put('end_days', java.lang.Long.valueOf(30));
                level_info.put('level', java.lang.Integer.valueOf(10));
                // set back to json
                psnl_vip_property.put('level_info', level_info);
            }
            // set back to json
            data.put('psnl_vip_property', psnl_vip_property);

            // team 
            var team_vip_property = new org.json.JSONObject();
            if (data.has('team_vip_property')) {
                team_vip_property = data.getJSONObject('team_vip_property');
            }
            team_vip_property.put('expiry', expireTime);
            team_vip_property.put('initial_tm', java.lang.Long.valueOf(1599668629));
            data.put('team_vip_property', team_vip_property);
        }

        result.put('data', data);
        common.log('after result:' + result.toString());

    }, null);
}
