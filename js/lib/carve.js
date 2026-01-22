// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Accordio toggle *-*-*-*-*-*-*-*-*-*-*-*-*-*
var accordionToggle = document.querySelectorAll('.carve-accordion-head');
var accordionItems = document.querySelectorAll('.carve-accordion');

accordionToggle.forEach((toggle, index) => {
  toggle.addEventListener('click', () => {
    accordionItems.forEach((item, i) => {
      if (i === index) {
        item.classList.toggle('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});


// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Modal *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.add('seek');
  document.body.classList.add('freeze');
};
const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  const modalChild = modal.children[0];

  modalChild.classList.add('modal-cl');
  modal.classList.add('waneout');

  setTimeout(() => {
    modal.classList.remove('seek');
    modalChild.classList.remove('modal-cl');
    modal.classList.remove('waneout');
    document.body.classList.remove('freeze');
  }, 290);
};
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Tabs toggle *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var carveMenu, carveContent, scrollTabWidth, navItem, navItemLength, tabIndicator, tabHeader;
carveMenu = document.querySelectorAll('.carve-tab-menu');
carveContent = document.querySelectorAll('.carve-tab-content');

carveMenu.forEach((tabHead, index) => {
  tabHead.addEventListener('click', () => {
    carveContent.forEach((tabBody) => {
      tabBody.classList.remove('active');
    });
    carveMenu.forEach((tab) => {
      tab.classList.remove('active');
    });
    carveMenu[index].classList.add('active');
    carveContent[index].classList.add('active');
  });
});

tabHeader = document.querySelector(".carve-tabs-head");
if (tabHeader) {
  scrollTabWidth = tabHeader.width;
  navItem = tabHeader.getElementsByClassName("carve-tab-menu");
  navItemLength = navItem.length;
  tabIndicator = document.getElementById("tabIndicator");
  tabIndicator.style.width = navItem[0].offsetWidth + "px";
}

for (let i = 0; i < navItemLength; i++) {
  navItem[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    tabIndicator.style.left = navItem[i].offsetLeft + "px";
    tabIndicator.style.width = navItem[i].offsetWidth + "px";

    var offLeft = this.offsetLeft;
    var nvWidth = this.offsetWidth;
    if (offLeft > current[0].offsetLeft) {
      tabHeader.scrollLeft = offLeft + nvWidth;
    } else {
      tabHeader.scrollLeft = offLeft - nvWidth;
    }
  });
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Drawer *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

const openDrawer = (e) => {
  const drawerId = e.currentTarget.dataset.drawer;
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;

  drawer.style.display = "block";
  drawer.classList.add("seek");
  document.body.classList.add("freeze");
};

const closeDrawer = (e) => {
  const drawerId = e.currentTarget.dataset.drawer;
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;

  const drawerChild = drawer.querySelector(".carve-drawer-inner");

  drawerChild.classList.add("drawer-hide");
  drawer.classList.add("waneout");

  setTimeout(() => {
    drawer.classList.remove("seek", "waneout");
    drawerChild.classList.remove("drawer-hide");
    drawer.style.display = "none";
    document.body.classList.remove("freeze");
  }, 290);
};

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Rise Drawer *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function riseDrawer() {
  var drawerseek = document.getElementsByClassName('rise')[0];
  drawerseek.classList.add('seek');
  document.body.classList.add('freeze');
}
function closeRiseDrawer() {
  var drawerseek = document.querySelector('.rise');
  var drawerChild = drawerseek.children[0];
  drawerChild.classList.add('fall');
  drawerseek.classList.add('waneout');
  setTimeout(() => {
    drawerseek.classList.remove('seek');
    drawerChild.classList.remove('fall')
    drawerseek.classList.remove('waneout');
    document.body.classList.remove('freeze');
  }, 290)
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Toast *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// function openToast() {
//   var seekToast = document.querySelector('.carve-toast');
//   seekToast.classList.add('seek');
//   setTimeout(() => {
//     seekToast.classList.add('modal-cl');
//   }, 3900)
//   setTimeout(() => {
//     seekToast.classList.remove('modal-cl');
//     seekToast.classList.remove('seek');
//   }, 4000)
// }

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Select filter *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

var buttontFilter, selectFilter, selectFilterText;
buttontFilter = document.querySelector('.filter-button');
selectFilter = document.querySelector('.select-filter ul');
if (selectFilter) {
  selectFilterText = selectFilter.children;
  buttontFilter.addEventListener('click', () => {
    if (selectFilter.style.display == 'block') {
      selectFilter.style.display = 'none'
    } else {
      selectFilter.style.display = 'block';
    }

  });
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*  seek Palatte *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

function seekPalette() {
  var themePalete, themePaleteSelect;
  themePalete = document.getElementById('palette');
  themePaleteSelect = document.querySelector('.themes-select');
  themePalete.classList.toggle('seek');
  themePaleteSelect.classList.toggle('palette-seek')
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Input multi file *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

var inp, filesChamber;
var inp = document.getElementById('uploadFile');
if (inp) {
  filesChamber = document.createElement('div');
  filesChamber.classList.add('file-name');
  inp.addEventListener('change', () => {
    for (var i = 0; i < inp.files.length; ++i) {
      var name, dynamicChild, btn;

      name = inp.files.item(i).name;
      dynamicChild = document.createElement('div');
      dynamicChild.classList.add('selected-file')
      btn = document.createElement('button')
      btn.classList.add('close-btn')
      dynamicChild.innerHTML = name;
      btn.innerHTML = '+'
      dynamicChild.appendChild(btn);
      filesChamber.appendChild(dynamicChild);
      inp.after(filesChamber);
      btn.addEventListener('click', (e) => {
        e.target.parentNode.remove();
        console.log(inp.name)


      })
    }
  });
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Toggle menu *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var rsHamburger, carveMenu;
rsHamburger = document.querySelector('.carve-menu-toggle');
carveMenuBlock = document.querySelector('.menu-wrapper');
if (rsHamburger && carveMenu) {
  rsHamburger.addEventListener('click', () => {
    carveMenuBlock.classList.toggle('seek');
  });
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Toggle Drawer *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function toggleDrawer() {
  var drawerLeft, drawer, drawerHeader, drawerMenuOpiton;
  drawerMenuOpiton = document.querySelector('.left-drawer .carve-drawer-body');
  listSpan = drawerMenuOpiton.querySelectorAll('ul > li span')
  drawerLeft = document.getElementsByClassName('left-drawer')[0];
  drawer = drawerLeft.children[0].children[0].children[0];
  drawerHeader = drawerLeft.children[0].children[0].children[0].children[0].children[0]
  drawer.classList.toggle('width-toggle');
  drawerHeader.classList.toggle('hidden');
  drawerLeft.children[0].children[0].children[0].children[0].children[0].nextElementSibling.classList.toggle('rotate-toggle');
  for (let i = 0; i < listSpan.length; i++) {
    listSpan[i].classList.toggle('hide');

  }
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Toggle Drawer in mobile *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function openDynamicDrawer() {
  var dynamicDrawer;
  dynamicDrawer = document.getElementById('dynamicDrawer');
  dynamicDrawer.classList.toggle('seek')
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Login *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function openSignInUp() {
  var basicModal = document.getElementById('modalSignInUp');
  basicModal.classList.add('modal-seek');
  document.body.classList.add('freeze');
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Close Sign in / Sign up *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

var closeSign, basicModal;
closeSign = document.querySelectorAll('.icon-close');
for (let i = 0; i < closeSign.length; i++) {
  closeSign[i].addEventListener('click', () => {
    basicModal = document.getElementById('modalSignInUp');
    basicModal.classList.remove('modal-seek');
    document.body.classList.remove('freeze');
  });

}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Scroll to top *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var scrollToTop, mainSection;
scrollToTop = document.querySelector('.button-fab');
mainSection = document.querySelector('.body');
window.onscroll = () => {
  if (scrollToTop) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTop.style.display = 'flex'
    } else {
      scrollToTop.style.display = 'none'
    }
  }
}

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* Close Right Drawer *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function closeRightDrawer() {
  var rightDrawer, rightDrawerInner;
  rightDrawer = document.getElementById('rightDrawer');
  rightDrawerInner = rightDrawer.childNodes[1];
  rightDrawerInner.classList.add('drawer-hide');
  setTimeout(() => {
    rightDrawerInner.classList.remove('drawer-hide');
    rightDrawer.classList.remove('seek');

  }, 300)
}
function openRightDrawer() {
  var rightDrawer;
  rightDrawer = document.getElementById('rightDrawer');
  rightDrawer.classList.add('seek');
}
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+***+*+*+*+*++*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ SCROLL TO HIDE / SHOW APP BAR *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+* */
function initializeScrollLogic() {
  let lastScrollTop = 10;

  const checkElement = setInterval(() => {
    const mainSectionWrapper = document.querySelector(".main-section-wrapper");
    const bodyBar = document.querySelector(".body-bar");

    const scrollElement = mainSectionWrapper || bodyBar;

    if (scrollElement) {
      clearInterval(checkElement);

      scrollElement.onscroll = () => {
        let menuGrp = document.getElementById("menuGroup");
        let dynamicMenu = document.querySelectorAll(".dynamicSticky");
        let header = document.getElementById("headerStrip");
        let circleBtn = document.getElementById("circleButton");

        if (scrollElement.scrollTop > lastScrollTop) {
          if (header) {
            header.classList.add("sh-trans");
            header.classList.remove("op-temp");
          }
          if (menuGrp) {
            menuGrp.classList.add("y-out");
            menuGrp.classList.remove("y-in");
          }
          dynamicMenu.forEach((menu) => {
            menu.classList.add("y-out");
            menu.classList.remove("y-in");
          });
          if (circleBtn) {
            circleBtn.classList.add("op-0");
            circleBtn.classList.remove("op-1");
          }
        } else {
          if (header) {
            header.classList.add("op-temp");
            header.classList.remove("sh-trans");
          }
          if (menuGrp) {
            menuGrp.classList.remove("y-out");
            menuGrp.classList.add("y-in");
          }
          dynamicMenu.forEach((menu) => {
            menu.classList.remove("y-out");
            menu.classList.add("y-in");
          });
          if (circleBtn) {
            circleBtn.classList.remove("op-0");
            circleBtn.classList.add("op-1");
          }
        }
        lastScrollTop = scrollElement.scrollTop;
      };
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeScrollLogic();
});

/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ FAN MENU *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
const dynamicSticky = document.getElementById("dynamicSticky");
const dynamicStickyC = document.getElementById("dynamicStickyC");
const menuGroup = document.querySelectorAll("#menuGroup, .menu-wrapper-outer");

if (dynamicSticky) {
  dynamicSticky.addEventListener("click", () => {
    menuGroup.forEach(group => group.classList.add("seek"));
    dynamicSticky.style.display = "none";
    dynamicStickyC.style.display = "flex";

    // Wait for rotation animation to finish
    menuGroup.forEach(group => group.addEventListener("animationend", handleAnimationEnd));
  });
} else {
  console.warn("Element with ID 'dynamicSticky' not found.");
}


function handleAnimationEnd() {
  menuGroup.forEach(group => group.classList.add("show-icons"));
  menuGroup.forEach(group => group.removeEventListener("animationend", handleAnimationEnd)); // remove listener
}

if (dynamicStickyC) {
  dynamicStickyC.addEventListener("click", () => {
    menuGroup.forEach(group => group.classList.remove("show-icons"));
    menuGroup.forEach(group => group.classList.add("waneout"));
    dynamicStickyC.style.display = "none";
    dynamicSticky.style.display = "flex";

    // Wait for waneout animation to finish
    menuGroup.forEach(group => group.addEventListener("animationend", handleWaneoutEnd));
  });
} else {
  console.warn("Element with ID 'dynamicStickyC' not found.");
}

/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ CAROUSEL *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
// Fetch images and build slides
const slidesList = document.querySelector("[data-slides]");
if (slidesList) {
  fetch('https://dummyjson.com/products?limit=10&select=images,title,description')
    .then(res => res.json())
    .then(data => {
      data.products.forEach((product, idx) => {
        const li = document.createElement("li");
        li.className = "carve-slide";
        if (idx === 0) li.setAttribute("data-active", "");
        li.innerHTML = `
              <img src="${product.images[0]}" alt="Slide ${idx + 1}">
              <div className="carousel-caption">
                <div className="carousel-caption-title">${product.title}</div>
                <div className="carousel-caption-desc">${product.description}</div>
              </div>
            `;
        slidesList.appendChild(li);
      });
      initCarousel();
    });
}

function initCarousel() {
  const slides = document.querySelector("[data-slides]");
  // Add a check to prevent errors if the element is still not found (e.g., due to typo)
  if (!slides) {
    console.error("Carousel container with data-slides attribute not found.");
    return; // Exit the function if slides element is null
  }
  const slideItems = slides.children;
  let currentIndex = 0;
  let isAnimating = false;
  const dotsContainer = document.querySelector('[data-carve-carousel-dots]');

  function renderDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slideItems.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'carve-carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.carve-carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'near-1', 'near-2', 'far');
      const dist = Math.abs(i - currentIndex);
      if (i === currentIndex) {
        dot.classList.add('active');
      } else if (dist === 1 || dist === (slideItems.length - 1)) {
        dot.classList.add('near-1');
      } else if (dist === 2 || dist === (slideItems.length - 2)) {
        dot.classList.add('near-2');
      } else {
        dot.classList.add('far');
      }
    });
  }

  function goToSlide(idx) {
    if (isAnimating || idx === currentIndex) return;
    isAnimating = true;
    currentIndex = idx;
    slides.style.transition = "transform 0.5s";
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    setTimeout(() => (isAnimating = false), 300);
  }
  renderDots();

  function moveSlide(offset) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += offset;
    slides.style.transition = "transform 0.5s";
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (currentIndex >= slideItems.length) {
      setTimeout(() => {
        slides.style.transition = "none";
        currentIndex = 0;
        slides.style.transform = `translateX(0)`;
        isAnimating = false;
        updateDots();
      }, 500);
    } else if (currentIndex < 0) {
      setTimeout(() => {
        slides.style.transition = "none";
        currentIndex = slideItems.length - 1;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        isAnimating = false;
        updateDots();
      }, 300);
    } else {
      setTimeout(() => (isAnimating = false), 300);
      updateDots();
    }
  }
  document.querySelectorAll("[data-carve-carousel-button]").forEach((button) => {
    button.onclick = () => moveSlide(button.dataset.carveCarouselButton === "next" ? 1 : -1);
  });
  setInterval(() => moveSlide(1), 3000);
}

/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ PAGINATION *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
const pagination = document.querySelector("#pagination");
// Check if pagination element exists before proceeding
if (pagination) {
  const buttons = pagination.querySelectorAll(".carve-button-vice");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentPage = 4; // default active page
  const totalPages = buttons.length;

  // Helper: update active page
  function setActive(page) {
    if (page < 1) page = totalPages; // wrap to last page
    if (page > totalPages) page = 1; // wrap to first page
    currentPage = page;

    buttons.forEach((btn, idx) => {
      btn.classList.toggle("active", idx + 1 === currentPage);
    });
    prevBtn.addEventListener("click", () => {
      setActive(currentPage - 1);
    });

    // Next click
    nextBtn.addEventListener("click", () => {
      setActive(currentPage + 1);
    });
  }

  // Number click
} else {
  console.warn("Pagination element with ID '#pagination' not found.");
}


/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ DOT PARTICLE *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
document.addEventListener("DOMContentLoaded", () => {
  const dotsCount = 125;
  const dotsContainer = document.getElementById("dotsContainer");

  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.style.setProperty("--x-move", `${(Math.random() * 2 - 1) * 100}px`);
    dot.style.setProperty("--y-move", `${(Math.random() * 2 - 1) * 100}px`);
    dot.style.setProperty("--x-start", `${Math.random() * 100}vw`);
    dot.style.setProperty("--y-start", `${Math.random() * 100}vh`);
    if (dotsContainer) {
      dotsContainer.appendChild(dot);
    }
  }
});
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ POPOVER *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
// OPEN universal popover
const openPopover = (e) => {
  const popId = e.currentTarget.dataset.popover;
  const pop = document.getElementById(popId);
  if (!pop) return;

  pop.style.display = "block";
  pop.classList.add("seek");
};

// CLOSE universal popover
const closePopover = (popId) => {
  const pop = document.getElementById(popId);
  if (!pop) return;

  const inner = pop.querySelector(".carve-popover-inner");

  inner.classList.add("popover-hide");
  pop.classList.add("waneout");

  setTimeout(() => {
    pop.classList.remove("seek", "waneout");
    inner.classList.remove("popover-hide");
    pop.style.display = "none";
  }, 220);
};
document.addEventListener("mousedown", function (e) {
  // Find the currently opened popover
  const openPop = document.querySelector(".carve-popover.seek");
  if (!openPop) return;

  // If clicked outside the open popover → close it
  if (!openPop.contains(e.target)) {
    closePopover(openPop.id);
  }
});

/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ POPOVER *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
// ✅ OPEN Universal Toast
const openToast = (e) => {
  const toastId = e.currentTarget.dataset.toast;
  const toast = document.getElementById(toastId);
  if (!toast) return;

  toast.classList.add("seek");

  // start closing animation
  setTimeout(() => {
    toast.classList.add("toast-cl");
  }, 3900);

  // fully hide toast
  setTimeout(() => {
    toast.classList.remove("toast-cl", "seek");
  }, 4000);
};

/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ TRANSITIONS *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
const cards = document.querySelectorAll('.anim-trigger');
const preview = document.querySelector('.anim-type');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove active from all
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Reset preview animation
    preview.className = 'anim-type';
    void preview.offsetWidth; // trigger reflow
    preview.classList.add(card.dataset.animation);
  });
});


/* +*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+ PAGE TRANSITIONS *+*+*+*+*+*+*+*+ */
/* +*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+*+*+* */
function navigateWithTransition(url) {
  const body = document.getElementById("body");

  // trigger exit animation
  body.classList.add("carve-page-transition-exit");

  // wait for transition, then load the new page
  setTimeout(() => {
    fetch(url)
      .then((r) => r.text())
      .then((html) => {
        body.innerHTML = html;

        // reset classes and trigger enter animation
        body.classList.remove("carve-page-transition-exit");
        body.classList.add("carve-page-transition-enter");

        // remove enter class after animation ends
        setTimeout(() => {
          body.classList.remove("carve-page-transition-enter");
        }, 500);
      });
  }, 500);
}

