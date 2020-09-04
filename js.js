// 重新命名: 元素名稱+客製化名稱
var inputHeight = document.querySelector('.height');
var inputWeight = document.querySelector('.weight');
var btnSumbit = document.querySelector('.submit');
var listHistory = document.querySelector('.p-bmi__item');
var arrayBMIhistory = [];
var btnReset = document.querySelector('.reset');
//追加功能所需定義變數
var averageData = document.querySelector('.l-bmi__history h3');
var BMIcounts =0;

/* 定義物件資料，此為 BMIData物件之所有屬性 */
var BMIData = {
    "overThin":{
    class:"blue",
    statusText:"體重過輕"
    },
    "normal":{
    class:"green",
    statusText:"正常"
    },
    "overWeight":{
    class:"brown",
    statusText:"過重"
    },
    "lightFat":{
    class:"coral",
    statusText:"輕度肥胖"
    },
    "middleFat":{
    class:"crimson",
    statusText:"中度肥胖"
    },
    "veryFat":{
    class:"red",
    statusText:"重度肥胖"
    }
};

/* 處理/加入資料， */
function calculateBMI(){
    var numberHeight = inputHeight.value;
    var numberKG = inputWeight.value;
    var numberBMI = parseInt( numberKG / (( numberHeight/100 )**2 ));
    // 定義紀錄資料
    var userRecord = {
      height:'',
      weight:'',
      BMI:'',
      status:'',
    }
    // 增加資料到物件
    userRecord.height = Number(numberHeight);
    userRecord.weight = Number(numberKG);
    userRecord.BMI    = numberBMI;
    if(numberBMI<=18.5){
        userRecord.status='overThin'
      }else if(numberBMI<=24){
        userRecord.status='normal';
      }else if(numberBMI<=27){
        userRecord.status='overWeight';
      }else if(numberBMI<=30){
        userRecord.status='lightFat';
      }else if(numberBMI<=35){
        userRecord.status='middleFat';
      }else if(numberBMI>=35){
        userRecord.status='veryFat';
      }else{
        alert("請輸入正確的身高體重！");
      }//輸入異常數值時報錯
    // 增加物件到陣列
  //0707新增使用unshift()，將輸入陣列內容永遠置於第一位//
    arrayBMIhistory.unshift(userRecord);
    inputHeight.value = '';
    inputWeight.value = '';
  //運行追加功能
    average(userRecord);
  }

// average()，追加功能公式
function average(userRecord){
  BMIcounts += Number(userRecord.BMI);
  BMIaverage = Number(BMIcounts / arrayBMIhistory.length).toFixed(1);
  //追加公式跑完後，跑渲染畫面
  render();
}
/* 渲染畫面 */
function render(){
  var str ='';
  arrayBMIhistory.forEach(function(item){
    return  str +='<li><p class="status-value ' + BMIData[item.status].class+ '">' + BMIData[item.status].statusText +
    '</p><div class="c-list">BMI<span class="bmi-value">' + item.BMI +
    '</span></div><div class="c-list">height：<span class="height-value">'
    + item.height + '<sapn>cm</sapn></span></div><div class="c-list">weight：<span class="weight-value">'
    + item.weight + '<span>kg</span></span></div></li>'
  })
  listHistory.innerHTML = str;
  //將追加功能印至DOM//
  averageData.textContent ='總計測量 ' + arrayBMIhistory.length + ' 次，平均BMI為 ' + BMIaverage;
}
btnSumbit.addEventListener('click', calculateBMI);
  //清除
  btnReset.addEventListener('click', ()=>{
  arrayBMIhistory = [];
  listHistory.innerHTML =``;
  averageData.textContent =``;
});