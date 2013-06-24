// this function factors any number and returns the results
var factorial = function(n) {
    var r = n;
    for (var i=n-1;i>1;i--) {
        r*=i;
     }
    return r;
};

