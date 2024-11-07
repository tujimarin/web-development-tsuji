// 対象のclassを所持してるか確認
function classFindActive(findTargetElement, targetClassName) {
    if (findTargetElement.classList.contains(targetClassName)) {
        findTargetElement.classList.add(targetClassName + '--active'); //付与
    }
    else {
        // console.log('classFindActive: 発火対象が設定されていません。 対象:', findTargetElement, targetClassName);
    }
}
var types = ['transitionend', 'animationend', 'webkitAnimationEnd'];
// addEventListenerを複数対応版
var entryAddEventListenerMulti = function (target, types, handler, useCapture) {
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        target.addEventListener(type, handler, useCapture);
    }
};
// class名の要素を取得１つのみ
var getClassElement = function (element, className) {
    var contentElements = element.getElementsByClassName(className);
    var returnElement;
    returnElement = Array.from(contentElements).map(function (contentElement, index) {
        if ((contentElements.length - 1) == index) {
            return contentElement;
        }
    });
    return returnElement.shift();
};
// 特定のエレメントの最初の１つを返す
var getFirstElement = function (element, elementName) {
    var contentElements = element.querySelectorAll(elementName);
    var returnElement;
    returnElement = Array.from(contentElements).map(function (contentElement, index) {
        if ((contentElements.length - 1) == index) {
            return contentElement;
        }
    });
    return returnElement.shift();
};
// 特定のエレメントを配列に変換
// 汎用関数（例：getClassElement, getElementArray, getFirstElement, entryAddEventListenerMulti）
function getElementArray(parentElement, className) {
    var elements = parentElement.getElementsByClassName(className);
    return Array.from(elements);
}
function mediaControl(mediaElement, targetClassName) {
    if (mediaElement.classList.contains(targetClassName)) {
        if (typeof mediaElement !== 'undefined') {
            var media = mediaElement;
            media.loop = true;
            media.autoplay = true;
            // media.controls = false;
            media.muted = true;
            media.play();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var container = getClassElement(document, 'container');
    var targetElement = document.querySelector(".css-slide_content");
    var currentScrollTopMax = 0;
    var isElementInView = false; // 要素が画面内に入っているかのフラグ
    var horizontalContainerElement = document.querySelector(".horizontal-container");
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                currentScrollTopMax = container.scrollTop; // これ必須
                isElementInView = true;
            }
            else {
                isElementInView = false;
            }
        });
    }, {
        threshold: 1.0 // 100% 要素が画面に収まったとき
    });
    observer.observe(targetElement);
    var windowHeight = document.documentElement.clientHeight;
    var article = document.querySelector(".css-slide_content");
    var horizontalContainerEl = getClassElement(document, 'horizontal-container');
    var slideContentEl = getClassElement(document, 'css-slide_content');
    var slideEls = article.getElementsByClassName('js-slide');
    var creditAreaEls = article.getElementsByClassName('js-credit');
    var designFixPoint = 0; // デザインに合わせる用
    var adjustedHeight = windowHeight - 74;
    var adjustedHeightPercentage = (adjustedHeight / windowHeight) * 100;
    var contentHeight = Number(slideContentEl.clientHeight) * (creditAreaEls.length);
    // 連想配列生成前に処理
    if (window.innerWidth <= 767) {
        // contentHeight = (contentHeight/2);
        horizontalContainerEl.style.height = contentHeight + "px";
    }
    else {
        slideContentEl.style.height = "".concat(adjustedHeightPercentage, "%");
        contentHeight = Number(slideContentEl.clientHeight) * (creditAreaEls.length);
        horizontalContainerEl.style.height = contentHeight + "px";
    }
    // 連想配列（オブジェクト）を作成
    var slideMap = {};
    // slideEls を連想配列に変換
    Array.from(slideEls).forEach(function (slideEl) {
        var pageKey = Number(slideEl.dataset.page); // data-page 属性をキーに使用
        if (pageKey) {
            // 各クラスの存在を確認
            var classes = {
                jsCurrent: slideEl.classList.contains('js-current'),
                jsNext: slideEl.classList.contains('js-next'),
                jsPrevNext: slideEl.classList.contains('js-prev_next'),
                jsPrev: slideEl.classList.contains('js-prev')
            };
            // 連想配列に追加
            slideMap[pageKey - 1] = {
                element: slideEl,
                classes: classes
            };
        }
    });
    // creditAreaEls をページに関連付け
    Array.from(creditAreaEls).forEach(function (creditEl) {
        var creditKey = Number(creditEl.dataset.credit); // data-credit 属性をキーに使用
        if (creditKey && slideMap[creditKey - 1]) {
            // slideMap の該当ページに creditEl を関連付け
            slideMap[creditKey - 1].credit = creditEl;
        }
    });
    var maxSlideCount = Object.keys(slideMap).length;
    var formattedMaxSlideCount = String(maxSlideCount).padStart(2, '0');
    var pageMaxTextEl = getClassElement(document, 'js-max');
    if (pageMaxTextEl) {
        pageMaxTextEl.textContent = formattedMaxSlideCount;
    }
    var scrollCount = 0;
    var lastScrollTop = 0; // 最後のスクロール位置を記録
    var slideEl = document.querySelector('.js-slide');
    var slideElHeight = slideEl.clientHeight;
    var slideElWidth = slideEl.clientWidth;
    // const footer = document.getElementById("Foot");
    // const footerSp = document.getElementById("footer");
    if (window.innerWidth <= 767) {
        slideMap[0].element.style.top = 'calc(0%)';
        slideMap[1].element.style.top = 'calc( 100% - ' + slideElHeight + 'px )';
        slideMap[2].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
        // footerSp.style.scrollSnapAlign = 'start';
        // container.appendChild(footerSp);
    }
    else {
        slideMap[0].element.style.left = 'calc( 100% - ' + (slideElWidth + designFixPoint) + 'px )';
        // footer.style.scrollSnapAlign = 'start';
        // container.appendChild(footer);
    }
    var links = document.querySelectorAll('.js-slide');
    function addListClickEvent() {
        links.forEach(function (link) {
            link.addEventListener('click', function (event) {
                console.log(sectionHeight);
                if (link.classList.contains('js-current')) {
                    console.log('デフォルトのリンク動作を実行します');
                }
                else {
                    event.preventDefault(); // aタグのデフォルト動作を無効化
                    console.log('カスタムスクロール処理を実行します');
                    if (targetElement) {
                        container.scrollBy({
                            top: sectionHeight, // 上方向にスクロールする量（要素の高さ）
                            behavior: 'smooth' // スムーズなスクロール
                        });
                    }
                }
            });
        });
    }
    // addListClickEvent();
    function slideActive(pageNum) {
        var prev = Math.max(0, pageNum - 1); // prevは0以下にならないように
        var current = pageNum; // currentはそのままpageNum
        var next = Math.min(maxSlideCount - 1, pageNum + 1); // nextはmax値を超えないように
        var nextNext = Math.min(maxSlideCount - 1, pageNum + 2); // nextはmax値を超えないように
        var formattedCurrentSlideCount = String(pageNum + 1).padStart(2, '0');
        var pageCurrentTextEl = getClassElement(document, 'js-count');
        var others = Object.entries(slideMap).filter(function (_, index) { return index !== prev && index !== current && index !== next; });
        if (pageCurrentTextEl) {
            pageCurrentTextEl.textContent = formattedCurrentSlideCount;
        }
        if (window.innerWidth <= 767) {
            Array.from(Object.entries(others)).forEach(function (other, i) {
                var keyCount = Number(other[1][0]);
                if (prev > keyCount) {
                    other[1][1].element.classList.remove('js-current');
                    other[1][1].element.classList.add('js-prev');
                    other[1][1].element.style.top = 'calc( -10% - ' + slideElHeight + 'px )';
                    other[1][1].credit.classList.remove('js-active');
                }
                else if (next < keyCount) {
                    other[1][1].element.classList.remove('js-next');
                    other[1][1].element.classList.add('js-prev_next');
                    other[1][1].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
                    other[1][1].credit.classList.remove('js-active');
                }
            });
            if (slideMap[nextNext].element) {
                slideMap[nextNext].element.classList.remove('js-next');
                slideMap[nextNext].element.classList.add('js-prev_next');
                slideMap[nextNext].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
                slideMap[nextNext].credit.classList.remove('js-active');
            }
            if (slideMap[prev].element && pageNum != 0) {
                slideMap[prev].element.classList.remove('js-current');
                slideMap[prev].element.classList.add('js-prev');
                slideMap[prev].element.style.top = 'calc( -10% - ' + slideElHeight + 'px )';
                slideMap[prev].credit.classList.remove('js-active');
            }
            if (slideMap[next].element) {
                slideMap[next].element.classList.remove('js-current');
                slideMap[next].element.classList.remove('js-prev_next');
                slideMap[next].element.classList.add('js-next');
                slideMap[next].element.style.top = 'calc( 100% - ' + slideElHeight + 'px )';
                slideMap[next].credit.classList.remove('js-active');
                // addListClickEvent();
            }
            if (slideMap[current].element) {
                slideMap[current].element.classList.remove('js-next');
                slideMap[current].element.classList.remove('js-prev');
                slideMap[current].element.classList.remove('js-prev_next');
                slideMap[current].element.classList.add('js-current');
                slideMap[current].element.style.top = 'calc(0%)';
                slideMap[current].credit.classList.add('js-active');
            }
        }
        else {
            // PCサイズ処理
            Array.from(Object.entries(others)).forEach(function (other, i) {
                var keyCount = Number(other[1][0]);
                if (prev > keyCount) {
                    other[1][1].element.classList.remove('js-current');
                    other[1][1].element.classList.add('js-prev');
                    other[1][1].element.style.left = 'calc( 140% - ' + slideElWidth + 'px )';
                    other[1][1].credit.classList.remove('js-active');
                }
                else if (next < keyCount) {
                    other[1][1].element.classList.remove('js-next');
                    other[1][1].element.classList.add('js-prev_next');
                    other[1][1].element.style.left = 'calc(-15%)';
                    other[1][1].credit.classList.remove('js-active');
                }
            });
            if (slideMap[nextNext].element) {
                slideMap[nextNext].element.classList.remove('js-next');
                slideMap[nextNext].element.classList.add('js-prev_next');
                slideMap[nextNext].element.style.left = 'calc(-15%)';
                slideMap[nextNext].credit.classList.remove('js-active');
            }
            if (slideMap[prev].element && pageNum != 0) {
                slideMap[prev].element.classList.remove('js-current');
                slideMap[prev].element.classList.add('js-prev');
                slideMap[prev].element.style.left = 'calc( 140% - ' + slideElWidth + 'px )';
                slideMap[prev].credit.classList.remove('js-active');
            }
            if (slideMap[next].element) {
                slideMap[next].element.classList.remove('js-current');
                slideMap[next].element.classList.remove('js-prev_next');
                slideMap[next].element.classList.add('js-next');
                slideMap[next].element.style.left = 'calc( 0% )';
                slideMap[next].credit.classList.remove('js-active');
                // addListClickEvent();
            }
            if (slideMap[current].element) {
                slideMap[current].element.classList.remove('js-next');
                slideMap[current].element.classList.remove('js-prev');
                slideMap[current].element.classList.remove('js-prev_next');
                slideMap[current].element.classList.add('js-current');
                slideMap[current].element.style.left = 'calc( 100% - ' + (slideElWidth + designFixPoint) + 'px )';
                slideMap[current].credit.classList.add('js-active');
            }
        }
    }
    var maxScrollCount = maxSlideCount; // スクロールカウントの最大
    var totalDivisions = 31; // 30分割
    var sectionHeight = contentHeight / totalDivisions;
    container.addEventListener('scroll', function () {
        if (isElementInView) {
            var currentScrollTop = container.scrollTop; // 現在のスクロール位置
            var currentStep = 0;
            if (window.innerWidth <= 767) {
                currentStep = Math.ceil((currentScrollTop - (Number(slideContentEl.clientHeight) / 2)) / sectionHeight);
            }
            else {
                currentStep = Math.ceil((currentScrollTop - Number(slideContentEl.clientHeight)) / sectionHeight);
            }
            // console.log('sectionHeight', sectionHeight);
            // console.log(`現在の位置は ${totalDivisions} 分割のうち ${currentStep} です`);
            scrollCount = currentStep;
            if (currentScrollTop > lastScrollTop) {
                if (scrollCount > maxScrollCount) {
                    if (scrollCount == maxScrollCount) {
                        if (currentStep !== 0) {
                            slideActive(currentStep - 1);
                        }
                    }
                }
                else {
                    if (currentStep !== 0) {
                        slideActive(currentStep - 1);
                    }
                }
            }
            else {
                if (currentStep === 0) {
                    // slideActive(currentStep - 1)
                }
                else {
                    if (scrollCount <= maxScrollCount) {
                        slideActive(currentStep - 1);
                    }
                }
            }
            lastScrollTop = currentScrollTop; // 最後のスクロール位置を更新
        }
    });
});

