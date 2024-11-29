import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { classFindActive } from './functions';
import '../styles/stickyStyle.css';

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
      stickyPositionCss = 'calc(100svh - (' + elementHeight + 'px) +  10%)';
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
        default:
          stickyPositionCss = 'calc(100vh - (' + elementHeight + 'px) + -100px)';
          break;
      }
    }
    console.log(childMainEl, childEl, index, stickyPositionCss);
    if (elementHeight > window.innerHeight) {
      element.style.top = stickyPositionCss;
    }
  });
}
function groupFadeActive(findTargetElement: HTMLElement, targetClassName: string) {
  if (findTargetElement.classList.contains(targetClassName)) {
    const targetClass = 'js-groupFadeIn';
    const GroupFadeInEls = findTargetElement.getElementsByClassName(targetClass);

    Array.from(GroupFadeInEls).forEach(function (GroupFadeInEl) {
      GroupFadeInEl.classList.add(targetClass + '--active');//付与
    });

  }
}
export const Page2: React.FC = () => {
  const componentName = "Sample Page 2";
  useEffect(() => {
    // DOM が準備完了後に実行される処理







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

    window.addEventListener("resize", () => {
      stickyHight();
    });
    stickyHight();

  });
  return (
    <>
      <Helmet>
        <title>{componentName}</title>
      </Helmet>

      <div className="landing_page_sticky" id="landing_page_sticky">

        <section className="css-section css-mainvisual">
          <div className="css-mainvisual_wrapper">
            <h2 className="css-main_headline">
              職歴
            </h2>

            <p className="css-main_text">
              実装のサンプルに、自身の職歴をコンテンツとしたページになります
            </p>
            <div className="css-mainvisual_image js-fadeIn">
              <picture>
                <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image1.jpg`} media="(max-width: 768px)" />
                <img src={`${process.env.PUBLIC_URL}/images/sticky/image1.jpg`} alt="" loading="lazy" />
              </picture>
            </div>

            <div className="css-history">
              <h3>学 歴・職 歴</h3>
              <div className="css-history_textarea">
                <dl>
                  <dt>2007年 4月</dt><dd>ウィザス高等学校 入学</dd>
                </dl>
                <dl>
                  <dt>2010年 3月</dt><dd>ウィザス高等学校 入学</dd>
                </dl>
                <dl>
                  <dt>2010年 4月</dt><dd>専門学校 HAL名古屋 WEB開発学科 入学</dd>
                </dl>
                <dl>
                  <dt>2014年 3月</dt><dd>専門学校 HAL名古屋 WEB開発学科 卒業</dd>
                </dl>
                <dl>
                  <dt>2014年 4月</dt><dd>ソーシャルシェアリング株式会社 入社</dd>
                </dl>
                <dl>
                  <dt>2015年 7月</dt><dd>ソーシャルシェアリング株式会社 退職</dd>
                </dl>
                <dl>
                  <dt>2015年 8月</dt><dd>株式会社リューノス 入社</dd>
                </dl>
                <dl>
                  <dt>2017年 3月</dt><dd>株式会社リューノス 退職</dd>
                </dl>
                <dl>
                  <dt>2017年 4月</dt><dd>株式会社アパレルウェブ 入社</dd>
                </dl>
                <dl>
                  <dt>2022年 10月</dt><dd>株式会社アパレルウェブ 退職</dd>
                </dl>
                <dl>
                  <dt>2022年 11月</dt><dd>株式会社セルビー 入社</dd>
                </dl>
                <dl>
                  <dt>2024年 5月</dt><dd>株式会社セルビー 退職</dd>
                </dl>
                <dl>
                  <dt>2024年 5月</dt><dd>株式会社ブランデックス 入社 ~ 在籍中</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="css-section css-section1">
          <div className="css-section_wrapper">

            <div className="css-sticky js-groupFade">

              <h3 className="css-headline js-groupFadeIn">
                ソーシャルシェアリング株式会社<br className="s-view" /> 2014年 4月 入社
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                新卒で、ソーシャルシェアリングに入社
                <br />※同名の会社がありますがそちらとは違い、務めていた会社は2024現在会社自体は無いようです
                <br />
                <br />１～３ヶ月は研修期間その後
                <br />派遣社員として、現場を3つほど経験
                <br />１年後に、数人の後輩が入社
                <br />後輩用にプログラムの問題などを作って教育サポートなど
                <br />
                <br />派遣先1 :「<a href="https://www.holdings.toppan.com/ja/" target="_blank" rel="noopener">凸版印刷株式会社(現: TOPPANホールディングス)</a>」
                <br />期間 3ヶ月 : ECサイトのテスト、運用保守
                <br />
                <br />派遣先2 :「<a href="https://willplus-japan.jp/" target="_blank" rel="noopener">ウィルプラス</a>」
                <br />期間 3ヶ月 : 当時流行りのスマホ向けゲーム系の制作、運用保守
                <br />
                <br />派遣先2 :「<a href="https://www.wantedly.com/companies/dreampirates" target="_blank" rel="noopener">有限会社ドリームパイレーツ</a>」
                <br />期間 3ヶ月 : コーダーとしてjsのアニメーション実装など担当
                <br />
                <br />
                <br />派遣元(ソーシャルシェアリング)に初めて有給を申請したところ、
                <br />その有給は給料はでないと言われて、労基に相談後し、退職を決意
                <br />
                <br />2015年 7月 退職
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="https://www.holdings.toppan.com/ja/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image2.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image2.png`} alt="" loading="lazy" />
                  </picture>
                </a>

              </div>
              <div className="css-image js-fadeIn">
                <a href="https://willplus-japan.jp/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image3.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image3.png`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="https://www.dreampirates.jp/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image4.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image4.png`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="https://jsite.mhlw.go.jp/tokyo-roudoukyoku/kantoku/list/k-map-13.html" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image5.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image5.png`} alt="" loading="lazy" />
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
                株式会社リューノス(現:株式会社リュウノス) <br className="s-view" /> 2015年 8月 入社
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                フロントエンドエンジニアとして入社
                <br />※2024年現在は、東京の支部は完全に無くなっており、大阪のみと規模が大きく縮小していました。
                <br />
                <br />1.5次会のwebサービスのリニューアル、改修、運用保守担当
                <br />
                <br />期間: 2015年8月～2016年6月
                <br />リニューアル作業と、既存サイトの運用保守をしつつ
                <br />リニューアル板をリリース
                <br />その際、プロジェクトのリーダーして各メンバのタスク管理、作業指示などを担当
                <br />リリース時は、インフラ設定など担当
                <br />
                <br />
                <br />新しいプロジェクトにメンバーとして入り
                <br />期間: 2016年6月 ～ 2017年3月
                <br />学校向け業務支援システムの開発業務
                <br />
                <br />
                <br />プロジェクトリーダーの方から、心無い言葉を半年近く言われ続け
                <br />友人や家族に相談などして、軽い鬱状態だったため退職を決意
                <br />
                <br />2017年 3月 退職
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="https://ryunos.co.jp/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image6.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image6.png`} alt="" loading="lazy" />
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
                株式会社アパレルウェブ <br className="s-view" /> 2017年 4月 入社
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                面接時に、この人の下で働きたいと思える方がいたので入社を決意
                <br />フロントエンドエンジニアとして入社
                <br />EC新規制作、運用保守、LP制作を担当
                <br />
                <br />shopifyをEC制作を多く担当
                <br />gitを導入を推進し、社内作業効率を向上させた。
                <br />多くの技術を経験したのを活かして、営業部、ディレクション部をサポート
                <br />テクニカルな技術をクライアントに説明、要望を満たす実装の提案などを行いました。
                <br />
                <br />インフラエンジニア、ディレクション部、デザイナー部とコミュニケーションが取りやすい環境で協力し制作していました。
                <br />
                <br />
                <br />入社まえの面談で、離職率が高いことを伝えられていたので、仕方ないと思っていますが
                <br />１～２人と毎月誰かが辞めていく環境だったのもあり、多くの方が退職されたました。
                <br />
                <br />尊敬していた方々も、続々と退職され、自身も悩んでいる中
                <br />過去に一緒に働いていた後輩から、入社のお誘いがあったので、退職を決意
                <br />
                <br />2022年 10月 退職
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="https://www.apparel-web.co.jp/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image7.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image7.png`} alt="" loading="lazy" />
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
                株式会社セルビー <br className="s-view" /> 2022年 11月 入社
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                紹介を受けて、フロントエンドエンジニアとして入社
                <br />面接時の方が、直属上司の方でエンジニアの視点での思考をお持ちだったので、とても働きやすく相談なども気負うことなくしやすい環境でした。
                <br />
                <br />shopifyをEC運用保守と一部コーポレートサイトの運用保守、リニューアルを担当
                <br />git管理で作業可能にするために、環境を構築など行いました。
                <br />
                <br />
                <br />入社して、1～2ヶ月後にセルビーがグループ会社に入ることになり、業務内容大きく変更されました。
                それに伴い、エンジニアを含む人が退職、プロジェクト自体も違うところにアサインされました。
                <br />
                <br />切り替わった直後1ヶ月ほどは、直属上司が変わり不安なところも有りましたが、特段問題なく
                既存業務をこなしていました。
                <br />
                <br />その後、入社時点ではその業務をすることは、記載されていなかったのですが、
                webマーケティングを主体とした業務が多くなり、エンジニアの業務は少なくなって行きました。
                <br />
                <br />そのことを、グループインする前の上司の方に現状の相談をしたところ、声を届けていただいたりしましたが、
                <br />エンジニアとしての業務を聞き入れてもらえず、入社時と大きく条件が異なってしまったので退職を考えました。
                <br />
                <br />マーケティング自体は過去も一度も経験実績が無い状態で、貢献しようと努力しましたが、2名の新しい上司から、立場を利用した業務の強制や言葉の暴力が多くなり、
                この会社ではエンジニアは求めれていないのと、マーケティングができる方を求めていると考え自分の将来のキャリアと大きく違うので退職を決意
                <br />
                <br />2024年 5月 退職
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="https://www.selby.co.jp/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image8.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image8.png`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
              <div className="css-image js-fadeIn">
                <a href="https://jsite.mhlw.go.jp/tokyo-roudoukyoku/roudoukyoku/kanren_shisetsu/annai.html" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image9.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image9.png`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>

            </div>
          </div>
        </section>

        <section className="css-section css-section5">
          <div className="css-section_wrapper">

            <div className="css-sticky js-groupFade">

              <h3 className="css-headline js-groupFadeIn">
                株式会社ブランデックス <br className="s-view" /> 2024年 5月 入社 ~ 在籍中
              </h3>

              <div className="css-credit js-groupFadeIn js-delay1">
                フロントエンジニアとして入社
                <br />入社前の面談時に、懸念があった状態でしたが、前職のセルビーの場を避りたい気持ちが強く、内定タイミングがズレたため即断で入社を決意
                <br />
                <br />コーダーしての業務をメインで担当
                <br />現場ではgitの利用などはされておらず、ITリテラシーが低いメンバーも多く現場に最初は抵抗感がありました。
                <br />2ヶ月ほど実務と研修を進める中、徐々に慣れていき気にならないレベルになりました。
                <br />
                <br />主にアニメーションが強いLP制作を担当させていただくことが多くあり、やりがいはあります。
                <br />ですが、社内の業務方法にフラストレーションが溜まっており、毎月の面談で改善案を提案しつづけていました。※大きく３つの問題を記載
                <br />
                <br />個人的には現職は、今までの務めていた会社の中で一番、風通しが悪く、意見が言いづらいです。
                <br />
                <br />そう思う理由としては、
                <br />改善案を集めるアンケートなどが匿名ではなく実名公表である。
                <br />声を上げる人が少ない※こう思う理由は、その改善案辻さんが初めて言われましと言われたため。
                <br />ミニマムな改善方法も提案しましたが、改善は難しいのであまり言わないでほしいと釘を打たれてしまった。
                <br />
                <br />問題点
                <br />
                <br />・スプレッドシートによる多重管理
                <br />backlogでのタスク管理と別に、スプレッドシートが3つあり、それぞれ管理する人ごとにシートが異なり一元管理がグループ仲が不仲なため改善が難しい
                <br />更新することの業務が多くなり、自分以外のメンバーの方からも不満の声は上がっている。
                <br />それ以外でも、報告系のタスクが多く、実務とは違うところに工数がかかっているため、作業時間が多い理由。
                <br />ミスを減らすためのシートが多くなりすぎて、本来の役割を全うできていないケースが見受けられる。
                <br />
                <br />・gitによるバージョン管理ができない
                <br />ミニマムに導入を提案しましたが、こちらも現状の忙しさと学習コストの兼ね合いで導入が難しい※平均残業月35~38h
                <br />そのため、運用保守でファイルを触る際に、〇〇触りますと自己宣言するチャット連絡など簡単な更新ですら、報告のコストがとても高くなっており作業効率が悪い
                <br />また先祖返りなど、他メンバーが起こしているのが見受けられるので、作業方法に問題がある
                <br />
                <br />・デザイナーとのコミュニケーションが取れない
                <br />LP制作時に、webデザインを専門としていない方からデータが届きwebでは表現が難しいので別の提案をしたいが、連絡をするのが中間のリテラシーの低いメンバーに一度連絡をして
                そこから伝えてもらうという工程になっており、意思疎通が難しい。
                <br />作業工数が多くあれば多くの要望は問題にはならないですが、クライアントの希望で短い日数のなか作業するので、デザイナーの工数、コーディングの工数をうまく割り振るためにも、話し合いができないのが厳しい。
                また、それが原因でデザイナー側が作業工数を多く使ってしまい、コーディングの工数が予定より短くなってしまうため現状では、遅くまで残業をして無理やりクライアントの要望日に合わせる状態となっている。
                <br />
              </div>

            </div>

            <div className="css-image_area">
              <div className="css-image js-fadeIn">
                <a href="https://brandex.ne.jp/" target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={`${process.env.PUBLIC_URL}/images/sticky/image10.png`} media="(max-width: 768px)" />
                    <img src={`${process.env.PUBLIC_URL}/images/sticky/image10.png`} alt="" loading="lazy" />
                  </picture>
                </a>
              </div>
            </div>

          </div>

          <div className="css-footer-content">

            <div className="css-back_link">
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