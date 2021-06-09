
//Database Connection and Creating Table

var db=openDatabase("itemDB","1.0","itemDB",65535);
db.transaction(function(transaction){
    var sql="CREATE TABLE PurchaseBooks (BookName VARCHAR(50),AuthorName VARCHAR(50),Edition VARCHAR(20),Address VARCHAR(50),EmailAddress VARCHAR(50),PhoneNumber INT)";
    transaction.executeSql(sql,undefined,function(){
        alert("Data is created successfully");
    },function(){
        alert("Table is already being created");
    })
});

//Book Constructor
class Book {
    constructor(bookname, author, edition, address,eaddress,phonenumber) {
        this.bookname = bookname;
        this.author = author;
        this.edition = edition;
        this.address = address;
        this.eaddress=eaddress;
        this.phonenumber=phonenumber;
    }
}

//Adding Adding Event Listener
let libraryform = document.getElementById("addForm");
libraryform.addEventListener('submit', LibraryFormAdd);

function LibraryFormAdd(e) {
    e.preventDefault();
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let edition = document.getElementById('edition').value;
    let address = document.getElementById('address').value;
    let eaddress = document.getElementById('emailAddress').value;
    let phonenumber = document.getElementById('phoneNumber').value;
    let book = new Book(name, author, edition,address,eaddress,phonenumber);

    //Storing Into Database
    loadToDatabase(book);
    console.log(book);

    //libraryform.reset();

}
function loadToDatabase(book)
{
    db.transaction(function(transaction){
        var sql="INSERT INTO PurchaseBooks(BookName,AuthorName,Edition,Address,EmailAddress,PhoneNumber) VALUES(?,?,?,?,?,?)";
        transaction.executeSql(sql,[book.bookname,book.author,book.edition,book.address,book.eaddress,book.phonenumber],function(){
            alert("New Item Is added Successfully");
        },function(transaction,err){
            alert(err.message);
        })
    });
    //Retrieving Data
    db.transaction(function(transaction){
        var sql="SELECT * FROM PurchaseBooks";
        transaction.executeSql(sql,undefined,function(transaction,result){
            for(var i=0;i<result.rows.length;i++)
            {
                var row=result.rows.item(i); 
                console.log(row);   
                var bn=row.BookName;
                var an=row.AuthorName;
                var e=row.Edition;
                var a=row.Address;
                var ea=row.EmailAddress;
                var pn=row.PhoneNumber;
                var htmlString='<tr><td>'+bn+'</td><td>'+an+'</td><td>'+e+'</td><td>'+a+'</td><td>'+ea+'</td><td>'+pn+'</td></tr>';
                var tableobj=document.getElementById('itemList');
                tableobj.insertAdjacentHTML('afterbegin',htmlString);
            }
        },function(transaction,err){
            alert(err.message);
        })
    })

}