function classFindGroup(findTargetElement, targetClassName) {
    var groupEls = findTargetElement.getElementsByClassName('js-fadeInGroupItem');
    Array.from(groupEls).forEach(function (groupEl, index) {
        console.log('groupEl', groupEls);
        if (Number(groupEl.dataset.target) == 1) {
            groupEl.classList.add('js-fadeInGroupFirst--active');
        }
        else {
            entryAddEventListenerMulti(groupEls[index - 1], types, function () {
                groupEl.classList.add('js-fadeInGroup--active');
            }, { once: true });
        }
    });
    // if () {
    //   findTargetElement.classList.add(targetClassName + '--active');//付与
    // }
}
document.addEventListener('DOMContentLoaded', function () {
    var landingContentEl = document.getElementById('FU240919HINA');
    if (!landingContentEl) {
        return false;
    }
    var target = landingContentEl.querySelectorAll('.js-fadeIn,.js-fadeInLeft,.js-fadeInRight,.js-fadeInBottom,.js-media,.js-fadeInGroupTarget');
    var observer = new IntersectionObserver(function (entries) {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var value = entries_1[_i];
            var element = value.target;
            if (value.isIntersecting === true) {
                classFindActive(element, 'js-fadeIn');
                classFindActive(element, 'js-fadeInLeft');
                classFindActive(element, 'js-fadeInRight');
                classFindActive(element, 'js-fadeInBottom');
                classFindGroup(element, 'js-fadeInGroupTarget');
                mediaControl(element, 'js-media');
            }
        }
    }, {
        rootMargin: '-5% 0px',
        threshold: [0]
    });
    target.forEach(function (tgt) {
        observer.observe(tgt);
    });
});
