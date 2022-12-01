/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global letiables
 *
 */
let sections = document.querySelectorAll("section");
let sectionsArray = arrayFromsection();
const unorderedList = document.getElementById("navbar__list");
const smallPhone = window.matchMedia('(max-width: 399px )');
const phone = window.matchMedia('(min-width: 400px) and (max-width: 599px)')
const tablet = window.matchMedia('(min-width: 600px) and (max-width: 767px)');
const desktop = window.matchMedia('(min-width: 768px)');

/**
 * End Global letiables
 * Start Helper Functions
 *
 */
//convert DOMlist into array
function arrayFromsection() {
    return array = Array.from(sections);
}

//get the middle of the section between the top and bottom of the sections
function coordinate(element) {
    let between = (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top) / 2
    return between;
}
//get the list from a specific section
function getSectionList(currentsection) {
    let lists = document.querySelectorAll("li a");
    for (let list of lists) {
        if (list.getAttribute("data-list") === currentsection.getAttribute("id")) {
            return list;
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavBar() {
    // change backgroundof the header
    document.querySelector(".page__header").style.cssText = "background-color:#333;overflow:auto;white-space: nowrap;"

    //modify the style for the unorderedList
    unorderedList.style.cssText = "float: left; overflow: hidden;height:40px"

    //create a document fagment
    const docFrag = document.createDocumentFragment();

    //create a button to add new sections and modify it CSS
    const newButton = document.createElement("button");
    newButton.style.cssText = "background-color: #4CAF50;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px; position: relative;"

    newButton.textContent = "Add a new Section"
    docFrag.appendChild(newButton);

    // make a new list and add it into an the fragment
    for (let letiable of sectionsArray) {
        const newList = document.createElement('li');
        let sectionData = letiable.getAttribute("data-nav");
        let sectionId = letiable.getAttribute("id");
        newList.innerHTML = `<a data-list=${sectionId}>${sectionData}</a>`;
        newList.style.margin = "10px";
        docFrag.appendChild(newList);
    }

    //append the whole fragment into the navigation bar
    unorderedList.appendChild(docFrag);
}

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", function() {
    //loop through the sections to know which sections we are currently in
    for (let letiable of sections) {
        //get the optimal Position from the top and the bottom of the element
        let optimalPosition = coordinate(letiable);
        // check if the current section is in the viewpoint
        if (letiable.getBoundingClientRect().top < optimalPosition && letiable.getBoundingClientRect().top >= -(optimalPosition)) {
            //remove the class 'active' and remove the highlighted from every section
            for (let section of sections) {
                const sectionlist = getSectionList(section);
                sectionlist.classList.remove("scroll-hovering");
                section.classList.remove("active");
                // add the class 'active' to the section and highlight the section's list
                if (section === letiable) {
                    sectionlist.classList.add("scroll-hovering");
                    section.classList.add("active");
                }
            }
        }
    }
});

// Scroll to anchor ID using scrollIntoView event
function addScrolling(list) {
    let datalist = list.getAttribute("data-list");
    let view = document.querySelector(`#${datalist}`);
    view.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}

/**
 * End Main Functions
 * Begin Events
 *
 */
//calling the create navigation bad funciton when the page loads
document.addEventListener("load",createNavBar());

// calling the create new section for button
document.querySelector("button").addEventListener("click", function() {
    createNewSection();
});

// Build menu
// this function add a new section to the html and update the sections number
function createNewSection() {
    //create a new div
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "landing__container");

    //create a new section and give it Id and data attribute depend on the last number on the current section
    let newSection = document.createElement("section");
    newSection.setAttribute("id", `section${sections.length+1}`);
    newSection.setAttribute("data-nav", `Section ${sections.length+1}`);

    //add a new heading
    let newHeading = document.createElement("H2");
    newHeading.textContent = `Section ${sections.length+1}`;
    // get the font size of the other H2
    const anotherH2 = document.querySelector("H2");
    const h2StylesBox = window.getComputedStyle(anotherH2);
    //apply the font size to the new heading
    newHeading.style.fontSize=h2StylesBox.fontSize;

    //add a new paragraph
    let newParagraph1 = document.createElement("p");
    newParagraph1.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
    let newParagraph2 = document.createElement("p");
    newParagraph2.textContent = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
    // get the font size of the other paragraph
    const anotherP = document.querySelector("p");
    const pStylesBox = window.getComputedStyle(anotherP);
    //apply the font size to the new heading
    newParagraph1.style.fontSize=pStylesBox.fontSize;
    newParagraph2.style.fontSize=pStylesBox.fontSize;

    // append the text and heading to the div
    newDiv.appendChild(newHeading);
    newDiv.appendChild(newParagraph1);
    newDiv.appendChild(newParagraph2)

    // append the div to the section
    newSection.appendChild(newDiv);

    //append the section to the Main
    const getMain = document.querySelector("main");
    getMain.appendChild(newSection);

    // update the number of sections exists and the array of section
    sections = document.querySelectorAll("section");
    sectionsArray = arrayFromsection();

    //add a new list in the navigation bar
    const newList = document.createElement('li');
    let sectionData = sectionsArray[sectionsArray.length - 1].getAttribute("data-nav");
    let sectionId = sectionsArray[sectionsArray.length - 1].getAttribute("id");
    newList.innerHTML = `<a data-list=${sectionId}>${sectionData}</a>`;
    unorderedList.appendChild(newList);
    // get the font size of the other another list
    const anotherList = document.querySelector("li");
    const listStylesBox = window.getComputedStyle(anotherList);
    //apply the font size to the new list
    newList.style.fontSize=listStylesBox.fontSize;
    newList.style.margin = "10px";


    //add onclick event for the new list
    let newListAnchor = newList.querySelector("li a");
    newListAnchor.classList.add("highlighted");
    newListAnchor.style.padding = "7.5px";
    newListAnchor.addEventListener("click", function() {
        addScrolling(newListAnchor);
    });
}

