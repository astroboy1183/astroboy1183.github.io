let a;
let date;
let time;
// setInterval(()=>{
// a=new Date();
//     date= a.toLocaleDateString();
//     time= a.getHours()+':'+a.getMinutes()+':'+a.getSeconds()
//     document.getElementById('time').innerHTML=time+' on '+date
// },1000);

function getAndUpdate(){
    console.log('updating list')
ti=document.getElementById('title').value;
desc=document.getElementById('description').value;
    if(localStorage.getItem('itemsJson')==null){
        itemJsonArray=[];
        itemJsonArray.push([ti,desc])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr=localStorage.getItem('itemsJson')
        itemJsonArray=JSON.parse(itemJsonArrayStr)
        itemJsonArray.push([ti,desc])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    update();
}
   function update(){
    if(localStorage.getItem('itemsJson')==null){
        itemJsonArray=[];
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr=localStorage.getItem('itemsJson')
        itemJsonArray=JSON.parse(itemJsonArrayStr)
    }
    tablebody=document.getElementById('tableBody')
    let str=""
    itemJsonArray.forEach((element, index) => {
        str+= `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class='btn btn-primary' onclick='deleted(${index})'>Delete</button></td>
      </tr>`;
    });
    tablebody.innerHTML=str
}
let add=document.getElementById('add');
add.addEventListener('click',getAndUpdate);
update();

function deleted(itemIndex){
    console.log('Delete',itemIndex)
    itemJsonArrayStr=localStorage.getItem('itemsJson')
    itemJsonArray=JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex,1)
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    update();
}

function clearstr(){
    if(confirm('Do you really want to clear the list??'))
    localStorage.clear();
    console.log('clearing the storage');
    update();
}
