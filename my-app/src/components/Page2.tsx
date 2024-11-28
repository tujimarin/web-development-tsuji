import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { getClassElement, classFindActive } from './functions';
import '../styles/stickyStyle.css';

export const Page2: React.FC = () => {
  const componentName = "Sample Page 2";
  useEffect(() => {
    // DOM が準備完了後に実行される処理

    function stickyHight() {
      const sectionEls = document.getElementsByClassName('css-section');
      Array.from(sectionEls).forEach(function (targetElement, index: number) {
        const element = targetElement as HTMLElement; // 明示的にキャスト
        let elementHeight = element.offsetHeight + parseFloat(window.getComputedStyle(element).marginTop) + parseFloat(window.getComputedStyle(element).marginBottom);
        let childEl = element.getElementsByClassName('css-section_wrapper')[0] as HTMLElement;
        let childMainEl = element.getElementsByClassName('css-mainvisual_wrapper')[0] as HTMLElement;
        let childMainHeight;
        let childHeight;
        

        if (childMainEl) {
          childMainHeight = childMainEl.offsetHeight + parseFloat(window.getComputedStyle(childMainEl).marginTop) + parseFloat(window.getComputedStyle(childMainEl).marginBottom);
        }
        if (childEl) {
          childHeight = childEl.offsetHeight + parseFloat(window.getComputedStyle(childEl).marginTop) + parseFloat(window.getComputedStyle(childEl).marginBottom);
        }

        
        let stickyPositionCss;

        if (window.innerWidth <= 767) {
          switch (index) {
            case 0:
              stickyPositionCss = 'calc(100svh - (' + elementHeight + 'px) + 0%)';
              break;
            case 4:
              stickyPositionCss = '0';
              break;
            default:
              stickyPositionCss = 'calc(100svh - (' + elementHeight + 'px) +  10%)';
              break;
          }
        } else {
          if (index != 0) {
            elementHeight = childHeight ? childHeight : 0;
          } else {
            elementHeight = childMainHeight ? childMainHeight : 0;
          }
          
          switch (index) {
            case 0:
              stickyPositionCss = 'calc(100svh - (' + elementHeight + 'px) + -100px)';
              break;
            case 1:
              stickyPositionCss = 'calc(100vh - (' + elementHeight + 'px) + -70px)';
              break;
            case 2:
              stickyPositionCss = 'calc(100vh - (' + elementHeight + 'px) + -70px)';
              break;
            case 3:
              stickyPositionCss = 'calc(100vh - (' + elementHeight + 'px) + -50px)';
              break;
            case 4:
              stickyPositionCss = '0';
              break;
            default:
              stickyPositionCss = 'calc(100vh - (' + elementHeight + 'px) + -50px)';
              break;
          }
        }
        // console.log("DOM is ready Sample Page 2", index, childMainEl, elementHeight);
        // console.log(elementHeight, window.innerHeight, stickyPositionCss, childHeight);

        if (elementHeight > window.innerHeight) {
          element.style.top = stickyPositionCss;
        }
      });
    }
    window.addEventListener("resize", () => {
      // stickyHight();
    });
    stickyHight();

    function groupFadeActive(findTargetElement: HTMLElement, targetClassName: string) {
      if (findTargetElement.classList.contains(targetClassName)) {
        const targetClass = 'js-groupFadeIn';
        const GroupFadeInEls = findTargetElement.getElementsByClassName(targetClass);

        Array.from(GroupFadeInEls).forEach(function (GroupFadeInEl) {
          GroupFadeInEl.classList.add(targetClass + '--active');//付与
        });

      }
    }


    const landingContentEl = document.getElementById('landing_page_sticky');
    const target = landingContentEl?.querySelectorAll('.js-fadeIn,.js-groupFade');
    const observer = new IntersectionObserver((entries) => {
      for (const value of entries) {
        const element = value.target;
        if (value.isIntersecting === true) {
          classFindActive(element as HTMLElement, 'js-fadeIn');
          groupFadeActive(element as HTMLElement, 'js-groupFade');
        }
      }
    }, {
      rootMargin: '-20% 0px',
      threshold: [0]
    });

    target?.forEach((tgt) => {
      observer.observe(tgt);
    });
  });
  return (
    <>
      <Helmet>
        <title>{componentName}</title>
      </Helmet>
      <div className="landing_page_sticky" id="landing_page_sticky">

        <section className="css-section css-mainvisual">

          <div className="css-mainvisual_wrapper">
            <div className="js-groupFade">
              <h2 className="css-mainvisual_logo js-groupFadeIn js-delay1 s-view">
                <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
              </h2>

              <div className="css-mainvisual_image_wrapper">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outerALL">
                  <div className="css-mainvisual_image js-groupFadeIn">
                    <picture>
                      <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                      <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                    </picture>
                  </div>
                  <h2 className="css-mainvisual_logo js-groupFadeIn l-view js-delay1">
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </h2>
                </a>
              </div>
            </div>



            <div className="js-groupFade">
              <h2 className="css-mainvisual_headline1 js-groupFadeIn">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </h2>

              <p className="css-mainvisual_text js-groupFadeIn js-delay1">
                CELFORD is a brand which respects
                <br />first lady’s fashion full <br />of originality and pride.
                <br />For all the scenes you wish to show yourself beautiful.
              </p>

              <h2 className="css-mainvisual_headline2 js-groupFadeIn js-delay2">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </h2>
            </div>
          </div>

        </section>

        <section className="css-section css-section1">
          <div className="css-section_wrapper">

            <div className="css-sticky js-groupFade">

              <h3 className="css-headline js-groupFadeIn">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFC245008" className="css-credit_link">Coat ¥33,550</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFB245015" className="css-credit_link">Blouse¥19,800</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFS245038" className="css-credit_link">Skirt ¥22,000 </a>
                <span className="css-credit_slash">/</span>
                <br />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGA251506" className="css-credit_link">Pierced earrings ¥7,480</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGG245518" className="css-credit_link">Stole ¥11,000</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGS245501" className="css-credit_link">Shoes ¥20,900</a>
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer04">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer04">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>

            </div>
          </div>


        </section>

        <section className="css-section css-section2">
          <div className="css-section_wrapper">

            <div className="css-sticky js-groupFade">

              <h3 className="css-headline js-groupFadeIn">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFC245002" className="css-credit_link">Coat ¥38,500</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWNO245055" className="css-credit_link">Dress ¥28,600</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGA251506" className="css-credit_link">Pierced earrings ¥7,480</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGS245504" className="css-credit_link">Shoes ¥23,980</a>
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer03">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer03">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer03">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>

            </div>
          </div>


        </section>

        <section className="css-section css-section3">
          <div className="css-section_wrapper">

            <div className="css-sticky js-groupFade">

              <h3 className="css-headline js-groupFadeIn">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFC245009" className="css-credit_link">Coat ¥49,500</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWCO245054" className="css-credit_link">Dress ¥23,100</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGA245523" className="css-credit_link">Pierced earrings ¥6,600</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGS244507" className="css-credit_link">Boots ¥25,300</a>
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer02">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer02">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer02">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>

            </div>
          </div>
        </section>

        <section className="css-section css-section4">
          <div className="css-section_wrapper">

            <div className="css-sticky js-groupFade">

              <h3 className="css-headline js-groupFadeIn">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFC245001" className="css-credit_link">Coat ¥41,800</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWNT245022" className="css-credit_link">Tops ¥19,800</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFS251013" className="css-credit_link">Skirt ¥16,500</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGA245512" className="css-credit_link">Earrings ¥12,100</a>
                <span className="css-credit_slash">/</span>
                <br className="s-view" />
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWGS245503" className="css-credit_link">Boots ¥25,300</a>
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer01">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer01">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outer01">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>

            </div>
          </div>

          <div className="css-footer-content">

            <h3 className="css-footer_headline js-fadeIn">
              <picture>
                <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
              </picture>
            </h3>

            <div className="css-check_all">
              <a href="<%= Constants.PATH_ROOT %>Form/Product/ProductList.aspx?shop=0&pgi=CE241129outerALL" className="css-check_all_link js-fadeIn">
                <picture>
                  <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                  <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                </picture>
              </a>
            </div>

            <div className="css-staff_credit">
              <div className="css-staff_credit_image">
                <a href="{`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`}&pid=CWFC245001">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/scroll/image_1.jpg`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <p className="css-staff_credit_text js-fadeIn">
                Model : Zuzana Kistyova from DONNA
                <br />Photographer : Seiji Fujimori
                <br />Styling : Chikako Aoki
                <br />Hair&Make-up : Hiroko Ishikawa from eek
                <br />Graphic Designer : Shiho Matsuzaki from Mash Style Lab
                <br />Art Director : Aya Ogawa from Mash Style Lab
              </p>
            </div>

          </div>
        </section>



      </div>
    </>

  );
}