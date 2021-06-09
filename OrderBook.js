
//Database Connection and Creating Table

var db=openDatabase("itemDB","1.0","itemDB",65535);
db.transaction(function(transaction){
    var sql="CREATE TABLE OderBooks (BookName VARCHAR(50),AuthorName VARCHAR(50),Edition VARCHAR(20),Address VARCHAR(50),PhoneNumber INT)";
    transaction.executeSql(sql,undefined,function(){
        alert("Data is created successfully");
    },function(){
        alert("Table is already being created");
    })
});

//Book Constructor
class Book {
    constructor(bookname, author, edition, address,phonenumber) {
        this.bookname = bookname;
        this.author = author;
        this.edition = edition;
        this.address = address;
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
    let phonenumber = document.getElementById('phoneNumber').value;
    let book = new Book(name, author, edition,address,phonenumber);

    //Storing Into Database
    loadToDatabase(book);
    console.log(book);

    libraryform.reset();

}

function loadToDatabase(book)
{
    db.transaction(function(transaction){
        var sql="INSERT INTO OrderBooks(BookName,AuthorName,Edition,Address,PhoneNumber) VALUES(?,?,?,?,?)";
        transaction.executeSql(sql,[book.bookname,book.author,book.edition,book.address,book.eaddress,book.phonenumber],function(){
            alert("New Item Is added Successfully");
        },function(transaction,err){
            alert(err.message);
        })
    });
    if(localStorage.getItem('orderitems')==undefined)
    {
        var orderItems=1;
        localStorage.setItem('orderLists',1);
        localStorage.setItem('bookName'+orderItems,book.bookname);
        localStorage.setItem('authorName'+orderItems,book.author);
        localStorage.setItem('edition'+orderItems,book.edition);
        localStorage.setItem('address'+orderItems,book.address);
        localStorage.setItem('phoneNumber'+orderItems,book.phonenumber);
    }
    else
    {
        orderItems=localStorage.getItem('orderLists')+1;
        localStorage.setItem('orderLists',orderItems);
        localStorage.setItem('bookName'+orderItems,book.bookname);
        localStorage.setItem('authorName'+orderItems,book.author);
        localStorage.setItem('edition'+orderItems,book.edition);
        localStorage.setItem('address'+orderItems,book.address);
        localStorage.setItem('phoneNumber'+orderItems,book.phonenumber);
    }


}
