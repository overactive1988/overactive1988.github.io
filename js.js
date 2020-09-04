var url = "https://apiservice.mol.gov.tw/OdService/download/A17010000J-000139-rGi";
var data;
var num =0;
var month;
var perpay;
var q3answer ="";
axios.get(url).then(function(resp){
  data = resp.data;
  data.forEach(function(item) {
    num += parseInt(item.受理件數)
    month = (item.統計年月)
    perpay = (item.給付金額)
    var content = '<span>'+month+"的給付金額為"+perpay+'</span>';
    q3answer+=content
});
//1.合計受理案件數一共有多少筆
document.querySelector(".q1 p").innerHTML=num
//2.20201月份的不給付件數為多少
document.querySelector(".q2 p").innerHTML=data[0].不給付件數
//3.各月份的給付金額分別為多少
document.querySelector(".q3 p").innerHTML=q3answer
});