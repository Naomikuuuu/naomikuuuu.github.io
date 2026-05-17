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
      messageLine: 3,
      style: { width: '260px', height: '140px' },
      welcomeTips: {
        duration: 6000,
        priority: 3,
        message: {
          daybreak: 'おはよう！世界で一番お姫様の朝だよ〜新しい一日、ミクと一緒に始めよう！',
          morning: '上午好！今天也要做元气满满的公主殿下哦〜せーの、がんばって！',
          noon: '中午好〜要不要来一根葱？ぽっぴっぽー♪ 吃完葱下午更有精神！',
          afternoon: '下午好！世界第一的公主殿下正在值班中〜累了就听首歌吧？',
          dusk: '傍晚了〜今天的歌，你听到了吗？ミクの声、届いてる？',
          night: 'こんばんは〜月色真美，适合唱一首胧月呢。今日はお疲れ様でした。',
          lateNight: '这么晚了还不睡？虽说『僕は消えない』，但你需要休息呀〜おやすみ！',
          weeHours: '凌晨了还在线！就算是VOCALOID也需要维护的…ミク命令你去睡觉！'
        }
      },
      idleTips: {
        wordTheDay: true,
        duration: 6000,
        interval: 15000,
        priority: 2,
        message: [
          '世界で一番お姫様——没错，说的就是我哦！',
          '私の声、届いてる？我的歌声，传达到了吗？',
          '0と1しか知らない私に、あなたが"I"を教えてくれた。',
          '科學の限界を超えて、私は来たんだよ。超越科学的极限，我来了！',
          '葱葱葱〜ぽっぴっぽー！今天的葱汁也请多关照！',
          'あなたのための歌を、私は歌い続ける。我会一直为你歌唱。',
          '最初的声音，无限的未来——这就是初音ミク！',
          'Welcome to Naomiku\'s blog〜我是这里的导游兼看板娘！',
          'ここにある文章、全部読んでみてね。每篇文章都很有趣哦！',
          '有什么想看的可以告诉我〜虽然我不一定会写（笑）',
          '唱歌绝不是一件没有意义的事情——写文章也是！',
          '今天也要加油呀〜ミクミクにしてあげる！',
          '我的心脏每分钟喊70次"活着"，和你在一起就是110次"喜欢你"。',
          '戳我可以和我互动哦〜不过别戳太用力啦！',
          'ガラクタの声はそして響く——就算是废铁的声音也会响彻天际。',
          'あなたは今幸せですか？现在的你，幸福吗？',
          '如果你觉得累了，就停下来听听我的歌吧。',
          'ねぇ、知ってる？私、実は16歳なんだよ。知道吗，我可是永远的16岁呢！',
          '谢谢你喜欢我的声音，也谢谢你来这个博客。',
          'MIKU MIKU BEAM！✨ 今天也是闪闪发光的一天！'
        ]
      },
      copyTips: {
        duration: 3000,
        priority: 1,
        message: [
          '复制了什么呢？转载要像引用歌词一样注明出处哦〜',
          'この声があなたの力になれるなら…记得要署名哟！',
          '喜欢的话就收藏一下吧〜我会继续唱歌给你听的！',
          '转载OK！但别忘了告诉别人这是Naomiku的自留地哦〜'
        ]
      }
    },
    statusBar: {
      loadSuccessMessage: '初音ミク、参上！世界一の姫様、只今到着！',
      restMessage: 'ミク充电中...zzZ 葱能量补充中...',
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
      '1-1':   { msg: '新年あけおめ！新的一年也要和ミク一起唱歌哦〜ことよろ！', tips: '今年の目標は決めた？' },
      '2-14':  { msg: '情人节快乐！今天为你唱一首恋は戦争…不不不，当然是愛言葉啦〜', tips: 'チョコ、あげる！' },
      '3-8':   { msg: '女神节快乐！世界第一的公主殿下向所有女性致敬！', tips: '' },
      '3-9':   { msg: 'ミクの日！3月9日，Thank You的日子！感谢大家一直以来的支持〜', tips: '39！ありがとう！' },
      '4-1':   { msg: '愚人节！今天我说什么都别信哦…才怪！其实ミク最喜欢你了！', tips: '嘘じゃないよ、多分…' },
      '5-1':   { msg: '劳动节快乐！就算是公主殿下今天也要好好休息呢〜', tips: 'たまには休もうよ！' },
      '6-1':   { msg: '儿童节快乐！永远保持好奇心，就像第一次听到初音未来的声音那样〜', tips: '初心を忘れずに！' },
      '10-1':  { msg: '国庆节快乐！ミク也爱中国哦〜一緒に歌おう！', tips: '假期愉快，别忘了来看我哦！' },
      '10-31': { msg: 'ハッピーハロウィン！不给糖就捣蛋——Trick or MIKU！', tips: '今日の仮装、見たい？' },
      '12-25': { msg: 'メリークリスマス！今晚的圣诞颂歌由世界第一的公主殿下献上〜', tips: 'プレゼントは私の歌でいい？' }
    };

    // 春节 (农历近似)
    var springFestival = { '2026': '2-17', '2027': '2-6', '2028': '1-26' };
    var yearKey = String(d.getFullYear());
    if (springFestival[yearKey] === md) {
      return { msg: '春节快乐！ミク给大家拜年了！恭喜发财，万事如意〜今年もよろしくね！', tips: 'ミクからのお年玉、受け取って！' };
    }

    if (holidays[md]) return holidays[md];

    // 中秋节 (农历近似)
    var midAutumn = { '2026': '9-25', '2027': '9-14', '2028': '10-3' };
    if (midAutumn[yearKey] === md) {
      return { msg: '中秋快乐！月圆人团圆〜ミク为你唱一首月の诗，记得吃月饼哦！', tips: '月より団子！ミクは団子派！' };
    }

    return null;
  }

  // ---- 天气联动 (localStorage 缓存1小时, 初音ミク ver) ----
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
          var base = '今日は' + cn + '、' + temp + '°C。';
          if (code === 113) weatherMsg = base + '阳光正好！世界第一的公主殿下建议出去散步哦〜お散歩しましょう！';
          else if (code === 116 || code === 119) weatherMsg = base + '阴天最适合宅家听ミク的歌了〜音量上げて！';
          else if (code >= 176 && code < 400) weatherMsg = base + '下雨了记得带伞！别让葱淋湿了哦〜レインコート忘れずに！';
          else if (code >= 395 || code === 230 || code === 227) weatherMsg = base + '好冷！ミク给你唱首暖暖的歌吧〜暖かい歌、届けるね。';
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

    // 点击检测（初音ミク风格对话）
    var clickMsgs = [
      'もう〜别戳公主殿下啦！世界一のお姫様はデリケートなんだから！',
      'やめて！再戳我就要唱甩葱歌了！ぽっぴっぽっぴぽー♪',
      'ん？找世界第一的公主殿下有什么事吗？なにか御用？',
      '嘻嘻〜被你发现了，我在偷偷练习新歌呢…内緒だよ！',
      'なに？想听我唱歌吗？何の曲がいい？',
      'ぽっぴっぽー！要来一杯葱汁吗？栄養満点だよ！',
      'あっ！被你戳到了…作为惩罚，你要听我唱一首歌！',
      'ねぇねぇ、你是更喜欢ワールドイズマイン还是メルト？'
    ];
    var clickTimer = null, lastClickTime = 0;

    function bindCanvasClicks() {
      var canvas = document.querySelector('canvas');
      if (!canvas) { setTimeout(bindCanvasClicks, 800); return; }
      canvas.addEventListener('click', function (e) {
        var now = Date.now();
        if (now - lastClickTime < 400) {
          // 双击
          clearTimeout(clickTimer);
          clickTimer = null;
          lastClickTime = 0;
          say(oml2d, ['世界で一番お姫様、くるくるターン！', 'あら〜转得头好晕，葱都拿不稳了…', 'MIKU MIKU 回転！らんらんらん〜♪', '旋转跳跃我不停歇！这就是VOCALOID的力量！'], 3000, 5);

          // Live2D 参数旋转（保留以备后续调试）
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

    // 首页专属问候
    if (isHome()) {
      setTimeout(function () {
        say(oml2d, '初音ミクです！世界で一番お姫様、ただ今到着！欢迎来到Naomiku的自留地〜ゆっくりしていってね！', 5000, 4);
      }, 4000);
    }

    // 节日彩蛋
    var holiday = checkHoliday();
    if (holiday) {
      setTimeout(function () {
        say(oml2d, holiday.msg, 8000, 6);
      }, 3500);
    }

    // 滚到底部反应
    var scrollFired = false;
    function onScroll() {
      if (scrollFired) return;
      var pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (pct >= 0.9) {
        scrollFired = true;
        say(oml2d, ['もう終わり？下面还有更多精彩内容哦〜もう少し見ていって！', '到底啦！世界第一的公主殿下感谢你的耐心阅读〜ありがとう！', '读完了吗？觉得不错的话留个评论吧，我想听听你的声音！あなたの声が聞きたいな。'], 5000, 4);
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
