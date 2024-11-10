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
