function WebtileComponent(options) {


  var style = document.createElement('style');
  style.innerHTML = `@import url("https://webtile-plugin.vercel.app/style.css");`;
  document.body.appendChild(style);


  const API_URL = "https://api.webtiles.co/api/"

  const TOGGLE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clip-rule="evenodd" />
</svg>`


  const PHONE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
</svg>
`
  const EMAIL_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
</svg>

`
  const WEB_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

`

  const NEXT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
</svg>`

  const PREV_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
</svg>`





  let defaultOptions = {
    apiKey: "",
    containerId: "webtiles",
    groupId: "",
  }

  options = { ...defaultOptions, ...options }
  let _this = this
  let webtiles = [];
  let currentWebtile = -1;
  let data = []
  this.elementFrag = null;


  this.init = function () {

    this.buildOut()



  }


  this.httpGet = function (theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    const data  = xmlHttp.responseText
    return data;
  }


  this.createGridItem = function (item) {

    gridItem = document.createElement("div");
    gridItem.className = "webtile-grid-item"
    gridItem.innerHTML = `
 
    <div class="webtile-business-logo-box">
        <div class="webtile-business-logo" style="background-image: url(${item.logoUrl ? item.logoUrl : item.image ? item.image : ''});">
        </div>
    </div>
    <div class="webtile-business-content-box">
        <span class="webtile-business-name">${item.name}</span>
        <span class="webtile-business-website">
        ${item.website1 ? item.website1 :
          ''}</span>
        <div class="webtile-business-btn-group">
            <div class="webtile-business-btn see-webtile" data-id="${item.tilename}">See Webtile</div>
            ${item.website1 ?
            `<a target="_blank" href="${item.website1}" class="webtile-business-btn">See Website</a>`
            : '<div></div>'}
        </div>

    </div>
    
    `

    return gridItem

  }


  this.createLandingBlock = function (data) {

    var webtileLandingBlock, logoBlock, buttonGroup, knowButton, videoButton

    webtileLandingBlock = document.createElement("div");
    logoBlock = document.createElement("div");
    buttonGroup = document.createElement("div");
    knowButton = document.createElement("button");
    videoButton = document.createElement("button");

    webtileLandingBlock.className = "webtile-block-landing";
    logoBlock.className = "webtile-block-logo";
    buttonGroup.className = "webtile-block-button-group";

    knowButton.className = "webtile-block-button"
    knowButton.id = "knowMore"
    knowButton.innerText = "Know more"

    videoButton.className = "webtile-block-button ml-sm"
    videoButton.id = "videoButton"
    videoButton.innerText = "Video"

    buttonGroup.appendChild(knowButton)

   
    buttonGroup.appendChild(videoButton)
    
  

    logoBlock.style.backgroundImage = `url(${data.logoUrl})`
    webtileLandingBlock.style.backgroundImage = `url(${data.image})`

    webtileLandingBlock.appendChild(logoBlock)
    webtileLandingBlock.appendChild(buttonGroup)


    return webtileLandingBlock;
  }

  this.createToggleButton = function () {
    var toggleButton;

    toggleButton = document.createElement("div")
    toggleButton.id = "toggleButton"
    toggleButton.innerHTML = TOGGLE_ICON
    return toggleButton;
  }


  this.createActionButton = function (link, type) {

    var actionButtonElement;

    actionButtonElement = document.createElement("a")
    actionButtonElement.className = "webtile-block-action-item"
    actionButtonElement.href = link
    actionButtonElement.target = "_blank"

    if (type === "phone") {
      actionButtonElement.innerHTML = PHONE_ICON
    }
    else if (type === "email") {
      actionButtonElement.innerHTML = EMAIL_ICON
    }
    else if (type === "website") {
      actionButtonElement.innerHTML = WEB_ICON
    }

    return actionButtonElement
  }

  this.createActionBlock = function (data) {

    var webtileLandingBlock;

    webtileLandingBlock = document.createElement("div");
    webtileLandingBlock.className = "webtile-block-action-container";
    webtileLandingBlock.appendChild(this.createToggleButton())

    if (data.phone1) {
      webtileLandingBlock.appendChild(this.createActionButton(`tel:${data.phone1}`, 'phone'))
    }
    if (data.website1) {
      webtileLandingBlock.appendChild(this.createActionButton(`${data.website1}`, 'website'))
    }
    if (data.email1) {
      webtileLandingBlock.appendChild(this.createActionButton(`mailto:${data.email1}`, 'email'))
    }


    return webtileLandingBlock;
  }

  this.createImageBlock = function (image, i, slideLength) {
    var slideBlock, slideCount, imageBlock;

    slideBlock = document.createElement("div");
    slideCount = document.createElement("div");
    imageBlock = document.createElement("img");

    imageBlock.style.width = "100%"
    imageBlock.src = image

    slideBlock.className = "mySlides webtile-block-knowmore-fade"

    slideCount.className = "webtile-block-knowmore-numbertext"
    slideCount.innerHTML = `${i}/${slideLength}`

    slideBlock.appendChild(slideCount)
    slideBlock.appendChild(imageBlock)

    return slideBlock;
  }

  this.createKnowBlock = function (data) {
    var knowBlock, slideContainer, knowButtonGroup, knowCloseButton, PrevButton, NextButton;
    knowBlock = document.createElement("div");
    knowButtonGroup = document.createElement("div");
    slideContainer = document.createElement("div")
    knowCloseButton = document.createElement("button")
    PrevButton = document.createElement("a")
    NextButton = document.createElement("a")



    PrevButton.className = "webtile-block-knowmore-prev"
    PrevButton.id = "webtile-block-knowmore-prev"
    NextButton.className = "webtile-block-knowmore-next"
    NextButton.id = "webtile-block-knowmore-next"
    PrevButton.innerHTML = PREV_ICON
    NextButton.innerHTML = NEXT_ICON

    knowCloseButton.innerText = "Close"


    slideContainer.className = "webtile-block-knowmore-slideshow-container"
    knowButtonGroup.className = "webtile-block-knowmore-button-group"
    knowCloseButton.className = "webtile-block-button"
    knowCloseButton.id = "webtile-block-knowmore-close"
    knowBlock.className = "webtile-block-knowmore"


    if (data.images.length > 0) {
      let slideLength = data.images.length
      data.images.forEach((image, i) => {

        slideContainer.appendChild(this.createImageBlock(image, i + 1, slideLength))

      });

    }

    else {
      knowBlock.innerHTML = "No content"
    }

    slideContainer.appendChild(PrevButton)
    slideContainer.appendChild(NextButton)
    knowButtonGroup.appendChild(knowCloseButton)
    knowBlock.appendChild(slideContainer)
    knowBlock.appendChild(knowButtonGroup)




    return knowBlock;
  }

  this.createVideoBlock = function (data) {
    var videoBlockElement, webtileVideo, videoButtonGroup, videoCloseButton, videoPlayButtonElement;
    videoBlockElement = document.createElement("div");
    videoButtonGroup = document.createElement("div");
    videoCloseButton = document.createElement("button");
    videoPlayButtonElement = document.createElement("button");


    videoBlockElement.className = "webtile-block-video"
    videoButtonGroup.className = "webtile-block-knowmore-button-group"

    videoCloseButton.className = "webtile-block-button"
    videoCloseButton.id = "webtile-block-video-close"
    videoCloseButton.innerText = "Close"
    videoPlayButtonElement.id = "webtile-block-playButton"
    videoPlayButtonElement.className = "webtile-block-button ml-sm"
    videoPlayButtonElement.innerText = "Play"

    webtileVideo = document.createElement("video");
    webtileVideo.id = "webtile-block-video"
    webtileVideo.src = data.videoUrl;


    videoButtonGroup.appendChild(videoCloseButton)
    videoButtonGroup.appendChild(videoPlayButtonElement)
    videoBlockElement.appendChild(webtileVideo)
    videoBlockElement.appendChild(videoButtonGroup)


    return videoBlockElement;
  }



  this.createWebtilePopup = function (webtileId) {
    var newFrag, webtileWrap, webtileContainer, webtileLandingBlock, webtileKnowBlock, webtileVideoBlock,
      newFrag = document.createDocumentFragment();
    data = JSON.parse(this.httpGet(`${API_URL}/Webtile/getcard/${webtileId}`))
    // console.log({ data })


    webtileContainer = document.createElement("div");
    webtileWrap = document.createElement("div");
    webtileWrap.className = "webtile-block-container-backdrop"
    webtileContainer.className = "webtile-block-container"
    webtileContainer.appendChild(this.createLandingBlock(data))
    webtileContainer.appendChild(this.createActionBlock(data))
    webtileContainer.appendChild(this.createKnowBlock(data))
    webtileContainer.appendChild(this.createVideoBlock(data))
    newFrag.appendChild(webtileWrap)
    newFrag.appendChild(webtileContainer)

    document.body.appendChild(newFrag)
    let _this = this;
    _this.otherActions()

  }

  this.buildOut = function () {
    let data = JSON.parse(this.httpGet(`${API_URL}/Webtile/getcardsbygroup/${options.groupId}`))
    console.log({data})
    var content, contentHolder, grid, watermark, gridWrap, gridItem, docFrag;
    docFrag = document.createDocumentFragment();
    grid = document.createElement("div");
    grid.className = "webtile-grid";

    data.forEach(item => {
      grid.appendChild(this.createGridItem(item))
    });



    watermark = document.createElement("div");
    watermark.className = "webtile-footer"
    watermark.innerHTML = `Powered by <a href="https://webtiles.co" class="webtile-link">Webtiles</a>`


    gridWrap = document.createElement("div");
    gridWrap.className = "webtile-wrapper"
    gridWrap.appendChild(grid)
    gridWrap.appendChild(watermark)

    docFrag.appendChild(gridWrap);
    contentHolder = document.getElementById(options.containerId)
    contentHolder.classList.add("fix-element")
    contentHolder.appendChild(docFrag);

    var cardElements = document.getElementsByClassName('see-webtile')

    let _this = this


    Array.from(cardElements).forEach(function (element) {
      try{
        element.addEventListener('click', myFunction);
      }

      catch(err){
        return false;
      }
      
    });

    function myFunction() {
      //       var rmElement = document.getElementsByClassName('webtile-block-container-backdrop')[0];
      //       var rmElement2 = document.getElementsByClassName('webtile-block-container')[0];

      // if(rmElement && rmElement2){
      //   rmElement.parentNode.removeChild(rmElement); 
      //   rmElement2.parentNode.removeChild(rmElement2); 
      // }
      var attribute = this.getAttribute("data-id");
      _this.createWebtilePopup(attribute)

    }



  }

  this.otherActions = function () {

    // Other Actions



    var toggleButton = document.getElementById('toggleButton');
    var knowMoreClose = document.getElementById('webtile-block-knowmore-close');
    var videoClose = document.getElementById('webtile-block-video-close');
    var videoElement = document.getElementById('webtile-block-video');
    var videoPlayButton = document.getElementById('webtile-block-playButton');

    var knowMoreButton = document.getElementById('knowMore');
    var videoButton = document.getElementById('videoButton');
    var actionBlock = document.getElementsByClassName('webtile-block-action-container')[0]
    var knowMoreBlock = document.getElementsByClassName('webtile-block-knowmore')[0]
    var videoBlock = document.getElementsByClassName('webtile-block-video')[0]

    var rmElement = document.getElementsByClassName('webtile-block-container-backdrop')[0];
    var rmElement2 = document.getElementsByClassName('webtile-block-container')[0];

    rmElement.addEventListener('click', () => {
      rmElement.style.opacity = '0'
      rmElement2.style.opacity = '0'
      setTimeout(function () {

        try {


          rmElement.parentNode.removeChild(rmElement);
          rmElement2.parentNode.removeChild(rmElement2);

        }

        catch (err) {
          return false
        }
      }, 1000);


    })


    toggleButton.addEventListener('click', () => {
      if (actionBlock.style.transform === 'translateX(160px)') {
        actionBlock.style.transform = 'translateX(0px)'
        toggleButton.style.transform = 'rotate(0deg)'
      }

      else {
        actionBlock.style.transform = 'translateX(160px)'
        toggleButton.style.transform = 'rotate(180deg)'

      }
    })

    setTimeout(() => {
      actionBlock.style.transform = 'translateX(160px)'
      toggleButton.style.transform = 'rotate(180deg)'
    }, 1000);

    knowMoreButton.addEventListener('click', () => {


      knowMoreBlock.style.transform = 'translateY(0px)'


    })
    knowMoreClose.addEventListener('click', () => {
      knowMoreBlock.style.transform = 'translateY(220px)'
    })

    videoClose.addEventListener('click', () => {
      videoBlock.style.transform = 'translateY(220px)'
      videoPlayButton.innerText = "Play"
      videoElement.currentTime = 0;
      videoElement.pause()
    })
    videoPlayButton.addEventListener('click', () => {
      if (videoElement.paused) {
        videoPlayButton.innerText = "Pause"
        videoElement.play()
      }

      else {
        videoPlayButton.innerText = "Play"
        videoElement.pause()
      }

    })

    videoButton.addEventListener('click', () => {


      videoBlock.style.transform = 'translateY(0px)'


    })


    // End Other Actions


    // Slider Config

    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    var prev = document.getElementById('webtile-block-knowmore-prev');
    var next = document.getElementById('webtile-block-knowmore-next');

    prev.addEventListener('click', () => {
      plusSlides(-1)
    })

    next.addEventListener('click', () => {
      plusSlides(1)
    })

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "flex";
    }


    // End Slider Config



  }


}


(function () {



})