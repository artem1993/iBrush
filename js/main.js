const activeClass = "active"
const checkClass = "check"
const visibleClass = "visible"

function spoilers() {
    const spollersArray = document.querySelectorAll("[data-spollers]")
    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0]
        })

        if (spollersRegular.length > 0) {
            initSpollers(spollersRegular)
        }

        const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
            return item.dataset.spollers.split(",")[0]
        })

        if (spollersMedia.length > 0) {
            const breakpointsArray = []
            spollersMedia.forEach(item => {
                const params = item.dataset.spollers
                const breakpoint = {} //
                const paramsArray = params.split(",")
                breakpoint.value = paramsArray[0]
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"
                breakpoint.item = item
                breakpointsArray.push(breakpoint)
            })

            let mediaQueries = breakpointsArray.map(function (item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type
            })
            mediaQueries = mediaQueries.filter(function (item, index, self) {
                return self.indexOf(item) === index
            })

            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",")
                const mediaBreakpoint = paramsArray[1]
                const mediaType = paramsArray[2]
                const matchMedia = window.matchMedia(paramsArray[0])

                const spollersArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true
                    }
                })

                matchMedia.addEventListener("change", function () {
                    initSpollers(spollersArray, matchMedia)
                })
                initSpollers(spollersArray, matchMedia)
            })
        }

        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add("_init")
                    initSpollerBody(spollersBlock)
                    spollersBlock.addEventListener("click", setSpollerAction)
                } else {
                    spollersBlock.classList.remove("_init")
                    initSpollerBody(spollersBlock, false)
                    spollersBlock.removeEventListener("click", setSpollerAction)
                }
            })
        }

        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]")
            if (spollerTitles.length > 0) {
                for (let index = 0; index < spollerTitles.length; index++) {
                    const element = spollerTitles[index]
                }
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex")
                        if (!spollerTitle.classList.contains(activeClass)) {
                            spollerTitle.nextElementSibling.hidden = true
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1")
                        spollerTitle.nextElementSibling.hidden = false
                    }
                })
            }
        }

        function setSpollerAction(e) {
            const el = e.target
            if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
                const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest("[data-spoller]")
                const spollersBlock = spollerTitle.closest("[data-spollers]")
                const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false
                if (!spollersBlock.querySelectorAll("._slide").length) {
                    if (oneSpoller && !spollerTitle.classList.contains(activeClass)) {
                        hideSpollerBody(spollersBlock)
                    }
                    spollerTitle.classList.toggle(activeClass)
                    _slideToggle(spollerTitle.nextElementSibling, 500)
                }
                e.preventDefault()
            }
        }

        function hideSpollerBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active")
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove(activeClass)
                _slideUp(spollerActiveTitle.nextElementSibling, 500)
            }
        }
    }

    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide")
            target.style.transitionProperty = "height, margin, padding"
            target.style.transitionDuration = duration + "ms"
            target.style.height = target.offsetHeight + "px"
            target.offsetHeight
            target.style.overflow = "hidden"
            target.style.height = 0
            target.style.paddingTop = 0
            target.style.paddingBottom = 0
            target.style.marginTop = 0
            target.style.marginBottom = 0
            window.setTimeout(() => {
                target.hidden = true
                target.style.removeProperty("height")
                target.style.removeProperty("padding-top")
                target.style.removeProperty("padding-bottom")
                target.style.removeProperty("margin-top")
                target.style.removeProperty("margin-bottom")
                target.style.removeProperty("overflow")
                target.style.removeProperty("transition-duration")
                target.style.removeProperty("transition-property")
                target.classList.remove("_slide")
            }, duration)
        }
    }
    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide")
            if (target.hidden) {
                target.hidden = false
            }
            let height = target.offsetHeight
            target.style.overflow = "hidden"
            target.style.height = 0
            target.style.paddingTop = 0
            target.style.paddingBottom = 0
            target.style.marginTop = 0
            target.style.marginBottom = 0
            target.offsetHeight
            target.style.transitionProperty = "height, margin, padding"
            target.style.transitionDuration = duration + "ms"
            target.style.height = height + "px"
            target.style.removeProperty("padding-top")
            target.style.removeProperty("padding-bottom")
            target.style.removeProperty("margin-top")
            target.style.removeProperty("margin-bottom")
            window.setTimeout(() => {
                target.style.removeProperty("height")
                target.style.removeProperty("overflow")
                target.style.removeProperty("transition-duration")
                target.style.removeProperty("transition-property")
                target.classList.remove("_slide")
            }, duration)
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration)
        } else {
            return _slideUp(target, duration)
        }
    }
}

function burger() {
    const iconMenu = document.querySelector(".icon-nav")
    if (iconMenu) {
        const menuBody = document.querySelector(".nav__body")
        iconMenu.addEventListener("click", function (e) {
            iconMenu.classList.toggle(activeClass)
            menuBody.classList.toggle(activeClass)
        })
    }
}

function dropdown() {
    const navBlocks = document.querySelectorAll(".nav__block")

    if (navBlocks.length > 0) {
        for (let i = 0; i < navBlocks.length; i++) {
            const navBlock = navBlocks[i]
            const dropdown = navBlock.querySelector(".dropdown")
            navBlock.addEventListener("click", function () {
                navBlocks.forEach(block => {
                    block.querySelector(".dropdown").classList.remove(activeClass)
                    block.classList.remove(activeClass)
                })
                dropdown.classList.add(activeClass)
                navBlock.classList.add(activeClass)
            })
        }
    }

    document.addEventListener("mousedown", function (e) {
        if (!e.target.closest(activeClass)) {
            navBlocks.forEach(block => {
                block.querySelector(".dropdown").classList.remove(activeClass)
                block.classList.remove(activeClass)
            })
        }
    })
}

