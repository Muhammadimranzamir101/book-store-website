
var orderLists=localStorage.getItem('orderLists');
if(orderLists!=undefined)
{
  for(var i=1;i<=orderLists;i++)
  {
      let bn=localStorage.getItem('bookName'+i);
      let an=localStorage.getItem('authorName'+i);
      let e=localStorage.getItem('edition'+i);
      let a=localStorage.getItem('address'+i);
      let pn=localStorage.getItem('phoneNumber'+i);

      var table=document.getElementById('tableid');
      var htmlString=`
      <tr>
        <th scope="row">${orderLists}</th>
        <td>${bn}</td>
        <td>${an}</td>
        <td>@${e}</td>
        <td>@${a}</td>
        <td>@${pn}</td>
      </tr>
      `
      table.insertAdjacentHTML('afterbegin',htmlString);
  }
}
else
{
    alert("NO Orders Yet !!");
}