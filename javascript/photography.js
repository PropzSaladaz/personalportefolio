/*
    [arg] -> refers to function args specification.
*/

// Edit if needed to add new categories.
const categories = ['Nature', 'Architecture', 'Car', 'Portrait']; // Maintain same order as in HTML.

const cubicBezier = "cubic-bezier(0.6, 0, 0.02, 0.96)";
const trans = ` var(--container-grid-anim-duration) ${cubicBezier} `;

// Change by scroll position
window.addEventListener( "scroll" ,function() {
    let els = document.getElementsByClassName("landscape");
    let container = document.getElementsByClassName("container")[0].getBoundingClientRect();  //return an object with element's properties.
    let headers = this.document.getElementsByClassName("header");
    let len = els.length;
    for (let i = 0 ; i < len ; i++){
        if (container.height*i-10 < window.pageYOffset){ 
            // Change Ypos of backgroun images.
            els[i].style.top = 0.2*(window.pageYOffset - i*container.height) + "px";

            // Trigger animation of headers.
            headers[i].style.animation = "header_apearence 0.5s ease-in-out forwards";
        }
    }
});


// Given a container checks if grid is On.
const GridIsHidden = function(container){
    let bttnTxtDscrptn = container.children.item(2).children.item(2).innerHTML;
    return bttnTxtDscrptn.includes("See");
}


// Make photo grid appear when right_button is clicked.
//  [category] - String specifying which container it is refering to. 
const loadPhotos = function(category){
    let containers = document.getElementsByClassName("detailed_photos");
    /* containers:
        0 - Nature 
        1 - Architecture
    */

    // If button dscrption == "See photos" the grid is hidden.

    for (let i in categories){
        if (categories[i] === category){
            if (GridIsHidden(containers[i])) slideGridIn(containers[i]); 
            else slideGridOut(containers[i]);
            break;                 
        }
    }
}

// Slide in photo_grid.
// [container] - container div of some category (Nature, Architecture, etc...).
const slideGridIn = function(container){
    /* container's childs:
        0 - header
            0 - sub_header
        1 - landscape
        2 - right_button
            0 - inner_right_button (dashed rotational)
            1 - inner_right_button (white)
            2 - button_description
        3 - gallery_grid
            0 - img_container1
            ...
            9 - img_container10
    */

    let childs = container.children;
    // Slide the grid.
    let grid_style = childs.item(3).style;
    grid_style.width = "auto";
    grid_style.height = "auto";
    grid_style.transition = "width" + trans + ", height" + trans;
    // Sub-header animation.
    let subHeader = childs.item(0).children.item(0);
    subHeader.style.animation = "sub_header_apearence 1s ease-in-out var(--container-grid-anim-duration) forwards";
    // Blur the background and change opacity.
    let landscape_style = childs.item(1).style;
    landscape_style.filter = "blur(7px)";
    landscape_style.opacity = "0.3";
    // Change right button description.
    childs.item(2).children.item(2).innerHTML = "Hide photos";
    // Scale grid photos with random delay.
    let photos = childs.item(3).children;
    let photosLength = photos.length;
    for (let i in photos){
        let randomDelay = Math.random()/3;
        let photo = photos.item(i);
        photo.style.transitionDelay = `${1.5 + (randomDelay)}s`;
        photo.style.transform = "scale(1)";
        photo.style.opacity = "1";
        photo.style.borderRadius = 1+"rem";
    }
}


// Slide out photo_grid.
// [container] - container div of some category (Nature, Architecture, etc...).
const slideGridOut = function(container){
    /* container's childs:
        0 - header
            0 - sub_header
        1 - landscape
        2 - right_button
            0 - inner_right_button (dashed rotational)
            1 - inner_right_button (white)
            2 - button_description
        3 - gallery_grid
            0 - img_container1
            ...
            9 - img_container10
    */

    let childs = container.children;
    // Slide the grid.
    let grid_style = childs.item(3).style;
    //grid_style.transition = "width" + trans + "2s, height" + trans + "5s";
    grid_style.transition = "width" + trans + "1s";
    grid_style.width = "0";
    // Sub-header animation.
    let subHeader = childs.item(0).children.item(0);
    subHeader.style.removeProperty("animation");
    // Eliminate blur and opacity from background.
    let landscape_style = childs.item(1).style;
    landscape_style.filter = "blur(0px)";
    landscape_style.opacity = "1";
    // Change right button description.
    childs.item(2).children.item(2).innerHTML = "See photos";
    // Scale grid photos with random delay.
    let photos = childs.item(3).children;
    let photosLength = photos.length;
    for (let i in photos){
        let randomDelay = Math.random()/3;
        let photo = photos.item(i);
        photo.style.transitionDelay = `${randomDelay/2}s`;
        photo.style.transform = "scale(0)";
        photo.style.opacity = "1";
    }
}




/* Load all grid images automatically */
const loadAllImages = function(category){
    let containers = document.getElementsByClassName("detailed_photos");
    let imgContainers;
    for (let i in categories){
        if (categories[i] === category){
            imgContainers = containers[i].children.item(3).children;
            loopLoadImages(category, imgContainers);
            break;   
        }
    }

}

const loopLoadImages = function(category, imgContainers){
    let len = imgContainers.length;
    for (let i = 0 ; i < len ; i++){
        let photo = imgContainers.item(i).children.item(0).children.item(0);
        photo.src = `/Images/Photography/${category}/${i+1}.jpg`;
    }
}


for (let cat of categories){
    loadAllImages(cat);
}