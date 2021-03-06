
const sourceBucket = "setup.santahacks.com";
const sourceType = "application/json";
var params = {
  Bucket: sourceBucket,
  Key: 'default.json',
  Body: "",
  ContentType: sourceType,
};

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$(function () {
  $('form').submit(function () {
    var json = JSON.stringify($('form').serializeObject());
    params.Body = json;
    params.Key = document.getElementsByName('Organization')[0].value;
    params.Key = params.Key.concat(".json");
    params.Key = params.Key.replace(/ /g, '_');
    s3.putObject(params, function (err, data) {
      console.log(JSON.stringify(err) + " " + JSON.stringify(data));
    });
    setTimeout(function(){
      window.location.href="signup.html?orgname=" + document.getElementsByName('Organization')[0].value.replace(/ /g, '_');    
    }, 1000);
    return false;
  });
});
