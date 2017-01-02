import "../js-lib/modernizr";

(function (){
    if (!Modernizr.localstorage) {
        alert("Ваш браузер не поддерживает LocalStorage");
        return false;
    }
}
)();

//import store from "store";
import "../app/test";
import "../app/task";