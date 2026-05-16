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
        priority: 3,
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
    var oml2d = OML2D.loadOml2d(CONFIG);
    var clickMsgs = [
      '哎呀，别戳我~', '好痒！', '嗯？怎么啦？',
      '嘻嘻~', '有什么想说的吗？', '今天天气不错呢~'
    ];
    oml2d.add('hit', function () {
      oml2d.tipsMessage(
        clickMsgs[Math.floor(Math.random() * clickMsgs.length)],
        3000, 5
      );
    });
    window.__oml2d = oml2d;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
