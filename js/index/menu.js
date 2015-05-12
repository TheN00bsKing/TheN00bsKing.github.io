function toggleMenu() {
    var ul = document.getElementById("menuBT");
    if (ul.style.height !== '0px') {
        ul.style.height = '0px';
    } else {
        ul.style.height = 'auto';
    }
}