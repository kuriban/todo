"use strict";

require("../js-lib/modernizr");

require("../app/test");

require("../app/task");

(function () {
    if (!Modernizr.localstorage) {
        alert("Ваш браузер не поддерживает LocalStorage");
        return false;
    }
})();

//import store from "store";

//# sourceMappingURL=app-compiled.js.map