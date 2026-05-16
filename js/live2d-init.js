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
      style: { width: '250px', height: '130px' },
      welcomeTips: {
        duration: 6000,
        priority: 3,
        message: {
          daybreak: '早上好！新的一天开始了~',
          morning: '上午好！今天也是元气满满的一天！',
          noon: '中午好~记得按时吃饭哦！',
          afternoon: '下午好！要不要来杯咖啡？',
          dusk: '傍晚了，今天辛苦啦~',
          night: '晚上好！今天过得怎么样？',
          lateNight: '已经这么晚了，早点休息吧，晚安~',
          weeHours: '这么晚还不睡？当心秃头哦！'
        }
      },
      idleTips: {
        wordTheDay: true,
        duration: 6000,
        interval: 15000,
        priority: 2,
        message: [
          '欢迎来到Naomiku的自留地~',
          '这里的文章都很有趣呢！',
          '有什么想看的可以告诉我哦！',
          '今天也要加油呀~',
          '戳我可以切换模型/拍照哦'
        ]
      },
      copyTips: {
        duration: 3000,
        priority: 1,
        message: [
          '你复制了什么呢？记得注明出处哦~',
          '转载要记得署名哟！',
          '喜欢的话就收藏一下吧~'
        ]
      }
    },
    statusBar: {
      loadSuccessMessage: '雪初音驾到！',
      restMessage: '雪初音打盹中...',
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
      '1-1':   { msg: '元旦快乐！新的一年也要加油哦~', tips: '新年新气象！' },
      '2-14':  { msg: '情人节快乐！有编程陪伴也不错呢~', tips: '今天适合读一篇浪漫的文章' },
      '3-8':   { msg: '女神节快乐！向所有女性开发者致敬~', tips: '' },
      '4-1':   { msg: '愚人节！今天看到什么都别太当真哦~', tips: '嘘...今天可能有彩蛋' },
      '5-1':   { msg: '劳动节快乐！劳动最光荣~', tips: '放假也要记得学习哦' },
      '6-1':   { msg: '儿童节快乐！永远保持好奇心~', tips: '今天适合看点有趣的' },
      '10-1':  { msg: '国庆节快乐！祖国繁荣昌盛~', tips: '假期愉快！' },
      '10-31': { msg: '万圣节快乐！不给糖就捣蛋~', tips: 'Trick or Treat!' },
      '12-25': { msg: '圣诞快乐！Merry Christmas~', tips: '今天也要开心呀' }
    };

    // 春节 (粗略估算，以农历正月初一为基准的近似日期)
    var springFestival = { '2026': '2-17', '2027': '2-6', '2028': '1-26' };
    var yearKey = String(d.getFullYear());
    if (springFestival[yearKey] === md) {
      return { msg: '春节快乐！恭喜发财，万事如意~', tips: '新的一年，新的开始！' };
    }

    if (holidays[md]) return holidays[md];

    // 中秋节 (农历八月十五的粗略近似)
    var midAutumn = { '2026': '9-25', '2027': '9-14', '2028': '10-3' };
    if (midAutumn[yearKey] === md) {
      return { msg: '中秋节快乐！月圆人团圆~', tips: '记得吃月饼哦' };
    }

    return null;
  }

  // ---- 天气联动 ----
  var weatherMsg = '';
  function fetchWeather(cb) {
    try {
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
          var base = '今天' + cn + '，' + temp + '°C。';
          if (code === 113) weatherMsg = base + '阳光正好，出去走走吧~';
          else if (code === 116 || code === 119) weatherMsg = base + '适合宅家写代码呢~';
          else if (code >= 176 && code < 400) weatherMsg = base + '记得带伞，别淋湿了哦~';
          else if (code >= 395 || code === 230 || code === 227) weatherMsg = base + '外面好冷，注意保暖！';
          else weatherMsg = base;
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

    // 点击 & 双击检测（DOM 级，比模型 hit 区域更可靠）
    var clickMsgs = [
      '哎呀，别戳我~', '好痒！', '嗯？怎么啦？',
      '嘻嘻~', '有什么想说的吗？'
    ];
    var clickTimer = null, lastClickTime = 0;

    function bindCanvasClicks() {
      var canvas = document.querySelector('canvas');
      if (!canvas) { setTimeout(bindCanvasClicks, 800); return; }
      canvas.addEventListener('click', function (e) {
        var now = Date.now();
        if (now - lastClickTime < 400) {
          // 双击 → 旋转
          clearTimeout(clickTimer);
          clickTimer = null;
          lastClickTime = 0;
          var steps = [0.1, 0.2, 0.3, 0.2, 0.1, 0, -0.1, -0.15, -0.1, -0.05, 0];
          var i = 0;
          say(oml2d, ['转圈圈~', '晕了吗？', '啦啦啦~', '旋转跳跃我闭着眼！'], 3000, 5);
          (function step() {
            if (i >= steps.length) return;
            oml2d.setModelRotation(steps[i]);
            i++;
            setTimeout(step, 60);
          })();
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
        say(oml2d, '欢迎来到Naomiku的自留地！随便看看~', 5000, 4);
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
        say(oml2d, ['看完啦？觉得不错的话留个评论吧~', '到底了！帮博主点个赞吧~', '读完啦！欢迎去看看其他文章哦~'], 5000, 4);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });


    // 天气联动
    fetchWeather(function () {
      if (weatherMsg) {
        // 把天气信息注入到点击消息池
        clickMsgs.push(weatherMsg);
        // 如果当前有节日，天气消息优先级低一点
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
