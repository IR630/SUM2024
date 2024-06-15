window.addEventListener("load", () => {
  let inputImg = document.querySelector("#imgInput");

  imgInput.addEventListener("change", () => {
    let url = URL.createObjectURL(inputImg.files[0]);

    let canvas = document.getElementById("MyPic");
    let ctx = canvas.getContext("2d");

    const img = new Image(200, 200);  
    img.onload = drawImage;

    img.src = url;

    function drawImage() {
      ctx.drawImage(this, 0, 0);
      const imgPixels = ctx.getImageData(0, 0, img.width, img.height);
      for (let y = 0; y < canvas.height; y++)
        for (let x = 0; x < canvas.width; x++) {
          let i = (y * imgPixels.width + x) * 4;
          let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
        }
      ctx.putImageData(imgPixels, 0, 100, 0, 0, imgPixels.width, imgPixels.height);
      
      let
        v = [],
        z = [];

      //const imgPixels = ctx.getImageData(0, 0, img.width, img.height);
      for (let i = 0; i < canvas.height; i++)
        for (let q = 0; q < canvas.width; q++) {
          let p = (i * imgPixels + q) * 4; //(q + imgPixels.width) * 4;
          let d, l;

          if (imgPixels.data[p] == 255) {
            l = 1;
          } else {
            l = 0;
          }
          if (v.length == 0) {
            v.push(p);
          } else {
            let s = ((l + p * p) - (l + q * q)) / (2 * p - 2 * q);           
            v[p] = (q - p) * (q - p) + l;
            }
          }


          // if (imgPixels.data[0] == 255) l = Infinity;

          // if (imgPixels.data[p] == 255) {
          //   l = 0;
          // } else {
          //   if (p < q)
          //     d = q - p;
          //   else
          //     d = p - q;
          //   l = d * d;
          // }

          // imgPixels.data[p] = Math.min(d + l);
          // // let s = ((l[p] + p * p) - (l[p] + q * q)) / (2 * p - 2 * q);

          // z[p] = (q - p) * (q - p);
          // v.pop(p);
      ctx.putImageData(imgPixels, 0, 200, 0, 0, imgPixels.width, imgPixels.height);
    }
  });
});