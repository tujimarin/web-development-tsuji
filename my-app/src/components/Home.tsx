
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { classFindActive } from './functions';

import '../styles/style.css';
import '../styles/home.css';

export const Home: React.FC = () => {
  const componentName = " TOP | Portfolio Yuki.Tsuji";
  useEffect(() => {
    const landingContentEl = document.getElementById('home');
    const target = landingContentEl?.querySelectorAll('.js-fadeIn,.js-groupFade');
    const observer = new IntersectionObserver((entries) => {
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

    target?.forEach((tgt) => {
      observer.observe(tgt);
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>{componentName}</title>
      </Helmet>

      <div className="home" id="home">
        <h1 className="css-headline1">
          <Link to="/web-development-tsuji">Portfolio Yuki.Tsuji</Link>
        </h1>

        <div className="css-main_visual js-fadeIn">
          <img src={`${process.env.PUBLIC_URL}/images/home/main.jpg`} alt="" />
        </div>

        <div className="css-my_profile js-fadeIn">
          <h2 className="css-headline2">自己紹介</h2>

          <div className="css-my_profile_detail">
            <dl>
              <dt>名前</dt><dd>辻 侑樹(ツジ ユウキ)</dd>
            </dl>
            <dl>
              <dt>職業</dt>
              <dd>
                フロントエンドエンジニア
              </dd>
            </dl>
            <dl>
              <dt>得意言語：フロント</dt>
              <dd>
                html,css(scss),js(Typescript,jQuery)
              </dd>
            </dl>
            <dl>
              <dt>得意言語：バックエンド</dt>
              <dd>
                php(wordpress,MVCモデル設計のフレームワーク),
                ※wordpressはレンタルサーバの選定、Advanced Custom Fields（ACF）を考慮した実装も対応可能です。
                <br />ruby(liquid:shopify),
                MySQL(select update delete insert createの基本操作)
              </dd>
            </dl>
            <dl>
              <dt>ツール</dt>
              <dd>
                git, backlog, vscode
              </dd>
            </dl>
            <dl>
              <dt>趣味での技術</dt>
              <dd>
                Ubuntu(linux)環境で、友人と遊ぶ用のサーバ構築、主に某ゲームを遊ぶ用
                ※レンタルサーバーではなく中古のデスクトップPCのOSを変更して構築
              </dd>
            </dl>
            <dl>
              <dt>趣味(プライベート)</dt>
              <dd>
                筋トレ(自重トレーニング)<br />
                ※握力60kgあります目標は70kgでりんごを片手で潰すことです。<br />
                ゲーム(多種多様)、直近は格闘ゲームをしてます。<br />
                基礎力向上のためにIT資格の勉強<br />
                ※直近は基本情報技術者を受験予定です。2024年12月中旬に試験
              </dd>
            </dl>
            <dl>
              <dt>自己PR</dt>
              <dd>
                仕事に対して熱意を持って取り組むことを大切にしており、
                <br />同僚や上司から「責任感が強く、仕事に真剣に向き合う」と評価をいただくことが多いです。
                <br />チーム全体の働きやすさを意識しながら柔軟に対応することを心がけています。
                <br />
                <br />また、制作物を作る際には、関わるメンバーとの協力を重視しています。
                <br />お互いが正直に意見を交わせる環境を作ることが、良い成果物につながると考えているため、相手の意図を汲み取りながら発言し、メンバーの提案や意見を尊重する姿勢を大切にしています。たとえば、良い提案をしたメンバーの意見が適切に評価されるよう、発言者を立てつつチーム全体で議論を深める努力をしています。
                <br />
                <br />さらに、成果物のクオリティ向上にも常に意識を向けています。
                <br />私は技術面で評価をいただくことが多い一方で、小さなミス(例えば、タイピングミス、marginや細かなスタイルのズレ(0.1pxズレている、透過率が0.2%違うなど))を防ぐことが課題と感じています。
                <br />そのため、チェックツールの導入(vscodeのタイポチェックなど)や自己確認の工夫を取り入れ、精度を上げる努力を続けています。
                <br />※デザインのズレ軽減はFigmaやxdのwebに適した状態でのデザイン納品を提案しています。
                <br />
                <br />これまでの経験を活かしながら、チームの一員として、より良い成果を出せるよう、日々精進していきたいと考えています。
              </dd>
            </dl>

          </div>

        </div>



        <div className="css-implementation js-fadeIn">
          <h2>実装</h2>

          <ul className="css-link_list">
            <li className="css-link_list_item">
              <Link className="css-link" to="page1">
                スクロール
                <br />トリガーページ
              </Link>
            </li>
            <li className="css-link_list_item">
              <Link className="css-link" to="page2" preventScrollReset={true}>
                せり上がりページ<br />
                (職歴)
              </Link>
            </li>
          </ul>
        </div>

        <div className="css-work js-fadeIn">

          <h2>実務での実装</h2>

          <ul className="css-work_list">
            <li className="css-work_list_item js-fadeIn">
              <a className="css-work_list_item_thumbnail" href="https://furfurfur.jp/Page/issue/issue_240919/" target="_blank" rel="noopener">
                <img src={`${process.env.PUBLIC_URL}/images/home/work1.png`} alt="" />
              </a>

              <div className="css-work_list_item_detail">
                <dl>
                  <dt>LP</dt>
                  <dd>
                    PC、SP両方のコーディング
                    <br />テキストの入力(クレジット情報・URLリンク確認含み)
                    <br />画像切り出し作業
                  </dd>
                </dl>
                <dl>
                  <dt>メンバー</dt>
                  <dd>
                    コーダー(自分) 1名
                    <br />デザイナー(外注)人数不明
                    <br />ディレクター(リーダー)1名
                    <br />運用保守(営業)1名
                  </dd>
                </dl>
                <dl>
                  <dt>工数</dt>
                  <dd>
                    10h
                  </dd>
                </dl>
                <dl>
                  <dt>LINK</dt>
                  <dd>
                    <a href="https://furfurfur.jp/Page/issue/issue_240919/" target="_blank" rel="noopener">
                      https://furfurfur.jp/Page/issue/issue_240919/
                    </a>
                  </dd>
                </dl>
              </div>

            </li>
            <li className="css-work_list_item js-fadeIn">
              <a className="css-work_list_item_thumbnail" href="https://alphonsemucha.jp/Page/LP/2024/1016_moon/" target="_blank" rel="noopener">
                <img src={`${process.env.PUBLIC_URL}/images/home/work2.png`} alt="" />
              </a>

              <div className="css-work_list_item_detail">
                <dl>
                  <dt>LP</dt>
                  <dd>
                    PC、SP両方のコーディング
                    <br />テキストの入力(クレジット情報・URLリンク確認含み)
                    <br />画像切り出し作業
                  </dd>
                </dl>
                <dl>
                  <dt>メンバー</dt>
                  <dd>
                    コーダー(自分) 1名
                    <br />デザイナー(外注)人数不明
                    <br />ディレクター(リーダー)1名
                    <br />運用保守(営業)1名
                  </dd>
                </dl>
                <dl>
                  <dt>工数</dt>
                  <dd>
                    10h
                  </dd>
                </dl>
                <dl>
                  <dt>LINK</dt>
                  <dd>
                    <a href="https://alphonsemucha.jp/Page/LP/2024/1016_moon/" target="_blank" rel="noopener">
                      https://alphonsemucha.jp/Page/LP/2024/1016_moon/
                    </a>
                  </dd>
                </dl>
              </div>

            </li>
            <li className="css-work_list_item js-fadeIn">
              <a className="css-work_list_item_thumbnail" href="https://emmi.jp/Page/collection/2024/aw_1st/" target="_blank" rel="noopener">
                <img src={`${process.env.PUBLIC_URL}/images/home/work3.png`} alt="" />
              </a>

              <div className="css-work_list_item_detail">
                <dl>
                  <dt>LP</dt>
                  <dd>
                    PC、SP両方のコーディング
                    <br />テキストの入力(クレジット情報・URLリンク確認含み)
                    <br />画像切り出し作業
                  </dd>
                </dl>
                <dl>
                  <dt>補足</dt>
                  <dd>
                    プラグインなどは利用せず
                    マガジンを左右のクリックでの移動と
                    ページによってはリンクもあるので、クリックイベントが被っている
                    要望もケアしています。
                    <br />スワイプ処理でも同じように動作するように作成しています。
                  </dd>
                </dl>
                <dl>
                  <dt>メンバー</dt>
                  <dd>
                    コーダー(自分) 1名
                    <br />デザイナー(外注)人数不明
                    <br />ディレクター(リーダー)1名
                    <br />運用保守(営業)1名
                  </dd>
                </dl>
                <dl>
                  <dt>工数</dt>
                  <dd>
                    30h
                  </dd>
                </dl>
                <dl>
                  <dt>LINK</dt>
                  <dd>
                    <a href="https://emmi.jp/Page/collection/2024/aw_1st/" target="_blank" rel="noopener">
                      https://emmi.jp/Page/collection/2024/aw_1st/
                    </a>
                  </dd>
                </dl>
              </div>

            </li>

            <li className="css-work_list_item js-fadeIn">
              <a className="css-work_list_item_thumbnail" href="https://www.nanasgreentea.com/" target="_blank" rel="noopener">
                <img src={`${process.env.PUBLIC_URL}/images/home/work4.png`} alt="" />
              </a>

              <div className="css-work_list_item_detail">
                <dl>
                  <dt>shopify(liquid,html,scss,js)</dt>
                  <dd>
                    担当：フロント全般
                    <br />対応範囲：決済以外のページすべて
                  </dd>
                </dl>
                <dl>
                  <dt>メンバー</dt>
                  <dd>
                    フロントエンドエンジニア(自分) 1名
                    <br />デザイナー 外注人数不明
                    <br />ディレクター 1名
                  </dd>
                </dl>
                <dl>
                  <dt>プロジェクト期間</dt>
                  <dd>
                    1～2ヶ月
                  </dd>
                </dl>
                <dl>
                  <dt>LINK</dt>
                  <dd>
                    <a href="https://www.nanasgreentea.com/" target="_blank" rel="noopener">
                      https://www.nanasgreentea.com/
                    </a>
                  </dd>
                </dl>
              </div>

            </li>

            <li className="css-work_list_item js-fadeIn">
              <a className="css-work_list_item_thumbnail" href="https://www.kanetetsu.com/" target="_blank" rel="noopener">
                <img src={`${process.env.PUBLIC_URL}/images/home/work5.png`} alt="" />
              </a>

              <div className="css-work_list_item_detail">
                <dl>
                  <dt>shopify(liquid,html,scss,js)</dt>
                  <dd>
                    担当：フロント全般
                    <br />対応範囲：決済以外のページすべて
                  </dd>
                </dl>
                <dl>
                  <dt>こだわり:オリジナルの検索機能の実装</dt>
                  <dd>
                    api取得に上限があるなか、クライアント要望の
                    <br />全体の商品とブログ記事の同時キーワードでの検索機能の実現
                    <br />
                    <a href="https://www.kanetetsu.com/pages/recipe_result">
                      https://www.kanetetsu.com/pages/recipe_result
                    </a>
                  </dd>
                </dl>
                <dl>
                  <dt>メンバー</dt>
                  <dd>
                    フロントエンドエンジニア(自分) 1名
                    <br />デザイナー 1名
                    <br />ディレクター 1名
                  </dd>
                </dl>
                <dl>
                  <dt>プロジェクト期間</dt>
                  <dd>
                    1～2ヶ月
                  </dd>
                </dl>
                <dl>
                  <dt>LINK</dt>
                  <dd>
                    <a href="https://www.kanetetsu.com/" target="_blank" rel="noopener">
                      https://www.kanetetsu.com/
                    </a>
                  </dd>
                </dl>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </>
  );
}