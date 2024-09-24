let iptBox = document.querySelector(".ipt_box");
let uoloadBtn = document.querySelector(".uoload");
let fileInput = document.querySelector(".ipt_box input");
let fileInfo = document.querySelector(".file_info");
let transBtn = document.querySelector(".trans");
let resultBox = document.querySelector(".result_box");
let controlBox = document.querySelector(".control_box");
let controlBox_P_Count = document.querySelector(".control_box p.count");
let controlBox_P_Rander = document.querySelector(".control_box p.runder");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let QrIndex = 0;
let AllIndex = 0;


uoloadBtn.addEventListener("click", () => {
    fileInput.value = "";
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    let file = fileInput.files[0];
    iptBox.classList.add("active");
    uoloadBtn.innerText = "重新选择";
    fileInfo.innerHTML = `<b>${file.name}</b> - ${(file.size / 1024).toFixed(2)}KB`
    fileInfo.style.display = "block";
    transBtn.style.display = "block";
});

transBtn.addEventListener("click", () => {
    resultBox.innerHTML = '';

    let file = fileInput.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        let data = `${JSON.stringify({ name: file.name, type: file.type })}|` + reader.result;
        controlBox.style.display = "flex";
        let dataArr = data.match(/.{1,1300}/g);
        QrIndex = 0;
        AllIndex = dataArr.length;
        ChangeView();
        controlBox_P_Count.innerHTML = `1 / ${dataArr.length}`;
        controlBox_P_Rander.style.display = "block";

        dataArr.forEach((item, index) => {
            setTimeout(async () => {
                controlBox_P_Rander.innerHTML = `正在生成第 ${index + 1} 张`

                let qrcod = document.createElement("img");
                qrcod.id = `qrcod${index}`;
                qrcod.classList.add("qrcod");
                qrcod.src = await DrawQrcode(`${JSON.stringify({ i: index, a: dataArr.length })}|${item}`)
                resultBox.appendChild(qrcod);

                if (index == dataArr.length - 1) {
                    controlBox_P_Rander.innerHTML = `生成完成`;
                    setTimeout(() => {
                        controlBox_P_Rander.style.display = "none";
                    }, 2000)
                }
            }, 200 * index)
        });
    };
});

prevBtn.addEventListener("click", () => {
    QrIndex -= 1;
    if (QrIndex < 0) QrIndex = 0;
    ChangeView();
});

nextBtn.addEventListener("click", () => {
    QrIndex += 1;
    if (QrIndex > AllIndex - 1) QrIndex = AllIndex - 1;
    ChangeView();
});

function ChangeView() {
    let el = document.getElementById(`qrcod${QrIndex}`)
    if (!el) {
        return setTimeout(() => {
            ChangeView()
        }, 200)
    }
    [...resultBox.children].forEach(item => {
        item.style.display = 'none'
    })
    el.style.display = 'block'
    controlBox_P_Count.innerHTML = `${QrIndex + 1} / ${AllIndex}`;
}

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft" || e.key == "ArrowUp") {
        prevBtn.click();
        e.preventDefault();
    } else if (e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "Enter" || e.code == "Space") {
        nextBtn.click();
        e.preventDefault();
    }
})

async function DrawQrcode(str) {
    return await QRCode.toDataURL(str, {
        errorCorrectionLevel: "L",
        margin: 4,
        scale: 5
    })
}