// Scroll to section on list click
listsAnchor = document.querySelectorAll("li a");
for (let list of listsAnchor) {
    list.classList.add("highlighted");
    list.style.padding = "7.5px";
    list.addEventListener("click", function() {
        addScrolling(list);
    });
}

//initial call to check if the device is a small phone
pageResize(smallPhone);
smallPhone.addListener(pageResize);

//initial call to check if the device is a phone
pageResize(phone);
phone.addListener(pageResize);

////initial call to check if the device is a tablet
pageResize(tablet);
tablet.addListener(pageResize);

////initial call to check if the device is a desktop
pageResize(desktop);
desktop.addListener(pageResize);

// changing the display of the page depending on the device u
function pageResize(e){
  const button = document.querySelector('button');
  const sectionLists = document.querySelectorAll('li');
  const h1= document.querySelector('h1');
  const h2= document.querySelectorAll('h2');
  const p= document.querySelectorAll('p');
  // check if the size is for a small phone
  if(e.matches && e.media === '(max-width: 399px)'){
    button.style.fontSize="10px";
    sectionLists.forEach((list)=> {
      list.style.fontSize="10px";
    });
    h2.forEach((h) => {
      h.style.fontSize="2em";
    });
    h1.style.fontSize="2em";
  }

// check if the size is for a normal size phone
  else if(e.matches && e.media ==='(min-width: 400px) and (max-width: 599px)'){
   button.style.fontSize="12px";
   sectionLists.forEach((list)=> {
     list.style.fontSize="12px";
   });
   h2.forEach((h) => {
     h.style.fontSize="3em";
   });
   h1.style.fontSize="3em";
  }

// check if the size is for a tablet
  else if(e.matches && e.media ==='(min-width: 600px) and (max-width: 767px)'){
    h2.forEach((h) => {
      h.style.fontSize="4em";
    });
    p.forEach((para, i) => {
      para.style.fontSize="18px";
    });
   h1.style.fontSize="5em";
  }

  // check if the size is for a desktop
  else if(e.matches && e.media ==='(min-width: 768px)'){
    button.style.fontSize="16px";
    sectionLists.forEach((list)=> {
      list.style.fontSize="16px";
    });    h2.forEach((h) => {
      h.style.fontSize="5em";
    });
    p.forEach((para, i) => {
      para.style.fontSize="18px";
    });
    h1.style.fontSize="7em";
  }
}
