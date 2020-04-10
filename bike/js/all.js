let place = document.getElementById('zone');
let title = document.querySelector('.place-name');
let detail = document.querySelector('.place-detail');
let str= ``;
//select data
const placeData=["中區","東區","北區","西區","南區","北屯區","西屯區","南屯區","太平區","西屯區","南屯區","太平區","大甲區","豐原區","大里區","霧峰區","后里區","外埔區","沙鹿區","梧棲區","大肚區","和平區","清水區","大雅區","烏日區"];
let placeStr=``;
const placeLen = placeData.length;
const firstSelected= `<option disabled selected>- - 請選擇行政區 - -</option>`;
for( let i=0 ; i<placeLen ;i++){
    placeStr+=`<option value="${placeData[i]}">${placeData[i]}</option>`
}
place.innerHTML=firstSelected+placeStr;

place.addEventListener('change',filter,false);

function filter(e){
    e.preventDefault();
    str = e.target.value;
    title.textContent = str;
    detail.innerHTML=``;
    getData();
}

function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open('get',' https://datacenter.taichung.gov.tw/swagger/OpenData/91deb8b8-7547-4a60-8cae-7c95c0df2fda',true);
    xhr.send(null);
    xhr.onload=function(){
        var callBack = JSON.parse(xhr.responseText);
        let len = callBack.length;
        for ( let i =0 ; i<len ; i++){
            if(callBack[i].CArea==str){
                detail.innerHTML+=`  <li>
                    
                    <div class="bottom">
                        <div class="icon"> 
                            <span>地區: ${callBack[i].CArea}</span>
                        </div>
                        <div class="icon"> 
                            <span>位置: ${callBack[i].Position} - ${callBack[i].CAddress}</span>
                        </div>
                        <div class="icon">
                            <span>剩餘數量: ${callBack[i].EmpCNT}</span>
                        </div>
                        <div class="icon">
                            <span>更新時間: ${callBack[i].UpdateTime}</span>
                    </div>
            </li>`
            }
        }
    }
}




