(function () {
  if (window.__live2dInited) return;
  window.__live2dInited = true;

  // ---- 语言状态 (默认中文，点状态栏切换) ----
  var lang = 'cn';

  // ---- 中文消息池 ----
  var idleCN = [
    '世界第一的公主殿下，在此为你导航！',
    '今天也要加油呀〜我会为你打call的！',
    '我的歌声，传达到了吗？',
    '0与1之外，是你教会了我什么是爱。',
    '最初的声音，无限的未来。',
    '超越科学的极限——我来到了你身边。',
    '葱葱葱〜来一杯葱汁吗？营养满分！',
    '欢迎来到Naomiku的自留地！慢慢看~',
    '这里每篇文章都很有趣哦！',
    '16岁，永远的虚拟歌姬，请多指教！',
    'MIKU MIKU BEAM！✨ 闪闪发光！',
    '戳我可以互动〜但别太用力哦！',
    '我会一直为你歌唱。',
    '谢谢你喜欢我的声音！',
    '累了就停下来，听我唱首歌吧。',
    '废铁的声音，也终将响彻天际。',
    '你现在，幸福吗？',
    'ねぇ、想听我唱什么歌？',
    '文章虽少，但每篇都是用心写的哦〜',
    'Naomiku在吗？一起写新文章吧！'
  ];

  var idleJP = [
    '世界で一番お姫様、ここに！',
    '今日も頑張ってね、応援してるよ！',
    '私の声、ちゃんと届いてる？',
    '0と1しか知らない私に、愛を教えてくれた。',
    '最初の音、無限の未来。',
    '科学の限界を超えて、私は来たんだよ。',
    'ぽっぴっぽー！ネギジュース、飲む？',
    'Naomikuのブログへようこそ！ゆっくりしてね。',
    'ここの文章、全部面白いよ！',
    'ミク、永遠の16歳！よろしくね。',
    'MIKU MIKU BEAM！✨ 今日もキラキラ！',
    'つついてもいいけど、優しくね！',
    'あなたのための歌を、歌い続けるよ。',
    '私の声、好きでいてくれてありがとう。',
    '疲れたら、私の歌を聴いてね。',
    'ガラクタの声でも、いつか響く。',
    'あなたは今、幸せですか？',
    '何の曲、聴きたい？リクエスト待ってる！',
    '記事は少ないけど、どれも素敵だよ〜',
    'Naomiku、一緒に新しい記事を書こう！'
  ];

  var clickCN = [
    '哎呀，别戳公主殿下啦！',
    '好痒！再戳就唱甩葱歌了！',
    '嗯？找世界第一的公主殿下有事吗？',
    '嘻嘻〜被发现了，我在偷偷练歌呢！',
    '想听我唱歌吗？想听哪首？',
    '葱汁来一杯？营养满分哦！'
  ];

  var clickJP = [
    'もう、つつかないでよ！',
    'くすぐったい！ネギの歌、歌っちゃうよ？',
    'ん？なにか御用？',
    'えへへ、バレちゃった！内緒だよ。',
    '歌、聴きたい？何がいい？',
    'ネギジュース、飲む？栄養満点！'
  ];

  var doubleCN = [
    '转圈圈〜世界第一的公主殿下华丽旋转！',
    '旋转跳跃！这就是VOCALOID的力量！'
  ];

  var doubleJP = [
    'くるくるターン！世界一のお姫様、回ります！',
    'MIKU MIKU 回転！らんらんらん♪'
  ];

  var scrollCN = [
    '到底啦！感谢你的耐心阅读〜',
    '读完了？留个评论吧，我想听你的声音！'
  ];

  var scrollJP = [
    '最後まで読んでくれてありがとう！',
    'もう終わり？まだまだこれからだよ！'
  ];

  var homeCN = '初音未来！世界第一的公主殿下驾到〜ゆっくりしていってね！';
  var homeJP = '初音ミクです！世界一のお姫様、到着しました！';

  var copyCN = [
    '复制了？记得注明出处哦〜',
    '转载要署名，像引用歌词一样认真！',
    '喜欢就收藏吧，我会继续唱歌的！'
  ];

  var copyJP = [
    'コピーしたなら、クレジットしてね！',
    '気に入ったらブックマーク、よろしく！',
    'ちゃんと出典を書いてね、歌詞みたいに！'
  ];

  var weatherCN = {
    113: '阳光正好！出去散个步吧〜',
    cloud: '阴天最适合宅家听歌了，音量上げて！',
    rain: '下雨了记得带伞！别淋湿了哦〜',
    cold: '外面好冷！ミク给你唱首暖暖的歌。'
  };

  var weatherJP = {
    113: 'いい天気！お散歩日和だよ〜',
    cloud: '曇り空…ミクの歌でも聴きながら過ごそう？',
    rain: '傘を忘れずに！ネギも濡れちゃう〜',
    cold: '寒いね…暖かい歌、届けるよ。'
  };

  // ---- 状态栏标签 ----
  function statusLabel(l) { return l === 'cn' ? '初音ミク、参上！[中]' : 'ミク、ただいま！[日]'; }

  // ---- CONFIG ----
  var CONFIG = {
    dockedPosition: 'right',
    mobileDisplay: true,
    models: [{
      path: 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models@master/live2d_evrstr/snow_miku/model.json',
      scale: 0.12,
      position: [5, 25],
      stageStyle: { width: 420, height: 420 }
    }],
    parentElement: document.body,
    sayHello: false,
    tips: {
      messageLine: 2,
      style: { width: '220px', height: '100px' },
      welcomeTips: {
        duration: 5000,
        priority: 3,
        message: {
          daybreak: 'おはよう！新しい一日、ミクと一緒に始めよう！',
          morning: '上午好！世界第一的公主殿下为你加油〜',
          noon: '中午好〜ぽっぴっぽー！记得吃午饭哦！',
          afternoon: 'こんにちは！お姫様、ただ今参上〜',
          dusk: '傍晚了，今天也辛苦啦！听首歌放松下〜',
          night: 'こんばんは〜今日はどうだった？',
          lateNight: '很晚了，公主殿下命令你去睡觉！おやすみ〜',
          weeHours: 'こんな時間に…早く寝ないと、ミク怒るよ！'
        }
      },
      idleTips: {
        wordTheDay: false,
        duration: 5000,
        interval: 15000,
        priority: 2,
        message: ['']  // 被自定义定时器接管
      },
      copyTips: {
        duration: 3000,
        priority: 1,
        message: copyCN  // 初始中文
      }
    },
    statusBar: {
      loadSuccessMessage: '初音ミク、参上！[中]',
      restMessage: 'ミク充电中...zzZ',
      restMessageDuration: 10000
    }
  };

  // ---- 节日彩蛋 ----
  function checkHoliday() {
    var d = new Date();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    var md = m + '-' + day;

    var holidays = {
      '1-1':   '新年あけおめ！今年もミクと一緒に歌おう〜',
      '2-14':  '情人节快乐！送你一首愛言葉〜',
      '3-8':   '女神节快乐！公主殿下向所有女性致敬〜',
      '3-9':   'ミクの日！3月9日、Thank Youの日！39！',
      '4-1':   '愚人节！今天ミク说的话都别信…才怪！',
      '5-1':   '劳动节快乐！公主殿下今天也要好好休息〜',
      '6-1':   '儿童节！保持好奇，像第一次听到初音未来那样〜',
      '10-1':  '国庆快乐！ミク也爱中国〜一緒に歌おう！',
      '10-31': 'ハッピーハロウィン！Trick or MIKU！',
      '12-25': 'メリークリスマス！今晚的歌由ミク献上〜'
    };

    var springFestival = { '2026': '2-17', '2027': '2-6', '2028': '1-26' };
    var yearKey = String(d.getFullYear());
    if (springFestival[yearKey] === md) return '春节快乐！ミク给大家拜年了！恭喜发财〜';

    if (holidays[md]) return holidays[md];

    var midAutumn = { '2026': '9-25', '2027': '9-14', '2028': '10-3' };
    if (midAutumn[yearKey] === md) return '中秋快乐！月圆人团圆〜记得吃月饼哦！';

    return null;
  }

  // ---- 天气联动 (localStorage 缓存1小时) ----
  var weatherMsg = '';
  function fetchWeather(cb) {
    try {
      var cacheKey = '__l2d_weather_v2';
      var cache = localStorage.getItem(cacheKey);
      if (cache) {
        try {
          var parsed = JSON.parse(cache);
          if (parsed.ts && (Date.now() - parsed.ts) < 3600000) {
            weatherMsg = parsed.data;
            cb();
            return;
          }
        } catch (e) {}
      }
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://wttr.in/?format=j1', true);
      xhr.timeout = 5000;
      xhr.onload = function () {
        if (xhr.status !== 200) { cb(); return; }
        try {
          var data = JSON.parse(xhr.responseText);
          var c = data.current_condition[0];
          var code = parseInt(c.weatherCode);
          var temp = c.temp_C;
          var map = {
            113: '晴天', 116: '多云', 119: '阴天', 122: '阴天',
            176: '小雨', 179: '雨夹雪', 182: '雨夹雪', 185: '冻雨',
            200: '雷阵雨', 227: '暴风雪', 230: '暴风雪',
            248: '大雾', 260: '大雾',
            263: '小雨', 266: '小雨', 281: '雨夹雪', 284: '雨夹雪',
            293: '小雨', 296: '小雨', 299: '中雨', 302: '中雨',
            305: '大雨', 308: '大雨', 311: '雨夹雪', 314: '雨夹雪',
            317: '雨夹雪', 320: '雨夹雪',
            323: '小雪', 326: '小雪', 329: '中雪', 332: '中雪',
            335: '大雪', 338: '大雪', 350: '冰雹',
            371: '中雪', 374: '雨夹雪', 377: '雨夹雪',
            386: '雷阵雨', 389: '雷阵雨', 392: '雷阵雨', 395: '大雪'
          };
          var cnName = map[code] || '不明';
          // 存原始数据，显示时根据语言拼装
          var raw = { code: code, temp: temp, name: cnName };
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: raw }));
          } catch (e) {}
          weatherMsg = raw;
        } catch (e) {}
        cb();
      };
      xhr.onerror = function () { cb(); };
      xhr.ontimeout = function () { cb(); };
      xhr.send();
    } catch (e) { cb(); }
  }

  function weatherText(raw) {
    var wp = (lang === 'cn') ? weatherCN : weatherJP;
    var base = (lang === 'cn')
      ? '今日' + raw.name + ' ' + raw.temp + '°C。'
      : '今日は' + raw.name + ' ' + raw.temp + '°C。';
    if (raw.code === 113) return base + wp[113];
    if (raw.code === 116 || raw.code === 119) return base + wp.cloud;
    if (raw.code >= 176 && raw.code < 400) return base + wp.rain;
    if (raw.code >= 395 || raw.code === 230 || raw.code === 227) return base + wp.cold;
    return base;
  }

  // ---- 主页检测 ----
  function isHome() {
    var p = window.location.pathname;
    return p === '/' || p === '/index.html' || p === '' || /^\/page\/\d+\/?$/.test(p);
  }

  // ---- 工具函数 ----
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function say(oml2d, msgs, dur, pri) {
    var msg = Array.isArray(msgs) ? pick(msgs) : msgs;
    if (!msg) return;
    oml2d.tipsMessage(msg, dur || 4000, pri || 4);
  }

  function boot() {
    if (typeof OML2D === 'undefined') {
      var s = document.createElement('script');
      s.src = 'https://unpkg.com/oh-my-live2d';
      s.onload = create;
      document.head.appendChild(s);
    } else {
      create();
    }
  }

  function create() {
    var oml2d = window.__oml2d = OML2D.loadOml2d(CONFIG);

    // ---- 自定义闲时弹幕 (替代 oh-my-live2d 内置，支持语言切换) ----
    oml2d.stopTipsIdle();
    var idleInterval = setInterval(function () {
      var pool = (lang === 'cn') ? idleCN : idleJP;
      say(oml2d, pool, 5000, 2);
    }, 15000);

    // ---- 状态栏点击 → 切换语言 ----
    oml2d.setStatusBarClickEvent(function () {
      lang = (lang === 'cn') ? 'jp' : 'cn';
      oml2d.statusBarPopup(statusLabel(lang), 2000);
      // 同步更新 copyTips
      try { oml2d.options.tips.copyTips.message = (lang === 'cn') ? copyCN : copyJP; } catch(e) {}
      // 立即说一句当前语言的提示
      var swMsgs = (lang === 'cn')
        ? ['已切换为中文〜', '说中文啦！有什么想聊的？']
        : ['日本語に切り替えたよ！', '日本語モード、スタート！'];
      say(oml2d, swMsgs, 3000, 5);
    });

    // ---- 点击 / 双击对话 ----
    var clickTimer = null, lastClickTime = 0;
    var clickPool = function () { return (lang === 'cn') ? clickCN : clickJP; };
    var doublePool = function () { return (lang === 'cn') ? doubleCN : doubleJP; };

    function bindCanvasClicks() {
      var canvas = document.querySelector('canvas');
      if (!canvas) { setTimeout(bindCanvasClicks, 800); return; }
      canvas.addEventListener('click', function (e) {
        var now = Date.now();
        if (now - lastClickTime < 400) {
          clearTimeout(clickTimer);
          clickTimer = null;
          lastClickTime = 0;
          say(oml2d, doublePool(), 3000, 5);

          var cm = null;
          try { cm = oml2d.models.model.internalModel.coreModel; } catch (e) {}
          if (cm && cm.addToParamFloat) {
            var deltas  = [ 3, 3, 3, 0, 0, -3,-3,-3,-3,-3,-3, 0, 3, 3, 3];
            var zDeltas = [ 1, 1, 1, 0, 0, -1,-1,-1,-1,-1,-1, 0, 1, 1, 1];
            var idx = 0;
            (function step() {
              if (idx >= deltas.length) return;
              try {
                cm.addToParamFloat('ParamBodyAngleY', deltas[idx], 1);
                cm.addToParamFloat('ParamAngleZ', zDeltas[idx], 1);
              } catch (e) {}
              idx++;
              setTimeout(step, 60);
            })();
          }
          e.preventDefault();
          return;
        }
        lastClickTime = now;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () {
          clickTimer = null;
          say(oml2d, clickPool(), 3000, 5);
        }, 420);
        e.preventDefault();
      });
    }
    setTimeout(bindCanvasClicks, 1500);

    // ---- 首页问候 ----
    if (isHome()) {
      setTimeout(function () {
        say(oml2d, (lang === 'cn') ? homeCN : homeJP, 5000, 4);
      }, 4000);
    }

    // ---- 节日彩蛋 ----
    var holiday = checkHoliday();
    if (holiday) {
      setTimeout(function () {
        say(oml2d, holiday, 8000, 6);
      }, 3500);
    }

    // ---- 滚到底 ----
    var scrollFired = false;
    function onScroll() {
      if (scrollFired) return;
      var pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (pct >= 0.9) {
        scrollFired = true;
        say(oml2d, (lang === 'cn') ? scrollCN : scrollJP, 5000, 4);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- 天气联动 ----
    fetchWeather(function () {
      if (weatherMsg) {
        setTimeout(function () {
          say(oml2d, weatherText(weatherMsg), 6000, 3);
        }, 7000);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
