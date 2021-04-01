// header for all new reports
//ex: <script>header("Title of Report")</script>
function makeHeader(title) {

    //Header Title
    document.title = `Sanus House ${title}`;

    //Header Div
    const header = document.querySelector('#header');
    header.style.height = "115px";
    header.style.marginBottom = "5px";
    // header.style.borderBottom = "1px solid black";
    // header.style.backgroundColor = "#ffffff";
    
    //Header image
    const headerImg = document.createElement("img");
    headerImg.src = "img/SanusHouseLogo.png";
    headerImg.alt = "Sanus House";
    headerImg.style.height = "110px";
    headerImg.style.width = "150px";
    headerImg.classList.add("headerImg");

    header.appendChild(headerImg);
    //header.appendChild(topNav());
    //document.body.appendChild(header);
}

function topNav() {
    //Navigation (Stays on Top)
    console.log("here");
    const nav = document.querySelector('#nav');
    nav.classList.add("w3-top", "w3-bar", "w3-black", "w3-padding");
    const navTitle = document.createElement("span");
    navTitle.innerHTML = "Welcome to Sanus House";
    navTitle.style.fontSize = "1.4em";
    const navLinks= document.createElement("div");
    navLinks.classList.add("w3-right", "w3-hide-small");

    let navLink = document.createElement("a");
    navLink.href = "index.html";
    navLink.classList.add("w3-bar-item", "w3-button");
    navLink.innerHTML = "Home";
    navLinks.appendChild(navLink);

    navLink = document.createElement("a");
    navLink.href = "apply.html";
    navLink.classList.add("w3-bar-item", "w3-button");
    navLink.innerHTML = "Apply for Residency";
    navLinks.appendChild(navLink);


    nav.appendChild(navTitle);
    nav.appendChild(navLinks);

}

function sendEmail() {

    var formJSON = {};

    $('#btnSubmitSpinner').show();
    $('#btnSubmitText').text("Updating...");

    $("input, textarea").each(function() {
        formJSON[$(this).attr("id")] = $(this).val();
    });

    $("select").each(function() {
        formJSON[$(this).attr("id")] = $(this).val();
        if($(this).attr("data-text")) {
            formJSON[$(this).attr("data-text")] = $("option:selected", this).text();
        }
    });

    $.ajax({
        method: "POST",
        url: `https://uk7d698mc3.execute-api.us-west-1.amazonaws.com/Dev/apply`,
        data: JSON.stringify(formJSON),
        success: function (res) {
            //$('#btnSubmitSpinner').hide();
            $('#btnSubmitText').text("Submit");
            $('#btnSubmit').addClass("invisible");
            $('#btnSubmitStatus').addClass("alert alert-success");
            $('#btnSubmitStatus').text(`Thank you for your submission we will contact you soon to follow up.`);            
        },
        error: function(jqXHR, textStatus, errorThrown){
            $('#btnSubmitSpinner').hide();
            $('#btnSubmitText').text("Submit");
            $('#btnSubmit').addClass("invisible");
            $('#btnSubmitStatus').addClass("alert alert-success");
            $('#btnSubmitStatus').text(`There has been an error please call us at (385) 350-3013.`); 
        }
    });
}

function sendEmailNoJS() {

    var formJSON = {};

    document.querySelector('#btnSubmitText').innerHTML = "Updating..."

    inputs = document.querySelectorAll("input");
    for (i = 0; i < inputs.length; i++) {
        formJSON[inputs[i].id] = inputs[i].value;
    }

    textarea = document.querySelectorAll("textarea");
    for (i = 0; i < textarea.length; i++) {
        formJSON[textarea[i].id] = textarea[i].value;
    }

    console.log(formJSON);

    // $("select").each(function() {
    //     formJSON[$(this).attr("id")] = $(this).val();
    //     if($(this).attr("data-text")) {
    //         formJSON[$(this).attr("data-text")] = $("option:selected", this).text();
    //     }
    // });

    // $.ajax({
    //     method: "POST",
    //     url: `https://uk7d698mc3.execute-api.us-west-1.amazonaws.com/Dev/apply`,
    //     data: JSON.stringify(formJSON),
    //     success: function (res) {
    //         //$('#btnSubmitSpinner').hide();
    //         $('#btnSubmitText').text("Submit");
    //         $('#btnSubmit').addClass("invisible");
    //         $('#btnSubmitStatus').addClass("alert alert-success");
    //         $('#btnSubmitStatus').text(`Thank you for your submission we will contact you soon to follow up.`);            
    //     },
    //     error: function(jqXHR, textStatus, errorThrown){
    //         $('#btnSubmitSpinner').hide();
    //         $('#btnSubmitText').text("Submit");
    //         $('#btnSubmit').addClass("invisible");
    //         $('#btnSubmitStatus').addClass("alert alert-success");
    //         $('#btnSubmitStatus').text(`There has been an error please call us at (385) 350-3013.`); 
    //     }
    // });
}
