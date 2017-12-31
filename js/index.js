
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);

        var usrate = myObj.bpi.USD.rate;
        var gbrate = myObj.bpi.GBP.rate;
        var eurrate = myObj.bpi.EUR.rate;

        //Displays Bitcoin value in US$, British Pounds and Euro.
        document.querySelector('.uscurrency span').innerHTML = "$ "+usrate;
        document.querySelector('.gbpcurrency span').innerHTML = "£ "+gbrate;
        document.querySelector('.eurcurrency span').innerHTML = "€ "+eurrate;

        //Get Bitcoin value in R$ (BRL)
        getBrlRate(usrate);

    }
}

xmlhttp.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
xmlhttp.send();

function getBrlRate () {

  var btcToBrlXmlHttp = new XMLHttpRequest();

  btcToBrlXmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var brlBitCoinObj = JSON.parse(this.responseText);

      //Get BRL rate and display in table
      var brlRate = brlBitCoinObj.ticker.sell;
      document.querySelector('.brlcurrency span').innerHTML = "$ "+ brlRate;

    }
  }

  btcToBrlXmlHttp.open('GET', 'https://www.mercadobitcoin.net/api/BTC/ticker/', true)
  btcToBrlXmlHttp.send();

}
