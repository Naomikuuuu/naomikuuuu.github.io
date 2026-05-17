(function () {
  if (window.__live2dInited) return;
  window.__live2dInited = true;

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
      style: { width: '220px', height: '110px' },
      welcomeTips: {
        duration: 5000,
        priority: 3,
        message: {
          daybreak: 'おはよう！新しい一日、ミクと一緒に始めよう！',
          morning: '上午好！世界第一的公主殿下为你加油〜',
          noon: '中午好〜ぽっぴっぽー！记得吃午饭哦！',
          afternoon: 'こんにちは！お姫様、ただ今参上〜',
          dusk: '傍晚了，今天也辛苦啦！听首歌放松一下吧〜',
          night: 'こんばんは〜今日はどうだった？',
          lateNight: '很晚了，公主殿下命令你去睡觉！おやすみ〜',
          weeHours: 'こんな時間に…早く寝ないと、ミク怒るよ！'
        }
      },
      idleTips: {
        wordTheDay: true,
        duration: 5000,
        interval: 15000,
        priority: 2,
        message: [
          '世界第一的公主殿下，在此为你导航！',
          '世界で一番お姫様、ここに！',
          '今天也要加油呀〜ミク为你打call！',
          '今日も頑張ってね、応援してるよ！',
          '我的歌声，传达到了吗？',
          '私の声、ちゃんと届いてる？',
          '0与1之外，是你教会了我什么是爱。',
          '0と1しか知らない私に、愛を教えてくれた。',
          '最初的声音，无限的未来。',
          '最初の音、無限の未来。',
          '超越科学的极限——我，来到了你身边。',
          '科学の限界を超えて、私は来たんだよ。',
          '葱葱葱〜今天要不要来一杯葱汁？',
          'ぽっぴっぽー！ネギジュース、飲む？',
          '欢迎来到Naomiku的自留地！请慢慢看〜',
          'Naomikuのブログへようこそ！ゆっくりしてね。',
          '这里每篇文章都很有趣哦！',
          'ここの文章、全部面白いよ！',
          '16岁，永远的虚拟歌姬，请多指教！',
          'ミク、永遠の16歳！よろしくね。',
          'MIKU MIKU BEAM！✨ 今天也闪闪发光！',
          '戳我可以互动〜但别太用力啦！',
          'つついてもいいけど、優しくね！',
          'あなたのための歌を、私は歌い続ける。',
          '谢谢你喜欢我的声音，好开心！',
          '累了就停下来，听我唱首歌吧。',
          '疲れたら、私の歌を聴いてね。',
          'ガラクタの声でも、いつか響くよ。'
        ]
      },
      copyTips: {
        duration: 3000,
        priority: 1,
        message: [
          '复制了？记得注明出处哦〜',
          'コピーしたなら、ちゃんとクレジットしてね！',
          '转载要署名，像引用歌词一样认真！',
          '喜欢就收藏吧，我会继续唱歌的！',
          '気に入ったらブックマークしてね〜'
        ]
      }
    },
    statusBar: {
      loadSuccessMessage: '初音ミク、参上！',
      restMessage: 'ミク充电中...zzZ',
      restMessageDuration: 10000
    }
  };

  // ---- 节日彩蛋 (初音ミク ver) ----
  function checkHoliday() {
    var d = new Date();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    var md = m + '-' + day;

    var holidays = {
      '1-1':   { msg: '新年あけおめ！今年もミクと一緒に歌おう〜', tips: 'ことよろ！' },
      '2-14':  { msg: '情人节快乐！送你一首愛言葉〜', tips: 'チョコ、あげる！' },
      '3-8':   { msg: '女神节快乐！公主殿下向所有女性致敬〜', tips: '' },
      '3-9':   { msg: 'ミクの日！3月9日、Thank Youの日！39！', tips: 'ありがとう！' },
      '4-1':   { msg: '愚人节！今天ミク说的话都别信哦…才怪！', tips: '嘘じゃないってば！' },
      '5-1':   { msg: '劳动节快乐！公主殿下今天也要好好休息〜', tips: 'たまには休もう！' },
      '6-1':   { msg: '儿童节！保持好奇，像第一次听到初音未来那样〜', tips: '初心を忘れずに！' },
      '10-1':  { msg: '国庆快乐！ミク也爱中国〜一緒に歌おう！', tips: '連休楽しんでね！' },
      '10-31': { msg: 'ハッピーハロウィン！Trick or MIKU！', tips: 'お菓子くれなきゃイタズラするよ！' },
      '12-25': { msg: 'メリークリスマス！今晚的歌由ミク献上〜', tips: 'プレゼントは私の歌！' }
    };

    var springFestival = { '2026': '2-17', '2027': '2-6', '2028': '1-26' };
    var yearKey = String(d.getFullYear());
    if (springFestival[yearKey] === md) {
      return { msg: '春节快乐！ミク给大家拜年了！恭喜发财〜', tips: 'お年玉、受け取ってね！' };
    }

    if (holidays[md]) return holidays[md];

    var midAutumn = { '2026': '9-25', '2027': '9-14', '2028': '10-3' };
    if (midAutumn[yearKey] === md) {
      return { msg: '中秋快乐！月圆人团圆〜记得吃月饼哦！', tips: '月より団子！ミクは団子派！' };
    }

    return null;
  }

  // ---- 天气联动 (localStorage 缓存1小时) ----
  var weatherMsg = '';
  function fetchWeather(cb) {
    try {
      var cacheKey = '__l2d_weather';
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
          var desc = c.weatherDesc[0].value;
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
          var cn = map[code] || desc;
          var base = '今日' + cn + ' ' + temp + '°C。';
          if (code === 113) weatherMsg = base + 'いい天気！お散歩日和だよ〜';
          else if (code === 116 || code === 119) weatherMsg = base + 'ミクの歌でも聴きながら過ごそう？';
          else if (code >= 176 && code < 400) weatherMsg = base + '傘を忘れずに！ネギも濡れちゃう〜';
          else if (code >= 395 || code === 230 || code === 227) weatherMsg = base + '寒いね…暖かい歌、届けるよ。';
          else weatherMsg = base;
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: weatherMsg }));
          } catch (e) {}
        } catch (e) {}
        cb();
      };
      xhr.onerror = function () { cb(); };
      xhr.ontimeout = function () { cb(); };
      xhr.send();
    } catch (e) { cb(); }
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

    // 点击对话（中日混合池，随机抽取）
    var clickMsgs = [
      'もう、つつかないでよ！',
      '哎呀，别戳公主殿下啦！',
      'くすぐったい！ネギの歌、歌っちゃうよ？',
      '好痒！再戳就唱甩葱歌了！',
      'ん？なにか御用？',
      '嗯？找世界第一的公主殿下有事？',
      'えへへ、バレちゃった！',
      '嘻嘻〜被发现了，我在偷偷练歌呢！',
      '歌、聴きたい？何がいい？',
      '想听我唱歌吗？想听哪首？',
      'ネギジュース、飲む？栄養満点！',
      '葱汁来一杯？营养满分哦！'
    ];
    var clickTimer = null, lastClickTime = 0;

    function bindCanvasClicks() {
      var canvas = document.querySelector('canvas');
      if (!canvas) { setTimeout(bindCanvasClicks, 800); return; }
      canvas.addEventListener('click', function (e) {
        var now = Date.now();
        if (now - lastClickTime < 400) {
          clearTimeout(clickTimer);
          clickTimer = null;
          lastClickTime = 0;
          say(oml2d, ['くるくるターン！世界一のお姫様、回ります！', '转圈圈〜世界第一的公主殿下华丽旋转！', 'MIKU MIKU 回転！らんらんらん♪', '旋转跳跃！这就是VOCALOID的力量！'], 3000, 5);

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
          say(oml2d, clickMsgs, 3000, 5);
        }, 420);
        e.preventDefault();
      });
    }
    setTimeout(bindCanvasClicks, 1500);

    // 首页问候
    if (isHome()) {
      setTimeout(function () {
        say(oml2d, ['初音ミクです！世界一のお姫様、到着しました！', '初音未来！世界第一的公主殿下驾到！ゆっくりしていってね！'], 5000, 4);
      }, 4000);
    }

    // 节日彩蛋
    var holiday = checkHoliday();
    if (holiday) {
      setTimeout(function () {
        say(oml2d, holiday.msg, 8000, 6);
      }, 3500);
    }

    // 滚到底
    var scrollFired = false;
    function onScroll() {
      if (scrollFired) return;
      var pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (pct >= 0.9) {
        scrollFired = true;
        say(oml2d, ['もう終わり？まだまだこれからだよ！', '到底啦！感谢你的耐心阅读〜ありがとう！', '读完了？留个评论吧，我想听你的声音！', '最後まで読んでくれてありがとう！コメント待ってるね。'], 5000, 4);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });


    // 天气联动
    fetchWeather(function () {
      if (weatherMsg) {
        clickMsgs.push(weatherMsg);
        if (!holiday) {
          setTimeout(function () {
            say(oml2d, weatherMsg, 6000, 3);
          }, 7000);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
