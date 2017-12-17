setInterval(function() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
        
        var usrate = myObj.bpi.USD.rate;
        var gbrate = myObj.bpi.GBP.rate;
        var eurrate = myObj.bpi.EUR.rate;

        //Prints total number of Earthquakes read from USGS.gov site.
        document.querySelector('.uscurrency span').innerHTML = usrate;
        document.querySelector('.gbpcurrency span').innerHTML = gbrate;
        document.querySelector('.eurcurrency span').innerHTML = eurrate;
        
     }
    };

    xmlhttp.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
    xmlhttp.send();
}, 60 * 1000); // 60 * 1000 milsec