function showLabel() {
    const inputs = document.querySelectorAll("form input")
    const inputsText = document.querySelectorAll("form input[name='name']")

    if (inputsText.length > 0) {
        for (const inputText of inputsText) {
            inputText.addEventListener("input", function () {
                inputText.value = inputText.value.replace(/[0-9]/g, "")
            })
        }
    }

    if (inputs.length > 0) {
        for (const input of inputs) {
            input.addEventListener("focus", function (e) {
                e.target.previousElementSibling.classList.add(visibleClass)
            })
            input.addEventListener("blur", function (e) {
                if (e.target.value.length == 0) {
                    e.target.previousElementSibling.classList.remove(visibleClass)
                }
            })
        }
    }
}

function starsRating() {
    const stars = document.querySelectorAll(".rating__star")
    const ratingNumber = document.getElementById("rating")
    ratingNumber.textContent = 0
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.addEventListener("click", function () {
            let starIndex = Array.prototype.indexOf.call(stars, this)
            for (let j = 0; j <= starIndex; j++) {
                stars[j].classList.add(checkClass)
                ratingNumber.textContent = j + 1
            }
            for (let j = starIndex + 1; j < stars.length; j++) {
                stars[j].classList.remove(checkClass)
            }
        })
    }
}

function popup() {
    const popupLink = document.getElementById("popup-link")
    const body = document.querySelector("body") // берем body, чтобы блокировать скролл внутри него
    const lockPadding = document.querySelectorAll(".lock-padding")
    let unlock = true
    const timeout = 800 // цифра должна быть одинаковая со стилями .popup в transition (0.8s), блокировка скролла

    popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "") // убираем из href решетку
        const currentPopup = document.getElementById(popupName) // получаем попап
        popupOpen(currentPopup) // открываем попап
        e.preventDefault()
    })

    const popupCloseIcon = document.querySelectorAll(".popup__close")
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index]
            el.addEventListener("click", function (e) {
                popupClose(el.closest(".popup")) // закрываем попап
                e.preventDefault()
            })
        }
    }

    // открытие
    function popupOpen(currentPopup) {
        // передаем готовый объект
        if (currentPopup && unlock) {
            const popupActive = document.querySelector(".popup.open")
            if (popupActive) {
                popupClose(popupActive, false) // закрываем все попапы если они есть
            }
            currentPopup.classList.add("open")
            currentPopup.addEventListener("click", function (e) {
                if (!e.target.closest(".popup__content")) {
                    popupClose(e.target.closest(".popup"))
                }
            })
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove("open")
        }
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const popupActive = document.querySelector(".popup.open")
            popupClose(popupActive)
        }
    })
    ;(function () {
        // проверяем поддержку
        if (!Element.prototype.closest) {
            // реализуем
            Element.prototype.closest = function (css) {
                var node = this
                while (node) {
                    if (node.matches(css)) return node
                    else node = node.parentElement
                }
                return null
            }
        }
    })()
    ;(function () {
        // проверяем поддержку
        if (!Element.prototype.matches) {
            // определяем свойство
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector
        }
    })()
}

$(document).ready(function () {
    // стилизация селект
    $("select").each(function () {
        var $this = $(this),
            numberOfOptions = $(this).children("option").length

        $this.addClass("select-hidden")
        $this.wrap('<div class="select"></div>')
        $this.after('<div class="select-styled icon-arrow2"></div>')

        var $styledSelect = $this.next("div.select-styled")
        $styledSelect.text($this.children("option").eq(0).text())

        var $list = $("<ul />", {
            class: "select-options",
        }).insertAfter($styledSelect)

        for (var i = 1; i < numberOfOptions; i++) {
            $("<li />", {
                text: $this.children("option").eq(i).text(),
                rel: $this.children("option").eq(i).val(),
            }).appendTo($list)
            if ($this.children("option").eq(i).is(":selected")) {
                $('li[rel="' + $this.children("option").eq(i).val() + '"]').addClass("is-selected")
            }
        }

        var $listItems = $list.children("li")

        $styledSelect.click(function (e) {
            e.stopPropagation()
            $("div.select-styled.active")
            .not(this)
            .each(function () {
                $(this).removeClass(activeClass).next("ul.select-options").hide()
            })
            $(this).toggleClass(activeClass).next("ul.select-options").toggle()
        })

        $listItems.click(function (e) {
            e.stopPropagation()
            $styledSelect.text($(this).text()).removeClass(activeClass)
            $this.val($(this).attr("rel"))
            $list.find("li.is-selected").removeClass("is-selected")
            $list.find('li[rel="' + $(this).attr("rel") + '"]').addClass("is-selected")
            $list.hide()
            //console.log($this.val());
        })

        $(document).click(function () {
            $styledSelect.removeClass(activeClass)
            $list.hide()
        })
    })
})

function swiper() {
    const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
        let swiper
        breakpoint = window.matchMedia(breakpoint)

        const enableSwiper = function (className, settings) {
            swiper = new Swiper(className, settings)

            if (callback) {
                callback(swiper)
            }
        }

        const checker = function () {
            if (breakpoint.matches) {
                return enableSwiper(swiperClass, swiperSettings)
            } else {
                if (swiper !== undefined) swiper.destroy(true, true)
                return
            }
        }

        breakpoint.addEventListener("change", checker)
        checker()
    }

    resizableSwiper("(max-width: 767.98px)", ".slider", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        autoplay: true,
        pagination: {
            el: ".slider__pagination",
        },
    })
}

spoilers()
burger()
dropdown()
showLabel()
starsRating()
popup()
swiper()
