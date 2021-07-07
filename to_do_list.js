const txt = document.querySelector(".txt");
//console.log(txt);
const save = document.querySelector(".save");
const list = document.querySelector(".list");
//console.log(list);
//console.log(save);
const clearAll = document.querySelector(".clearAll");
const filter = document.querySelector(".filter");
const content = document.querySelector(".content");
const count_item = document.querySelector(".count_item");
const all = document.querySelector(".all");
const undone = document.querySelector(".undone");
const done = document.querySelector(".done");
const suntitle = document.querySelector(".subtitle");

let data = [];

//渲染資料初始化
function renderData() {
    let str = "";
    let count = 0;
    if (data.length == 0) {
        content.style.display = "none";
    } else {
        content.style.display = "block";
        suntitle.style.display = "none";
    }
    //顯示全部
    if (all.classList.length == 2) {
        data.forEach(function (item, index) {
            let undoList = `<li><span data-num=${index} class="undo_check"></span><p>${item.content}</p><input class="cancel" type="button" data-num="${index}"  value="X"></li>`;
            let doneList = `<li><span data-num=${index} class="done_check"></span><p class="done">${item.content}</p><input class="cancel" type="button" data-num=${index} value="X"></li>`;
            if (item.status == "unfinished") {
                str += undoList;
                count++;
            }
            else {
                str += doneList;
            }
        })
        //console.log(str);
        list.innerHTML = str;
        console.log(str)
        count_item.textContent = `${count}個待完成項目`;
    }
    //顯示未完成
    else if (undone.classList.length == 2) {
        //console.log(undone.classList.length)
        data.forEach(function (item, index) {
            if (item.status == "unfinished") {
                str += `<li><span data-num=${index} class="undo_check"></span><p>${item.content}</p><input class="cancel" type="button" data-num="${index}"  value="X"></li>`;
                count++;
            }
        })
        //console.log(str);
        list.innerHTML = str;
        count_item.textContent = `${count}個待完成項目`;
    }
    //顯示已完成
    else if (done.classList.length == 2) {
        //console.log(done.classList.length)
        data.forEach(function (item, index) {
            if (item.status == "finished") {
                str += `<li><span data-num=${index} class="done_check"></span><p class="done">${item.content}</p><input class="cancel" type="button" data-num=${index} value="X"></li>`;
                count++;
            }
        })
        //console.log(str);
        list.innerHTML = str;
        count_item.textContent = `${count}個已完成項目`;
    }
}
renderData();


//新增功能icon
save.addEventListener("click", function (e) {
    //console.log(e);
    //console.log(txt.value);
    if (txt.value == "") {
        alert("還沒輸入待辦事項唷");
        return;
    }
    else {
        let obj = {};
        obj.content = txt.value;
        obj.status = "unfinished";
        data.push(obj);
        txt.value = "";
        renderData();
    }
});


//新增功能Enter
txt.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        if (txt.value == "") {
            alert("還沒輸入待辦事項唷");
            return;
        }
        else {
            let obj = {};
            obj.content = txt.value;
            obj.status = "unfinished";
            data.push(obj);
            txt.value = "";
            renderData();
        }

    }
})


//刪除功能
list.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") !== "cancel") {
        return;
    }
    else {
        let num = e.target.getAttribute("data-num");
        //console.log(num);
        data.splice(num, 1);//刪除指定項目
        renderData();
    }
});

//清除已完成項目
clearAll.addEventListener("click", function (e) {
    let obj = [];
    data.forEach(function (item, index) {
        if (item.status !== "finished") {
            obj.push(item);
        }
    })
    data = obj;
    renderData();
})


//切換狀態功能
list.addEventListener("click", function (e) {
    let num = e.target.getAttribute("data-num");
    //切換是否完成
    if (e.target.getAttribute("class") == "undo_check") {
        data[num].status = "finished";
    } else if (e.target.getAttribute("class") == "done_check") {
        data[num].status = "unfinished";
    }
    renderData();
})

//篩選功能
filter.addEventListener("click", function (e) {
    if (e.target.value == "全部") {
        e.target.classList.add("active");
        undone.classList.remove("active");
        done.classList.remove("active");
    } else if (e.target.value == "待完成") {
        e.target.classList.add("active");
        all.classList.remove("active");
        done.classList.remove("active");
    } else if (e.target.value == "已完成") {
        e.target.classList.add("active");
        all.classList.remove("active");
        undone.classList.remove("active");
    }
    renderData();
})