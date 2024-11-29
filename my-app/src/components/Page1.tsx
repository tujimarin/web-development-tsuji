import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getClassElement, classFindActive } from './functions';

import '../styles/scrollStyle.css';

const handleResize = () => {
  if (window.innerWidth > 768) {
    window.location.reload();
  }
};

export const Page1: React.FC = () => {
  const componentName = "Sample Page 1";

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const container = getClassElement(document, 'container');
    const targetElement = document.querySelector(".css-slide_content") as HTMLElement;
    let currentScrollTopMax = 0;
    let isElementInView = false; // 要素が画面内に入っているかのフラグ

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentScrollTopMax = container!.scrollTop; // これ必須
          isElementInView = true;
        } else {
          isElementInView = false;
        }
      });
    }, {
      threshold: 1.0 // 100% 要素が画面に収まったとき
    });
    observer.observe(targetElement);

    const landingContentEl = document.getElementById('landing_content_scroll');
    const target2 = landingContentEl?.querySelectorAll('.js-fadeIn');
    const observer2 = new IntersectionObserver((entries) => {
      for (const value of entries) {
        const element = value.target;
        if (value.isIntersecting === true) {
          classFindActive(element as HTMLElement, 'js-fadeIn');
        }
      }
    }, {
      rootMargin: '-10% 0px',
      threshold: [0]
    });

    target2?.forEach((tgt) => {
      observer2.observe(tgt);
    });



    const windowHeight = document.documentElement.clientHeight;
    const article = document.querySelector(".css-slide_content");

    const horizontalContainerEl = getClassElement(document, 'horizontal-container');
    const slideContentEl = getClassElement(document, 'css-slide_content');
    const slideEls = article!.getElementsByClassName('js-slide');
    const creditAreaEls = article!.getElementsByClassName('js-credit');

    const designFixPoint = 0; // デザインに合わせる用
    const adjustedHeight = windowHeight - 74;
    const adjustedHeightPercentage = (adjustedHeight / windowHeight) * 100;
    let contentHeight = Number(slideContentEl!.clientHeight) * (creditAreaEls.length);

    // 連想配列生成前に処理
    if (window.innerWidth <= 767) {
      // contentHeight = (contentHeight/2);
      horizontalContainerEl!.style.height = contentHeight + "px";

    } else {
      slideContentEl!.style.height = `${adjustedHeightPercentage}%`;
      contentHeight = Number(slideContentEl!.clientHeight) * (creditAreaEls.length);
      horizontalContainerEl!.style.height = contentHeight + "px";
    }

    // 連想配列（オブジェクト）を作成
    const slideMap: {
      [key: string]: {
        element: HTMLElement;
        classes: { [key: string]: boolean };
        credit?: HTMLElement; // creditはオプション
      };
    } = {};

    // slideEls を連想配列に変換
    Array.from(slideEls).forEach(function (slideEl) {
      const slideElement = slideEl as HTMLElement; // 明示的にキャスト
      const pageKey = Number(slideElement.dataset.page); // data-page 属性をキーに使用

      if (pageKey) {
        // 各クラスの存在を確認
        const classes = {
          jsCurrent: slideElement.classList.contains('js-current'),
          jsNext: slideElement.classList.contains('js-next'),
          jsPrevNext: slideElement.classList.contains('js-prev_next'),
          jsPrev: slideElement.classList.contains('js-prev'),
        };

        // 連想配列に追加
        slideMap[pageKey - 1] = {
          element: slideElement,
          classes: classes,
        };
      }
    });

    // creditAreaEls をページに関連付け
    Array.from(creditAreaEls).forEach(function (creditElement) {
      const creditEl = creditElement as HTMLElement; // 明示的にキャスト
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
    const slideElHeight = slideEl!.clientHeight;
    const slideElWidth = slideEl!.clientWidth;


    if (window.innerWidth <= 767) {
      slideMap[0].element.style.top = 'calc(0%)';
      slideMap[1].element.style.top = 'calc( 100% - ' + slideElHeight + 'px )';
      slideMap[2].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
    } else {
      slideMap[0].element.style.left = 'calc( 100% - ' + (slideElWidth + designFixPoint) + 'px )';
    }

    function slideActive(pageNum: any) {
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
            other[1][1].credit!.classList.remove('js-active');
          } else if (next < keyCount) {
            other[1][1].element.classList.remove('js-next');
            other[1][1].element.classList.add('js-prev_next');
            other[1][1].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
            other[1][1].credit!.classList.remove('js-active');
          }
        });
        if (slideMap[nextNext].element) {
          slideMap[nextNext].element.classList.remove('js-next');
          slideMap[nextNext].element.classList.add('js-prev_next');
          slideMap[nextNext].element.style.top = 'calc( 120% - ' + slideElHeight + 'px )';
          slideMap[nextNext].credit!.classList.remove('js-active');
        }
        if (slideMap[prev].element && pageNum != 0) {
          slideMap[prev].element.classList.remove('js-current');
          slideMap[prev].element.classList.add('js-prev');
          slideMap[prev].element.style.top = 'calc( -10% - ' + slideElHeight + 'px )';
          slideMap[prev].credit!.classList.remove('js-active');
        }
        if (slideMap[next].element) {
          slideMap[next].element.classList.remove('js-current');
          slideMap[next].element.classList.remove('js-prev_next');
          slideMap[next].element.classList.add('js-next');
          slideMap[next].element.style.top = 'calc( 100% - ' + slideElHeight + 'px )';
          slideMap[next].credit!.classList.remove('js-active');
          // addListClickEvent();
        }
        if (slideMap[current].element) {
          slideMap[current].element.classList.remove('js-next');
          slideMap[current].element.classList.remove('js-prev');
          slideMap[current].element.classList.remove('js-prev_next');
          slideMap[current].element.classList.add('js-current');
          slideMap[current].element.style.top = 'calc(0%)';
          slideMap[current].credit!.classList.add('js-active');
        }
      } else {
        // PCサイズ処理
        Array.from(Object.entries(others)).forEach(function (other, i) {
          const keyCount = Number(other[1][0]);
          if (prev > keyCount) {
            other[1][1].element.classList.remove('js-current');
            other[1][1].element.classList.add('js-prev');
            other[1][1].element.style.left = 'calc( 140% - ' + slideElWidth + 'px )';
            other[1][1].credit!.classList.remove('js-active');
          } else if (next < keyCount) {
            other[1][1].element.classList.remove('js-next');
            other[1][1].element.classList.add('js-prev_next');
            other[1][1].element.style.left = 'calc(-15%)';
            other[1][1].credit!.classList.remove('js-active');
          }
        });
        if (slideMap[nextNext].element) {
          slideMap[nextNext].element.classList.remove('js-next');
          slideMap[nextNext].element.classList.add('js-prev_next');
          slideMap[nextNext].element.style.left = 'calc(-15%)';
          slideMap[nextNext].credit!.classList.remove('js-active');
        }
        if (slideMap[prev].element && pageNum != 0) {
          slideMap[prev].element.classList.remove('js-current');
          slideMap[prev].element.classList.add('js-prev');
          slideMap[prev].element.style.left = 'calc( 140% - ' + slideElWidth + 'px )';
          slideMap[prev].credit!.classList.remove('js-active');
        }
        if (slideMap[next].element) {
          slideMap[next].element.classList.remove('js-current');
          slideMap[next].element.classList.remove('js-prev_next');
          slideMap[next].element.classList.add('js-next');
          slideMap[next].element.style.left = 'calc( 0% )';
          slideMap[next].credit!.classList.remove('js-active');
          // addListClickEvent();
        }
        if (slideMap[current].element) {
          slideMap[current].element.classList.remove('js-next');
          slideMap[current].element.classList.remove('js-prev');
          slideMap[current].element.classList.remove('js-prev_next');
          slideMap[current].element.classList.add('js-current');
          slideMap[current].element.style.left = 'calc( 100% - ' + (slideElWidth + designFixPoint) + 'px )';
          slideMap[current].credit!.classList.add('js-active');
        }
      }
    }



    const maxScrollCount = maxSlideCount; // スクロールカウントの最大
    const totalDivisions = 31; // 30分割
    const sectionHeight = contentHeight / totalDivisions;
    container!.addEventListener('scroll', () => {
      if (isElementInView) {
        const currentScrollTop = container!.scrollTop; // 現在のスクロール位置
        let currentStep = 0;
        if (window.innerWidth <= 767) {
          currentStep = Math.ceil((currentScrollTop - (Number(slideContentEl!.clientHeight) / 2)) / sectionHeight);
        } else {
          currentStep = Math.ceil((currentScrollTop - Number(slideContentEl!.clientHeight)) / sectionHeight);
        }

        // console.log('sectionHeight', sectionHeight);
        // console.log(`現在の位置は ${totalDivisions} 分割のうち ${currentStep} です`);
        scrollCount = currentStep;
        if (currentScrollTop > lastScrollTop) {
          if (scrollCount > maxScrollCount) {
            if (scrollCount == maxScrollCount) {
              if (currentStep !== 0) {
                slideActive(currentStep - 1)
              }
            }
          } else {
            if (currentStep !== 0) {
              slideActive(currentStep - 1)
            }
          }
        } else {
          if (currentStep === 0) {
            // slideActive(currentStep - 1)
          } else {
            if (scrollCount <= maxScrollCount) {
              slideActive(currentStep - 1)
            }
          }

        }
        lastScrollTop = currentScrollTop; // 最後のスクロール位置を更新
      }
    });

    const scrollTextEl = document.getElementById('scrollText') as HTMLElement;
    container!.addEventListener("scroll", () => {
      const scrollY = container!.scrollTop || document.documentElement.scrollTop; // ページのスクロール量
      const threshold = 0; // スクロール量の閾値

      // 閾値を超えた場合はフェードアウト
      // console.log(scrollY > threshold, scrollY, threshold)
      if (scrollY > threshold) {
        scrollTextEl.style.opacity = "0";
        scrollTextEl.style.display = "none";
      } else {
        scrollTextEl.style.opacity = "1";
        scrollTextEl.style.display = "flex";
      }
    });
  }, []); // 空の依存配列にすることでマウント時のみ実行
  return (
    <>

      <Helmet>
        <title>{componentName}</title>
      </Helmet>
      <div className="landing_content_scroll articleContainer container" id="landing_content_scroll">

        <section className="css-firstview">
          <picture>
            <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/mainvisual_s.jpg`} media="(max-width: 768px)" />
            <img src={`${process.env.PUBLIC_URL}/images/scroll/mainvisual_l.jpg`} alt="" width="" height="" />
          </picture>

          <p className="css-text js-fadeIn" id="scrollText">
            scroll
            <div className="css-arrow-down">
            </div>
          </p>
        </section>

        <div className="horizontal-container" id="target">

          <div className="horizontal-container_rapper">
            <div className="css-slide_content" id="count">
              <h3 className="css-title">
                プラグインなどは未使用で実装してます
              </h3>

              <div className="js-slide js-current" data-page="1">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-next" data-page="2">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_2.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_2.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="3">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_3.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_3.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="4">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_4.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_4.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="5">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_5.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_5.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="6">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_6.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_6.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="7">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_7.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_7.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="8">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_8.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_8.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="9">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_9.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_9.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="10">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_10.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_10.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="11">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_11.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_11.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="12">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_12.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_12.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="13">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_13.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_13.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="14">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_14.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_14.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="15">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_15.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_15.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="16">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_16.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_16.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="17">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_17.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_17.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="18">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_18.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_18.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="19">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_19.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_19.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="20">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_20.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_20.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="21">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_21.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_21.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="22">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_22.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_22.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="23">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_23.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_23.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="24">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_24.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_24.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="25">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_25.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_25.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="26">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_26.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_26.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="27">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_27.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_27.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="28">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_28.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_28.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="29">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_29.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_29.jpg`} alt="" />
                  </picture>
                </a>
              </div>
              <div className="js-slide js-prev_next" data-page="30">
                <a href="#">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_30.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_30.jpg`} alt="" />
                  </picture>
                </a>
              </div>


              <div className="css-credit js-credit js-active" data-credit="1">
                <a href="#" className="css-credit_link">ここにリンクなどテキスト入れれます</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="2">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="3">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="4">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="5">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="6">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="7">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="8">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="9">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="10">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="11">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="12">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="13">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="14">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="15">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="16">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="17">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="18">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="19">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="20">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="21">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="22">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="23">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="24">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="25">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="26">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="27">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="28">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="s-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="29">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>
              <div className="css-credit js-credit" data-credit="30">
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <a href="#" className="css-credit_link">ダミーテキスト</a>
                <span className="css-slash"> / </span>
                <br className="l-view" />
                <a href="#" className="css-credit_link">ダミーテキスト</a>
              </div>

              <div className="css-page_num js-page_num">
                <span className="css-page_num--count js-count">01</span> / <span className="css-page_num--max js-max">30</span>
              </div>
            </div>
          </div>
        </div>

        <section className="css-footer" id="target-footer">
          <div className="css-footer__wrapper">
            <div className="css-staff_text">
              <NavLink to="/web-development-tsuji">
                TOPへ戻る
              </NavLink>
            </div>
          </div>

        </section>

      </div>
    </>

  );
}
