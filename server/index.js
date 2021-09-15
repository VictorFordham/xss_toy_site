let commentSection = document.getElementById("comments");
const params = new URLSearchParams(window.location.search);

let user = {};
let post = {};

const handleLoginFormSubmit = e => {
    e.preventDefault();
    user = { 
        username: e.target.username.value,
        session: "default",
     };

    if (e.target.username.value = "Victor" && e.target.password.value == "pass")
        user.session = "secret";
    
    const d = new Date();
    d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
    
    document.cookie = "session=" + btoa(JSON.stringify(user)) + ";expires=" + d.toUTCString() + ";path=/";
    document.location = "/xss_toy_site/";
};

const changeLogin = e => {
    e.preventDefault();
    let txt = document.getElementById("login-text");
    let tmp = e.target.innerText;
    e.target.innerText = txt.innerText;
    txt.innerText = tmp;
};

const handlePostFormSubmit = e => {
    e.preventDefault();

    window.location = "/xss_toy_site/?s=" + encodeURI(btoa(JSON.stringify({username: user.username, text: e.target.post.value})));
};

const parseCookie = () => {
    return JSON.parse(atob(document.cookie.split(";")[0].split("=")[1]));
};

window.onload = () => {
    if (document.cookie) {
        user = parseCookie();
        document.getElementById("login-page").style.display = "none";
        document.getElementById("other").style.display = "";
        document.getElementById("info").innerHTML = `
            <h1>${user.username}</h1>
        `;
    } else {
        document.getElementById("login-page").style.display = "";
        document.getElementById("other").style.display = "none";
    }

    if (params.has("s")) {
        post = JSON.parse(atob(decodeURI(params.get("s"))));
        document.getElementById("other").style.display = "none";

        document.write(`
            <div id="submitted-post" class="card">
                <h1>${post.username}</h1>
                <p> ${post.text} </p>
            </div>
        `);

        document.getElementById("submitted-post").style.display = "";
    }
};