
//Database Connection and Creating Table

var db=openDatabase("itemDB","1.0","itemDB",65535);
db.transaction(function(transaction){
    var sql="CREATE TABLE Books (BookName VARCHAR(50),AuthorName VARCHAR(50),Price INTEGER,FileName VARCHAR(20))";
    transaction.executeSql(sql,undefined,function(){
        alert("Data is created successfully");
    },function(){
        alert("Table is already being created");
    })
});

//Book Constructor
class Book {
    constructor(bookname, author, price, image) {
        this.bookname = bookname;
        this.author = author;
        this.price = price;
        this.image = image;
    }
}

//Adding Adding Event Listener
let libraryform = document.getElementById("addForm");
libraryform.addEventListener('submit', LibraryFormAdd);

function LibraryFormAdd(e) {
    e.preventDefault();
    if(document.getElementById('confrCode')==12345)
    {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('imgPath').value;
    let book = new Book(name, author, price, image);

    //Storing Into Database
    loadToDatabase(book);
    console.log(book);

    libraryform.reset();
    }
    else
    alert("Wrong Code !!");

}
function loadToDatabase(book)
{
    db.transaction(function(transaction){
        var sql="INSERT INTO Books(BookName,AuthorName,Price,FileName) VALUES(?,?,?,?)";
        transaction.executeSql(sql,[book.bookname,book.author,book.price,book.image],function(){
            alert("New Item Is added Successfully");
        },function(transaction,err){
            alert(err.message);
        })
    });
    //Retrieving Data
    db.transaction(function(transaction){
        var sql="SELECT * FROM Books";
        transaction.executeSql(sql,undefined,function(transaction,result){
            localStorage.setItem('items',result.rows.length);
            for(var i=0;i<result.rows.length;i++)
            {
                var row=result.rows.item(i); 
                var bn=row.BookName;
                var an=row.AuthorName;
                var p=row.Price;
                var img=row.FileName;
                //var htmlString='<tr><td>'+bn+'</td><td>'+an+'</td><td>'+p+'</td><td>'+img+'</td></tr>';
                //var tableobj=document.getElementById('itemList');
                //tableobj.insertAdjacentHTML('afterbegin',htmlString);

                //Storing to LocalDB For Product Page
                localStorage.setItem('name'+i,bn);
                localStorage.setItem('price'+i,p);
                localStorage.setItem('image'+i,img);
            }
        },function(transaction,err){
            alert(err.message);
        })
    })

}
