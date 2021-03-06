
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(showTheChart);

function test(argument) {
  var company_name =document.getElementById("company_name").value;
  console.log(company_name);
}


function find(){
  var total_rsu_units =document.getElementById("total_rsu_units").value;
  console.log(total_rsu_units);
  var symbol_here =''
  console.log( document.getElementById("company_name").value );

  if(document.getElementById("company_name").value == 'Amazon'){
    symbol_here = 'AMZN';
  }else if( document.getElementById("company_name").value == 'Apple'){
    symbol_here = 'AAPL' 
  }else if(document.getElementById("company_name").value == 'Google' )
  symbol_here = 'GOOGL' 

  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+symbol_here+'&apikey=W2T872RWBUXZUCSG'

  $.getJSON(url, function(data){
    console.log("Loading...")
    var Last_Refreshed = data["Meta Data"]["3. Last Refreshed"];
    console.log( " LAST Refreshed : " + Last_Refreshed)
    var latest_stock_price = data["Monthly Time Series"][Last_Refreshed]["4. close"]
    console.log(latest_stock_price + " * "+ total_rsu_units + " = " + parseFloat(latest_stock_price)*total_rsu_units );
    document.getElementById("rsu_value").value = parseFloat(latest_stock_price) * total_rsu_units ;
  });
}



function drawChart() {

  var company_name =document.getElementById("company_name").value;
  var job_title =document.getElementById("job_title").value;
  var job_level =document.getElementById("job_level").value;
  var location =document.getElementById("location").value;
  var date =document.getElementById("date").value;
  var job_type =document.getElementById("job_type").value;
  var experience =document.getElementById("experience").value;
  var base_salary =document.getElementById("base_salary").value;
  var sign_on_bonus =document.getElementById("sign_on_bonus").value;
  var annual_bonus =document.getElementById("annual_bonus").value;
  var relocation_bonus =document.getElementById("relocation_bonus").value;
  var total_rsu_units =document.getElementById("total_rsu_units").value;
  var rsu_value = document.getElementById("rsu_value").value;
  var first_year_equity =document.getElementById("first_year_equity").value;
  var second_year_equity =document.getElementById("second_year_equity").value;
  var third_year_equity =document.getElementById("third_year_equity").value;
  var forth_year_equity =document.getElementById("forth_year_equity").value;
  var fifth_year_equity =document.getElementById("fifth_year_equity").value;

  

  console.log(rsu_value)

  var first_year_cash = parseInt(base_salary) + parseInt(annual_bonus) + (parseInt(sign_on_bonus)/2);
  var first_year_final_equity = (parseInt(rsu_value)/100) * parseInt(first_year_equity)
  var second_year_cash = parseInt(base_salary) + parseInt(annual_bonus) + (parseInt(sign_on_bonus)/2);
  var second_year_final_equity = (parseInt(rsu_value)/100) * parseInt(second_year_equity);
  var third_year_cash = parseInt(base_salary) + parseInt(annual_bonus) ;
  var third_year_final_equity = (parseInt(rsu_value)/100) * parseInt(third_year_equity);
  var forth_year_cash = parseInt(base_salary) + parseInt(annual_bonus) ;
  var forth_year_final_equity = (parseInt(rsu_value)/100) * parseInt(forth_year_equity);
  var fifth_year_cash = parseInt(base_salary) + parseInt(annual_bonus) ;
  var fifth_year_final_equity = (parseInt(rsu_value)/100) * parseInt(fifth_year_equity);



  var data = google.visualization.arrayToDataTable([
    ['Year', 'Total', 'Cash', 'Equity'],
    ['I Year', first_year_cash+first_year_final_equity, first_year_cash, first_year_final_equity],
    ['II Year', second_year_cash+second_year_final_equity, second_year_cash, second_year_final_equity],
    ['III Year', third_year_cash+third_year_final_equity, third_year_cash, third_year_final_equity],
    ['IV Year', forth_year_cash+forth_year_final_equity, forth_year_cash, forth_year_final_equity],
    ['V Year', fifth_year_cash+fifth_year_final_equity, fifth_year_cash, fifth_year_final_equity]
    ]);

  var options = {
    chart: {
      title: 'Your total compensation over 5 years',
      subtitle: 'You Compensation at '+company_name+' as '+ job_level + ' '+ job_title,
    },
    colors : ['#4374E0','53a8fb','#F1CA3A']
  };
  var chart = new google.charts.Bar(document.getElementById('chart_div'));
  chart.draw(data, google.charts.Bar.convertOptions(options));


  if(document.getElementById("company_name").value == 'Amazon'){
    Cmpny1 = 'Amazon'
    Symbol1 = 'AMZN'
    Cmpny2 = 'Apple'
    Symbol2 = 'AAPL'
    Cmpny3 = 'Google'
    Symbol3 = 'GOOGL'

  }else if( document.getElementById("company_name").value == 'Apple'){
    Cmpny2 = 'Amazon'
    Symbol2 = 'AMZN'
    Cmpny1 = 'Apple'
    Symbol1 = 'AAPL'
    Cmpny3 = 'Google'
    Symbol3 = 'GOOGL' 

  }else if(document.getElementById("company_name").value == 'Google' ){
    Cmpny3 = 'Amazon'
    Symbol3 = 'AMZN'
    Cmpny2 = 'Apple'
    Symbol2 = 'AAPL'
    Cmpny1 = 'Google'
    Symbol1 = 'GOOGL'
  }


  new TradingView.MediumWidget(
  {
    "symbols": [
    [
    Cmpny1,
    Symbol1
    ],
    [
    Cmpny2,
    Symbol2
    ],
    [
    Cmpny3,
    Symbol3
    ]
    ],
    "chartOnly":false,
    "width": 850,
    "height": 400,
    "locale": "in",
    "colorTheme": "light",
    "gridLineColor": "#F0F3FA",
    "trendLineColor": "#2196F3",
    "fontColor": "#787B86",
    "underLineColor": "#E3F2FD",
    "isTransparent": false,
    "autosize": false,
    "container_id": "tradingview_a7043"
  }
  );

}


function showTheChart(){
  var button = document.getElementById('showChart');
  button.onclick = function () {
    drawChart();
  }
}
