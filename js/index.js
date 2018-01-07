
function valueToBrlFormat(value) {
  //formats BRL amount as per standar brazilian currency fromatting.

  return "R$ " + value.toFixed(4).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function getInternationalRates(){
  //gets bitcoin json from coindesk (US$, GBP and Euro)

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);

      var usrate = myObj.bpi.USD.rate;
      var gbrate = myObj.bpi.GBP.rate;
      var eurrate = myObj.bpi.EUR.rate;

      //Displays Bitcoin value in US$, British Pounds and Euro.
      document.querySelector('.uscurrency span').innerHTML = "$ " + usrate;
      document.querySelector('.gbpcurrency span').innerHTML = "£ " + gbrate;
      document.querySelector('.eurcurrency span').innerHTML = "€ " + eurrate;
    }
  }

  xmlhttp.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);
  xmlhttp.send();

}

function getBrlRate () {
  //gets bitcoin json from mercado bitcoin (Brazilian Reai)

  var btcToBrlXmlHttp = new XMLHttpRequest();

  btcToBrlXmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var brlBitCoinObj = JSON.parse(this.responseText);

      //Get BRL rate, format and display in table
      var brlRate = brlBitCoinObj.ticker.sell;
      var formattedBrlRate = valueToBrlFormat(parseFloat(brlRate));
      document.querySelector('.brlcurrency span').innerHTML = formattedBrlRate;

    }
  }

  btcToBrlXmlHttp.open('GET', 'https://www.mercadobitcoin.net/api/BTC/ticker/', true)
  btcToBrlXmlHttp.send();

}



function updateValues(){
  //Bitcoin value in US$, British Pounds and Euro
  getInternationalRates();
  
  //Bitcoin value in R$ (BRL)
  getBrlRate();
}


//updates values when the script runs for the first time
updateValues();

//values will be updated every 60 seconds
setInterval(updateValues, 60000);
