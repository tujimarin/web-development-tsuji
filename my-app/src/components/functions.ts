// 対象のclassを所持してるか確認
export const classFindActive = (findTargetElement: HTMLElement, targetClassName: string) => {
  if (findTargetElement.classList.contains(targetClassName)) {
    findTargetElement.classList.add(targetClassName + '--active');//付与
  } else {
    // console.log('classFindActive: 発火対象が設定されていません。 対象:', findTargetElement, targetClassName);
  }
}

const types = ['transitionend', 'animationend', 'webkitAnimationEnd'];
// addEventListenerを複数対応版 
export const entryAddEventListenerMulti = (target: any, types: any, handler: any, useCapture: any): void => {
  for (let type of types) {
    target.addEventListener(type, handler, useCapture);
  }
};

// class名の要素を取得１つのみ
export const getClassElement = (getElement: any, className: string): HTMLElement | null => {
  const element = getElement as HTMLElement;
  const contentElements = element.getElementsByClassName(className);

  // 配列に変換し、最後の要素を取得
  const returnElement = Array.from(contentElements).map(function (contentElement: Element, index) {
    if ((contentElements.length - 1) === index) {
      return contentElement;
    }
    return null;
  }).filter((el): el is Element => el !== null); // null を取り除く

  // 最後の要素を返す
  return returnElement.length > 0 ? returnElement[0] as HTMLElement : null;
};

// 特定のエレメントの最初の１つを返す
export const getElementByName = (
  element: HTMLElement,
  elementName: string
): HTMLElement | null => {
  const contentElements = element.querySelectorAll(elementName);
  if (contentElements.length === 0) {
    return null; // 要素が見つからなければnullを返す
  }

  // 最後の要素を取得
  const lastElement = contentElements[contentElements.length - 1];
  return lastElement instanceof HTMLElement ? lastElement : null; // HTMLElementであることを確認して返す
};

// 特定のエレメントを配列に変換
// 汎用関数（例：getClassElement, getElementArray, getFirstElement, entryAddEventListenerMulti）
export const getElementArray = (parentElement: HTMLElement, className: string): HTMLElement[] => {
  const elements = parentElement.getElementsByClassName(className);
  return Array.from(elements) as HTMLElement[];
}

export const mediaControl = (mediaElement: HTMLMediaElement | undefined, targetClassName: string) => {
  if (mediaElement!.classList.contains(targetClassName)) {
    if (typeof mediaElement !== 'undefined') {
      const media: HTMLMediaElement = mediaElement as HTMLMediaElement;
      media.loop = true;
      media.autoplay = true;
      // media.controls = false;
      media.muted = true;
      media.play();
    }
  }
}
