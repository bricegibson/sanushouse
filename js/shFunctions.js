// header for all new reports
//ex: <script>header("Title of Report")</script>
function makeHeader(title) {

    //Header Title
    document.title = `Sanus House - ${title}`;

    //Header Div
    const header = document.querySelector('#header');
    header.style.height = "115px";
    header.style.marginBottom = "5px";
    header.style.borderBottom = "1px solid black";
    header.style.backgroundColor = "#ffffff";
    
    //Header image
    const headerImg = document.createElement("img");
    headerImg.src = "img/SanusHouseLogo.png";
    headerImg.alt = "Sanus House";
    headerImg.style.height = "110px";
    headerImg.style.width = "150px";
    headerImg.classList.add("headerImg");

    header.appendChild(headerImg);
    //header.appendChild(topNav());
    document.body.appendChild(header);
}

function topNav() {
    

}
