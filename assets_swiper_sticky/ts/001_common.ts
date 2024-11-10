// 対象のclassを所持してるか確認
function classFindActive(findTargetElement: HTMLElement, targetClassName: string) {
  if (findTargetElement.classList.contains(targetClassName)) {
    findTargetElement.classList.add(targetClassName + '--active');//付与
  } else {
    // console.log('classFindActive: 発火対象が設定されていません。 対象:', findTargetElement, targetClassName);
  }
}

const types = ['transitionend', 'animationend', 'webkitAnimationEnd'];
// addEventListenerを複数対応版
const entryAddEventListenerMulti = (target, types, handler, useCapture): void => {
  for (let type of types) {
    target.addEventListener(type, handler, useCapture);
  }
};

// class名の要素を取得１つのみ
const getClassElement = (element, className: string): HTMLElement => {
  const contentElements = element.getElementsByClassName(className);
  let returnElement: Array<any>;
  returnElement = Array.from(contentElements).map(function (contentElement: HTMLElement, index) {
    if ((contentElements.length - 1) == index) {
      return contentElement;
    }
  });
  return returnElement.shift();
}

// 特定のエレメントの最初の１つを返す
const getFirstElement = (element, elementName: string): HTMLElement => {
  const contentElements = element.querySelectorAll(elementName);
  let returnElement: Array<any>;
  returnElement = Array.from(contentElements).map(function (contentElement: HTMLElement, index) {
    if ((contentElements.length - 1) == index) {
      return contentElement;
    }
  });
  return returnElement.shift();
}

// 特定のエレメントを配列に変換
// 汎用関数（例：getClassElement, getElementArray, getFirstElement, entryAddEventListenerMulti）
function getElementArray(parentElement: HTMLElement, className: string): HTMLElement[] {
  const elements = parentElement.getElementsByClassName(className);
  return Array.from(elements) as HTMLElement[];
}

function mediaControl(mediaElement: HTMLMediaElement | undefined, targetClassName: string) {
  if (mediaElement.classList.contains(targetClassName)) {
    if (typeof mediaElement !== 'undefined') {
      const media: HTMLMediaElement = mediaElement as HTMLMediaElement;
      media.loop = true;
      media.autoplay = true;
      media.controls = false;
      media.muted = true;
      media.play();
    }
  }
}