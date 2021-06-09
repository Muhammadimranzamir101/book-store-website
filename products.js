

//Load Function
function Load() {

    console.log("Load");
    var bookPanel =document.getElementsByClassName('row');
    console.log(bookPanel);
    for(var i=0;i<localStorage.getItem('items');i++)
    {
    var bookView = `<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                    <div class="single-product">
                        <div class="product-thumb">
                            <img src="Images/${localStorage.getItem('image'+i)}.jpg">
                        </div>
                        <div class="product-title">
                            <h3><a href="">${localStorage.getItem('name'+i)}</a></h3>
                        </div>
                        <div class="product-btns">
                            <a href="" class="btn-small mr-2">$${localStorage.getItem('price'+i)}</a>
                            <a href="" class="btn-round mr-2"><i class="fa fa-shopping-cart"></i></a>
                            <a href="" class="btn-round"><i class="fa fa-heart"></i></a>
                        </div>
                    </div>  
                </div>`;
    
    bookPanel[1].innerHTML+=bookView;
    }
    //console.log(bookPanel);
    //HTMLElement.insertAdjacentHTML('afterbegin',bookView);
    //bookPanel.insertAdjacentHTML("beforeend",bookView);
    //console.log(bookPanel.innerHTML.length);

}

//Adding Adding Event Listener
//let libraryform = document.getElementById("addForm");
// let impFile= document.getElementById('impFile');
document.addEventListener('DOMContentLoaded', Load());


// function imageUpload()
// {
//     const endpoint='upload.php';
//     const formData=new FormData();

//     formData.append('impFile',impFile.files[0]);

//     fetch(endpoint,{method:'post',body:formData});
// }
