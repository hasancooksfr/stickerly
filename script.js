const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const borderSize = document.getElementById("borderSize");
const borderValue = document.getElementById("borderValue");
const borderColor = document.getElementById("colorPick");
const downloadBtn = document.getElementById("download");

const ctx = canvas.getContext("2d");

borderSize.addEventListener("input", function () {
    borderValue.innerText = borderSize.value + "px";
    drawSticker();
    downloadBtn.style.display = "block";
})

imageInput.addEventListener("change", function () {
    drawSticker();
    downloadBtn.style.display = "block";
});

borderColor.addEventListener("change", function () {
    drawSticker();
    downloadBtn.style.display = "block";
});

downloadBtn.addEventListener("click", function () {
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;
    link.download = "stickerly.png";

    link.click();
});

function drawSticker() {
    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = function () {
        const size = Number(borderSize.value);

        canvas.width = image.width + size * 2;
        canvas.height = image.height + size * 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = -size; x <= size; x+=3) {
            for (let y = -size; y <= size; y+=3) {
                if (x * x + y * y <= size * size ) {
                    ctx.drawImage(
                        image,
                        size + x,
                        size + y
                    );
                }
            }
        }

        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = borderColor.value;

        ctx.fillRect(0,0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "source-over";

        ctx.drawImage(
            image,
            size,
            size
        );
    };
}