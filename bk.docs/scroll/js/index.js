// 対象のclassを所持してるか確認
function classFindActive(findTargetElement, targetClassName) {
    if (findTargetElement.classList.contains(targetClassName)) {
        findTargetElement.classList.add(targetClassName + '--active'); //付与
    }
    else {
        // console.log('classFindActive: 発火対象が設定されていません。 対象:', findTargetElement, targetClassName);
    }
}
const types = ['transitionend', 'animationend', 'webkitAnimationEnd'];
// addEventListenerを複数対応版
const entryAddEventListenerMulti = (target, types, handler, useCapture) => {
    for (let type of types) {
        target.addEventListener(type, handler, useCapture);
    }
};
// class名の要素を取得１つのみ
const getClassElement = (element, className) => {
    const contentElements = element.getElementsByClassName(className);
    let returnElement;
    returnElement = Array.from(contentElements).map(function (contentElement, index) {
        if ((contentElements.length - 1) == index) {
            return contentElement;
        }
    });
    return returnElement.shift();
};
// 特定のエレメントの最初の１つを返す
const getFirstElement = (element, elementName) => {
    const contentElements = element.querySelectorAll(elementName);
    let returnElement;
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
    const elements = parentElement.getElementsByClassName(className);
    return Array.from(elements);
}
function mediaControl(mediaElement, targetClassName) {
    if (mediaElement.classList.contains(targetClassName)) {
        if (typeof mediaElement !== 'undefined') {
            const media = mediaElement;
            media.loop = true;
            media.autoplay = true;
            // media.controls = false;
            media.muted = true;
            media.play();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const container = getClassElement(document, 'container');
    const targetElement = document.querySelector(".css-slide_content");
    let currentScrollTopMax = 0;
    let isElementInView = false; // 要素が画面内に入っているかのフラグ
    const horizontalContainerElement = document.querySelector(".horizontal-container");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
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
    const windowHeight = document.documentElement.clientHeight;
    const article = document.querySelector(".css-slide_content");
    const horizontalContainerEl = getClassElement(document, 'horizontal-container');
    const slideContentEl = getClassElement(document, 'css-slide_content');
    const slideEls = article.getElementsByClassName('js-slide');
    const creditAreaEls = article.getElementsByClassName('js-credit');
    const designFixPoint = 0; // デザインに合わせる用
    const adjustedHeight = windowHeight - 74;
    const adjustedHeightPercentage = (adjustedHeight / windowHeight) * 100;
    let contentHeight = Number(slideContentEl.clientHeight) * (creditAreaEls.length);
    // 連想配列生成前に処理
    if (window.innerWidth <= 767) {
        // contentHeight = (contentHeight/2);
        horizontalContainerEl.style.height = contentHeight + "px";
    }
    else {
        slideContentEl.style.height = `${adjustedHeightPercentage}%`;
        contentHeight = Number(slideContentEl.clientHeight) * (creditAreaEls.length);
        horizontalContainerEl.style.height = contentHeight + "px";
    }
    // 連想配列（オブジェクト）を作成
    const slideMap = {};
    // slideEls を連想配列に変換
    Array.from(slideEls).forEach(function (slideEl) {
        const pageKey = Number(slideEl.dataset.page); // data-page 属性をキーに使用
        if (pageKey) {
            // 各クラスの存在を確認
            const classes = {
                jsCurrent: slideEl.classList.contains('js-current'),
                jsNext: slideEl.classList.contains('js-next'),
                jsPrevNext: slideEl.classList.contains('js-prev_next'),
                jsPrev: slideEl.classList.contains('js-prev'),
            };
            // 連想配列に追加
            slideMap[pageKey - 1] = {
                element: slideEl,
                classes: classes,
            };
        }
    });
    // creditAreaEls をページに関連付け
    Array.from(creditAreaEls).forEach(function (creditEl) {
        const creditKey = Number(creditEl.dataset.credit); // data-credit 属性をキーに使用
        if (creditKey && slideMap[creditKey - 1]) {
            // slideMap の該当ページに creditEl を関連付け
            slideMap[creditKey - 1].credit = creditEl;
        }
    });
    const maxSlideCount = Object.keys(slideMap).length;
    const formattedMaxSlideCount = String(maxSlideCount).padStart(2, '0');
    const pageMaxTextEl = getClassElement(document, 'js-max');
    if (pageMaxTextEl) {
        pageMaxTextEl.textContent = formattedMaxSlideCount;
    }
    let scrollCount = 0;
    let lastScrollTop = 0; // 最後のスクロール位置を記録
    const slideEl = document.querySelector('.js-slide');
    const slideElHeight = slideEl.clientHeight;
    const slideElWidth = slideEl.clientWidth;
    if (window.innerWidth <= 767) {
        slideMap[0].element.style.top = 'calc(0%)';
        slideMap[1].element.style.top = 'calc( 100% - ' + slideElHeight + 'px )';
        slideMap[2].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
    }
    else {
        slideMap[0].element.style.left = 'calc( 100% - ' + (slideElWidth + designFixPoint) + 'px )';
    }
    function slideActive(pageNum) {
        const prev = Math.max(0, pageNum - 1); // prevは0以下にならないように
        const current = pageNum; // currentはそのままpageNum
        const next = Math.min(maxSlideCount - 1, pageNum + 1); // nextはmax値を超えないように
        const nextNext = Math.min(maxSlideCount - 1, pageNum + 2); // nextはmax値を超えないように
        const formattedCurrentSlideCount = String(pageNum + 1).padStart(2, '0');
        const pageCurrentTextEl = getClassElement(document, 'js-count');
        const others = Object.entries(slideMap).filter((_, index) => index !== prev && index !== current && index !== next);
        if (pageCurrentTextEl) {
            pageCurrentTextEl.textContent = formattedCurrentSlideCount;
        }
        if (window.innerWidth <= 767) {
            Array.from(Object.entries(others)).forEach(function (other, i) {
                const keyCount = Number(other[1][0]);
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
                const keyCount = Number(other[1][0]);
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
    const maxScrollCount = maxSlideCount; // スクロールカウントの最大
    const totalDivisions = 31; // 30分割
    const sectionHeight = contentHeight / totalDivisions;
    container.addEventListener('scroll', () => {
        if (isElementInView) {
            const currentScrollTop = container.scrollTop; // 現在のスクロール位置
            let currentStep = 0;
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
