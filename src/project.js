window.__require=function e(t,i,o){function n(s,r){if(!i[s]){if(!t[s]){var c=s.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!r&&l)return l(c,!0);if(a)return a(c,!0);throw new Error("Cannot find module '"+s+"'")}}var p=i[s]={exports:{}};t[s][0].call(p.exports,function(e){return n(t[s][1][e]||e)},p,p.exports,e,t,i,o)}return i[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<o.length;s++)n(o[s]);return n}({1:[function(e,t,i){(function(e){"use strict";var i=256,o=[],n=void 0===e?window:e,a=Math.pow(i,6),s=Math.pow(2,52),r=2*s,c=i-1,l=Math.random;function p(e,t){for(var i,o=e+"",n=0;n<o.length;)t[c&n]=c&(i^=19*t[c&n])+o.charCodeAt(n++);return d(t)}function d(e){return String.fromCharCode.apply(0,e)}t.exports=function(e,l){if(l&&!0===l.global)return l.global=!1,Math.random=t.exports(e,l),l.global=!0,Math.random;var u=[],h=(p(function e(t,i){var o,n=[],a=(typeof t)[0];if(i&&"o"==a)for(o in t)try{n.push(e(t[o],i-1))}catch(e){}return n.length?n:"s"==a?t:t+"\0"}(l&&l.entropy||!1?[e,d(o)]:0 in arguments?e:function(e){try{return n.crypto.getRandomValues(e=new Uint8Array(i)),d(e)}catch(e){return[+new Date,n,n.navigator&&n.navigator.plugins,n.screen,d(o)]}}(),3),u),new function(e){var t,o=e.length,n=this,a=0,s=n.i=n.j=0,r=n.S=[];o||(e=[o++]);for(;a<i;)r[a]=a++;for(a=0;a<i;a++)r[a]=r[s=c&s+e[a%o]+(t=r[a])],r[s]=t;(n.g=function(e){for(var t,o=0,a=n.i,s=n.j,r=n.S;e--;)t=r[a=c&a+1],o=o*i+r[c&(r[a]=r[s=c&s+t])+(r[s]=t)];return n.i=a,n.j=s,o})(i)}(u));return p(d(h.S),o),function(){for(var e=h.g(6),t=a,o=0;e<s;)e=(e+o)*i,t*=i,o=h.g(1);for(;e>=r;)e/=2,t/=2,o>>>=1;return(e+o)/t}},t.exports.resetGlobal=function(){Math.random=l},p(Math.random(),o)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],Bird:[function(e,t,i){"use strict";cc._RF.push(t,"273baYj5nZF96xONv7M6SF5","Bird"),cc.Class({extends:cc.Component,properties:{moveSpeed:1.2,animation:"am_penican",birdAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.moveAction=this.setMoveAction(),this.node.runAction(this.moveAction),this.moving=!0;var e=this.getComponent(cc.Animation).play(this.animation);e.speed=.25,e.repeatCount=1/0,cc.audioEngine.playEffect(this.birdAudio,!1)},setMoveAction:function(){return cc.moveBy(cc.winSize.width/this.moveSpeed/150,cc.v2(2*-this.node.position.x,0))},onCollisionEnter:function(e,t){this.game.gameOver()},update:function(e){this.moveAction.isDone()&&this.moving&&(this.moving=!1,this.game.birdStoped(this),this.node.destroy())}}),cc._RF.pop()},{}],Canvas:[function(e,t,i){"use strict";cc._RF.push(t,"4e439uzFENNgbliJKpXMaTr","Canvas"),cc.Class({extends:cc.Component,properties:{bigSprite:{default:null,type:cc.Sprite},bgNode:{default:null,type:cc.Node},bgSpaceBack:{default:null,type:cc.SpriteFrame},bgStarryskyBack:{default:null,type:cc.SpriteFrame},bgCloud:{default:null,type:cc.Node},bgSpace:{default:null,type:cc.Node},bgStarrysky:{default:null,type:cc.Node}},start:function(){var e=(new Date).getMinutes()/60,t=this.bgNode.getChildByName("bg2"),i=this.bgNode.getChildByName("bg3");if(e<1/3)this.bigSprite.spriteFrame=this.bgStarryskyBack,this.bgStarrysky.opacity=255;else if(e<2/3)this.bigSprite.spriteFrame=this.bgSpaceBack,this.bgSpace.opacity=255,i.opacity=0;else{t.opacity=0,i.opacity=0,this.bgCloud.opacity=255;for(var o=void 0,n=0;n<4;n++)(o=this.bgCloud.getChildByName("bg_scene_cloud0"+n).getComponent(cc.Animation).play("bg_scene_cloud0"+n)).speed=.01,o.repeatCount=1/0}}}),cc._RF.pop()},{}],HeroControl:[function(e,t,i){"use strict";cc._RF.push(t,"339d2dg1QpEKKxBJBzHiDJ0","HeroControl");var o=function(e){return e&&e.__esModule?e:{default:e}}(e("../../../lib/celerx"));var n=e("seed-random");cc.Class({extends:cc.Component,properties:{speed:cc.v2(0,0),maxSpeed:cc.v2(2e3,2e3),gravity:-1e3,drag:1e3,direction:0,jumpSpeed:300,scoreLabel:{default:null,type:cc.Label},stop1Sprite:{default:null,type:cc.Sprite},stop2Sprite:{default:null,type:cc.Sprite},stop3Sprite:{default:null,type:cc.Sprite},aeCombobuff:{default:null,type:cc.Sprite},jumpAudio:{default:null,type:cc.AudioClip},startButton:{default:null,type:cc.Node},bgAudio:{default:null,type:cc.AudioClip}},onLoad:function(){var e=cc.Canvas.instance.node;e.on("touchstart",this.onTouchStart,this),e.on("touchend",this.onTouchEnd,this),this.collisionX=0,this.collisionY=0,this.prePosition=cc.v2(),this.preStep=cc.v2(),this.touchingNumber=0,this.playIdleAnimation(),this.aeStop=0;var t=this.startButton.getComponent(cc.Animation),i=t.play("btn_start");i.speed=.1,i.repeatCount=1/0,(i=(t=this.aeCombobuff.getComponent(cc.Animation)).play("ae_combobuff")).speed=.3,i.repeatCount=1/0;var a=o.default.getMatch();n(a&&a.sharedRandomSeed,{global:!0}),this.startButton.y=180},onEnable:function(){cc.director.getCollisionManager().enabled=!0,cc.director.getCollisionManager().enabledDebugDraw=!1},onDisable:function(){cc.director.getCollisionManager().enabled=!1,cc.director.getCollisionManager().enabledDebugDraw=!1},playIdleAnimation:function(){var e=this.getComponent(cc.Animation).play("am_fish_stay");e.speed=.3,e.repeatCount=1/0},onTouchStart:function(e){if(!this.jumping&&this.game.gameOn){this.jumping=!0,this.speed.y=this.jumpSpeed,this.collisionY=0;var t=this.getComponent(cc.Animation).play("am_fish_jump");t.speed=.4,t.onStop=this.playIdleAnimation.bind(this),cc.audioEngine.playEffect(this.jumpAudio,!1)}},onTouchEnd:function(e){this.direction=0},startGame:function(){this.game.gameOn||(cc.audioEngine.playMusic(this.bgAudio,!0),this.game.gameOn=!0,this.game.addBlock(),this.game.startTimer(),this.startButton.y=-1e3)},onCollisionEnter:function(e,t){this.touchingNumber++;var i=e.world.aabb,o=e.world.preAabb.clone(),n=t.world.aabb,a=t.world.preAabb.clone();if(a.x=n.x,o.x=i.x,cc.Intersection.rectRect(a,o))return this.speed.x<0&&a.xMax>o.xMax?(this.node.x=o.xMax-this.node.parent.x,this.collisionX=-1):this.speed.x>0&&a.xMin<o.xMin&&(this.node.x=o.xMin-a.width-this.node.parent.x,this.collisionX=1),this.speed.x=0,void(e.touchingX=!0);if(a.y=n.y,o.y=i.y,cc.Intersection.rectRect(a,o)){this.speed.y<0&&a.yMax>o.yMax?(this.node.y=o.yMax-this.node.parent.y,this.jumping=!1,this.collisionY=-1):this.speed.y>0&&a.yMin<o.yMin&&(this.node.y=o.yMin-a.height-this.node.parent.y,this.collisionY=1),this.speed.y=0,e.touchingY=!0;switch(this.aeStop){case 0:this.stop1Sprite.getComponent(cc.Animation).play("ae_stop1").speed=.8,this.aeStop++;break;case 1:this.stop2Sprite.getComponent(cc.Animation).play("ae_stop2").speed=.6,this.aeStop++;break;case 2:this.stop3Sprite.getComponent(cc.Animation).play("ae_stop3").speed=.6,this.aeStop=0}}},onCollisionStay:function(e,t){if(-1===this.collisionY&&"Platform"===e.node.group)e.node.getComponent("PlatformMotion")},onCollisionExit:function(e){this.touchingNumber--,0===this.touchingNumber&&(this.node.color=cc.Color.WHITE),e.touchingX?(this.collisionX=0,e.touchingX=!1):e.touchingY&&(e.touchingY=!1,this.collisionY=0,this.jumping=!0)},update:function(e){0===this.collisionY&&(this.speed.y+=this.gravity*e,Math.abs(this.speed.y)>this.maxSpeed.y&&(this.speed.y=this.speed.y>0?this.maxSpeed.y:-this.maxSpeed.y),this.node.y<16&&(this.speed.y=0,this.collisionY=-1,this.node.y=16,this.jumping=!1)),0===this.direction?this.speed.x>0?(this.speed.x-=this.drag*e,this.speed.x<=0&&(this.speed.x=0)):this.speed.x<0&&(this.speed.x+=this.drag*e,this.speed.x>=0&&(this.speed.x=0)):(this.speed.x+=(this.direction>0?1:-1)*this.drag*e,Math.abs(this.speed.x)>this.maxSpeed.x&&(this.speed.x=this.speed.x>0?this.maxSpeed.x:-this.maxSpeed.x)),this.speed.x*this.collisionX>0&&(this.speed.x=0),this.prePosition.x=this.node.x,this.prePosition.y=this.node.y,this.preStep.x=this.speed.x*e,this.preStep.y=this.speed.y*e,this.node.x+=this.speed.x*e,this.node.y+=this.speed.y*e,this.scoreLabel.node.y=this.node.y+105,this.stop1Sprite.node.y=this.node.y+45,this.stop2Sprite.node.y=this.node.y+25,this.stop3Sprite.node.y=this.node.y+45,this.aeCombobuff.node.y=this.node.y+55}}),cc._RF.pop()},{"../../../lib/celerx":"celerx","seed-random":1}],PlatformMotion:[function(e,t,i){"use strict";cc._RF.push(t,"0f761EZmKhNLKJpUXTrb4fF","PlatformMotion"),cc.Class({extends:cc.Component,properties:{moveSpeed:0,type:0,blackcat:{default:null,type:cc.SpriteFrame},licat:{default:null,type:cc.SpriteFrame},nainiucat:{default:null,type:cc.SpriteFrame},sanhuacat:{default:null,type:cc.SpriteFrame},oracat:{default:null,type:cc.SpriteFrame},eatSprite:{default:null,type:cc.Sprite},cat1Audio:{default:null,type:cc.AudioClip},cat2Audio:{default:null,type:cc.AudioClip}},onLoad:function(){this.moveAction=this.setMoveAction(),this.node.runAction(this.moveAction),this.moving=!0;var e=this.node.getComponent(cc.Sprite);switch(this.type){case 4:e.spriteFrame=this.blackcat;break;case 3:e.spriteFrame=this.licat;break;case 2:e.spriteFrame=this.nainiucat;break;case 1:e.spriteFrame=this.sanhuacat;break;default:e.spriteFrame=this.oracat}Math.random()<.5?cc.audioEngine.playEffect(this.cat1Audio,!1):cc.audioEngine.playEffect(this.cat2Audio,!1)},setMoveAction:function(){return cc.moveBy(cc.winSize.width/this.moveSpeed/300,cc.v2(-this.node.position.x,0))},onCollisionStay:function(e,t){if(t.touchingX&&this.moving){var i=this.eatSprite.getComponent(cc.Animation);if(!this.anim){switch(this.type){case 4:this.anim="am_fish_blackate";break;case 3:this.anim="am_fish_limaoate";break;case 2:this.anim="am_fish_nainiuate";break;case 1:this.anim="am_fish_sanhuaate";break;default:this.anim="am_fish_jucatate"}i.play(this.anim).speed=.1,this.game.gameOver()}}t.touchingY&&this.moving&&this.stopBlock()},update:function(e){this.moveAction.isDone()&&this.moving&&this.stopBlock()},stopBlock:function(){this.node.stopAllActions(),this.moving=!1,this.game.blockStoped(this);var e=this.getComponent(cc.Animation),t=void 0;switch(this.type){case 4:t="am_blackcat";break;case 3:t="am_licat";break;case 2:t="am_nainiucat";break;case 1:t="am_sanhuacat";break;default:t="am_oracat"}e.play(t).speed=.3}}),cc._RF.pop()},{}],Wall:[function(e,t,i){"use strict";cc._RF.push(t,"1a279oXNoxFFI516fswAbVo","Wall");var o=cc.Enum({Left:0,Right:1,Top:2,Bottom:3});cc.Class({extends:cc.Component,properties:{type:{default:o.Left,type:o},width:5},start:function(){var e=this.getComponent(cc.BoxCollider);if(e){var t=this.node,i=this.type,n=cc.winSize.width,a=cc.winSize.height,s=this.width;i===o.Left?(t.height=a,t.width=s,t.x=0,t.y=a/2):i===o.Right?(t.height=a,t.width=s,t.x=n,t.y=a/2):i===o.Top?(t.width=n,t.height=s,t.x=n/2,t.y=a):i===o.Bottom&&(t.width=n,t.height=s,t.x=0,t.y=0),e.size=t.getContentSize()}}}),cc._RF.pop()},{}],blockSpeed:[function(e,t,i){"use strict";cc._RF.push(t,"97bd2VtYjxOXpAlxWMb4ASm","blockSpeed"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(e){var t={};switch(!0){case e>=330:var i=Math.floor((e-330)/30);t={no:22+i,min:2.5+.1*i,max:2.7+.1*i};break;case e>=305:t={no:21,min:2.4,max:2.6};break;case e>=280:t={no:20,min:2.3,max:2.5};break;case e>=255:t={no:19,min:2.2,max:2.4};break;case e>=230:t={no:18,min:2.1,max:2.3};break;case e>=205:t={no:17,min:2,max:2.2};break;case e>=185:t={no:16,min:1.9,max:2.1};break;case e>=165:t={no:15,min:1.8,max:2};break;case e>=150:t={no:14,min:1.7,max:1.9};break;case e>=135:t={no:13,min:1.6,max:1.8};break;case e>=120:t={no:12,min:1.5,max:1.7};break;case e>=100:t={no:11,min:1.4,max:1.6};break;case e>=80:t={no:10,min:1.3,max:1.5};break;case e>=70:t={no:9,min:1.2,max:1.4};break;case e>=60:t={no:8,min:1.1,max:1.3};break;case e>=50:t={no:7,min:.9,max:1.1};break;case e>=40:t={no:6,min:.8,max:1};break;case e>=30:t={no:5,min:.7,max:.9};break;case e>=20:t={no:4,min:.6,max:.8};break;case e>=12:t={no:3,min:.5,max:.8};break;case e>=5:t={no:2,min:.4,max:.5};break;default:t={no:1,min:.3,max:.4}}return t},t.exports=i.default,cc._RF.pop()},{}],celerx:[function(e,t,i){"use strict";cc._RF.push(t,"f802958FrhFL4LPmY37Shwu","celerx");var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function n(e){for(var t=new Uint8Array(e),i=new Array,o=0,n=0,a=new Array(3),s=new Array(4),r=t.length,l=0;r--;)if(a[o++]=t[l++],3==o){for(s[0]=(252&a[0])>>2,s[1]=((3&a[0])<<4)+((240&a[1])>>4),s[2]=((15&a[1])<<2)+((192&a[2])>>6),s[3]=63&a[2],o=0;o<4;o++)i+=c.charAt(s[o]);o=0}if(o){for(n=o;n<3;n++)a[n]=0;for(s[0]=(252&a[0])>>2,s[1]=((3&a[0])<<4)+((240&a[1])>>4),s[2]=((15&a[1])<<2)+((192&a[2])>>6),s[3]=63&a[2],n=0;n<o+1;n++)i+=c.charAt(s[n]);for(;o++<3;)i+="="}return i}function a(e){var t,i,o,n,a,s,r=new Array,c=0;if(e!=(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,""))&&alert("Warning! Characters outside Base64 range in input string ignored."),e.length%4)return alert("Error: Input length is not a multiple of 4 bytes."),"";for(var p=0;c<e.length;)t=l.indexOf(e.charAt(c++))<<2|(n=l.indexOf(e.charAt(c++)))>>4,i=(15&n)<<4|(a=l.indexOf(e.charAt(c++)))>>2,o=(3&a)<<6|(s=l.indexOf(e.charAt(c++))),r[p++]=t,64!=a&&(r[p++]=i),64!=s&&(r[p++]=o);return r}var s="function"==typeof Symbol&&"symbol"==o(Symbol.iterator)?function(e){return void 0===e?"undefined":o(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":o(e)},r={default:void 0,call:function(e,t,i){var o="";if("function"==typeof t&&(i=t,t={}),t={data:void 0===t?null:t},"function"==typeof i){var n="dscb"+window.dscb++;window[n]=i,t._dscbstub=n}return t=JSON.stringify(t),window._dsbridge?o=_dsbridge.call(e,t):(window._dswk||-1!=navigator.userAgent.indexOf("_dsbridge"))&&(o=prompt("_dsbridge="+e,t)),JSON.parse(o||"{}").data},register:function(e,t,i){i=i?window._dsaf:window._dsf,window._dsInit||(window._dsInit=!0,setTimeout(function(){r.call("_dsb.dsinit")},0)),"object"==(void 0===t?"undefined":s(t))?i._obs[e]=t:i[e]=t},registerAsyn:function(e,t){this.register(e,t,!0)},hasNativeMethod:function(e,t){return this.call("_dsb.hasNativeMethod",{name:e,type:t||"all"})},disableJavascriptDialogBlock:function(e){this.call("_dsb.disableJavascriptDialogBlock",{disable:!1!==e})}};!function(){if(!window._dsf){var e,t={_dsf:{_obs:{}},_dsaf:{_obs:{}},dscb:0,celerx:r,close:function(){r.call("_dsb.closePage")},_handleMessageFromNative:function(e){var t=JSON.parse(e.data),i={id:e.callbackId,complete:!0},o=this._dsf[e.method],n=this._dsaf[e.method],a=function(e,o){i.data=e.apply(o,t),r.call("_dsb.returnValue",i)},s=function(e,o){t.push(function(e,t){i.data=e,i.complete=!1!==t,r.call("_dsb.returnValue",i)}),e.apply(o,t)};if(o)a(o,this._dsf);else if(n)s(n,this._dsaf);else if(!(2>(o=e.method.split(".")).length)){e=o.pop();o=o.join(".");var c=(n=(n=this._dsf._obs)[o]||{})[e];c&&"function"==typeof c?a(c,n):(c=(n=(n=this._dsaf._obs)[o]||{})[e])&&"function"==typeof c&&s(c,n)}}};for(e in t)window[e]=t[e];r.register("_hasJavascriptMethod",function(e,t){return 2>(t=e.split(".")).length?!(!_dsf[t]&&!_dsaf[t]):(e=t.pop(),t=t.join("."),(t=_dsf._obs[t]||_dsaf._obs[t])&&!!t[e])})}}();var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.exports={onStateReceived:function(e){return r.register("onStateReceived",function(t){var i=a(t);return e(new Uint8Array(i))})},onCourtModeStarted:function(e){return r.register("onCourtModeStarted",e)},getMatch:function(){var e=r.call("getMatch","123");try{e=JSON.parse(e)}catch(e){}return e},showCourtModeDialog:function(){return r.call("showCourtModeDialog")},sendState:function(e){return r.call("sendState",n(e))},draw:function(e){return r.call("draw",n(e))},win:function(e){return r.call("win",n(e))},lose:function(e){return r.call("lose",n(e))},surrender:function(e){return r.call("surrender",n(e))},applyAction:function(e,t){return r.call("applyAction",n(e),t)},getOnChainState:function(e){return r.call("getOnChainState","123",function(t){var i=a(t);return e(new Uint8Array(i))})},getOnChainActionDeadline:function(e){return r.call("getOnChainActionDeadline","123",e)},getCurrentBlockNumber:function(){return r.call("getCurrentBlockNumber","123")},finalizeOnChainGame:function(e){return r.call("finalizeOnChainGame","123",e)},submitScore:function(e){return r.call("submitScore",e)}},cc._RF.pop()},{}],follow:[function(e,t,i){"use strict";cc._RF.push(t,"d96400vNFFPIpzg48kPuXVc","follow");var o=s(e("./blockSpeed")),n=s(e("./randomSpeed")),a=s(e("../../../lib/celerx"));function s(e){return e&&e.__esModule?e:{default:e}}cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},blockPrefab:{default:null,type:cc.Prefab},birdPrefab:{default:null,type:cc.Prefab},seagullPrefab:{default:null,type:cc.Prefab},scoreDisplay:{default:null,type:cc.Label},scoreLabel:{default:null,type:cc.Label},gameoverSprite:{default:null,type:cc.Sprite},hp:1,doubleAudio:{default:null,type:cc.AudioClip},highAudio:{default:null,type:cc.AudioClip},hurtAudio:{default:null,type:cc.AudioClip},idleAudio:{default:null,type:cc.AudioClip},gameoverAudio:{default:null,type:cc.AudioClip},bgSprite:{default:null,type:cc.Node},gameoverFont:{default:null,type:cc.Node},comboFont:{default:null,type:cc.Node},muteButton:{default:null,type:cc.Sprite},isMuteSprite:{default:null,type:cc.SpriteFrame},notMuteSprite:{default:null,type:cc.SpriteFrame},aeCombobuff:{default:null,type:cc.Node},flyHoursePrefab:{default:null,type:cc.Prefab}},onLoad:function(){this.level=0,this.gameOn=!1,this.score=0,this.target&&(this.target.getComponent("HeroControl").game=this,this.timer=1,this.lastBird=0,this.isMute=!1,this.combo=0)},startTimer:function(){this.schedule(function(){this.timer++,this.timer%10==0&&cc.audioEngine.playEffect(this.idleAudio,!1)},1)},addBlock:function(){var e=cc.instantiate(this.blockPrefab),t=Math.random()<.5?-1:1,i=e.getComponent("PlatformMotion");e.setPosition(this.getNewStarPosition(t,!0)),i.type=Math.floor(Math.random()/.2),i.game=this;var a={no:0,probability:0,speed:0};for(var s in n.default){if(s>this.timer)break;a=n.default[s]}var r=(0,o.default)(this.timer),c=r.min,l=r.max;Math.random()<a.probability&&(c=a.speed,l=a.speed),i.moveSpeed=Math.random()*(l-c)+c,e.scaleX=t,this.lastBlock=e,this.node.addChild(e)},addHourse:function(){var e=cc.instantiate(this.flyHoursePrefab);e.setPosition(-267,450+50*Math.random()+40*(this.level-5));var t=e.getComponent(cc.Animation);t&&(t.play(),t.once("finished",function(){e.removeFromParent(!0)}),this.node.addChild(e,-10))},addBird:function(e){var t=cc.instantiate(e),i=Math.random()<.5?-1:1;t.setPosition(this.getNewStarPosition(i,!1)),t.getComponent("Bird").game=this,t.scaleX=i,this.node.addChild(t)},getNewStarPosition:function(e,t){var i=this.blockPrefab.data.width,o=(cc.winSize.width+i)*e/2,n=20+40*this.level+25;return t&&this.level++,cc.v2(o,n)},blockStoped:function(e){this.gameOn&&(Math.abs(this.lastX-e.node.x)<1?(this.addScore(2),cc.audioEngine.playEffect(this.doubleAudio,!1),this.combo++):(this.addScore(1),this.combo=0),this.lastX=e.node.x,this.addComponent(),this.score>5&&this.node.runAction(cc.jumpBy(.6,cc.v2(0,-40),-5,1)))},birdStoped:function(e){this.gameOn&&(this.addScore(3),this.addComponent())},addScore:function(e){var t=this;this.score+=e,this.score%100==0&&cc.audioEngine.playEffect(this.highAudio,!1),this.score%10==0&&Date.now()%2==0&&this.addHourse(),this.scoreLabel.string="/"+e,setTimeout(function(){t.scoreLabel.string=""},700),this.scoreDisplay.string=this.score},addComponent:function(){var e=0,t=0;switch(!0){case this.timer>=70:e=.5;case this.timer>=40:t=.3}var i=Math.random();this.timer<this.lastBird+10||i>e+t?this.addBlock():(this.lastBird=this.timer,i>e?this.addBird(this.seagullPrefab):this.addBird(this.birdPrefab))},gameOver:function(){var e=this;if(this.hp--,this.hp<1&&this.gameOn){if(cc.audioEngine.setFinishCallback(cc.audioEngine.playEffect(this.hurtAudio,!1),function(){cc.audioEngine.playEffect(e.gameoverAudio,!1)}),this.target.opacity=0,this.gameoverSprite.getComponent(cc.Animation).play("am_fish_ate"),this.gameOn=!1,this.gameoverFont.opacity=255,this.combo=0,this.score>=20){var t=cc.Camera.findCamera(this.node);if(t){var i=t.node.getComponent(cc.Animation);i&&i.play()}}setTimeout(function(){a.default.submitScore(e.score)},5e3)}},muteButtonClick:function(){this.isMute=!this.isMute,this.isMute?(cc.audioEngine.setMusicVolume(0),cc.audioEngine.setEffectsVolume(0),this.muteButton.spriteFrame=this.isMuteSprite):(cc.audioEngine.setMusicVolume(1),cc.audioEngine.setEffectsVolume(1),this.muteButton.spriteFrame=this.notMuteSprite)},update:function(){this.combo<3?(this.aeCombobuff.opacity=0,this.comboFont.opacity=0):(this.aeCombobuff.opacity=255,this.comboFont.opacity=255)},lateUpdate:function(){this.bgSprite.y=this.node.y-10}}),cc._RF.pop()},{"../../../lib/celerx":"celerx","./blockSpeed":"blockSpeed","./randomSpeed":"randomSpeed"}],randomSpeed:[function(e,t,i){"use strict";cc._RF.push(t,"c54a843p3ZLsKUtUpMQeyce","randomSpeed"),Object.defineProperty(i,"__esModule",{value:!0}),i.default={30:{no:1,probability:.1,speed:1},90:{no:3,probability:.1,speed:.9},120:{no:4,probability:.1,speed:.8},180:{no:6,probability:.2,speed:1.4},210:{no:7,probability:.2,speed:1.5},240:{no:8,probability:.2,speed:1},270:{no:9,probability:.2,speed:.9},300:{no:10,probability:.2,speed:2},330:{no:11,probability:.2,speed:2.5},360:{no:12,probability:.25,speed:3},390:{no:13,probability:.25,speed:.8},420:{no:14,probability:.25,speed:.9},450:{no:15,probability:.25,speed:.8},480:{no:16,probability:.25,speed:1.4},510:{no:17,probability:.25,speed:1.5},540:{no:18,probability:.25,speed:1},570:{no:19,probability:.3,speed:.9},600:{no:20,probability:.3,speed:.8},630:{no:21,probability:.3,speed:1.4},660:{no:22,probability:.3,speed:1.5},690:{no:23,probability:.3,speed:1},720:{no:24,probability:.3,speed:.9},750:{no:25,probability:.3,speed:2},780:{no:26,probability:.3,speed:2.5},810:{no:27,probability:.3,speed:3},840:{no:28,probability:.3,speed:.8},870:{no:29,probability:.3,speed:.9},900:{no:30,probability:.3,speed:.8},930:{no:31,probability:.3,speed:3},960:{no:32,probability:.3,speed:1.5},990:{no:33,probability:.3,speed:1},1020:{no:34,probability:.3,speed:.9},1050:{no:35,probability:.3,speed:.8},1080:{no:36,probability:.3,speed:1.4},1110:{no:37,probability:.3,speed:1.5},1140:{no:38,probability:.3,speed:1},1170:{no:39,probability:.3,speed:.9},1200:{no:40,probability:.3,speed:2},1230:{no:41,probability:.3,speed:2.5},1260:{no:42,probability:.3,speed:3},1290:{no:43,probability:.3,speed:.8},1320:{no:44,probability:.3,speed:2},1350:{no:45,probability:.3,speed:.8},1380:{no:46,probability:.3,speed:1.4},1410:{no:47,probability:.3,speed:1.5},1440:{no:48,probability:.3,speed:1},1470:{no:49,probability:.3,speed:.9},1500:{no:50,probability:.3,speed:.8},1530:{no:51,probability:.3,speed:1.4},1560:{no:52,probability:.3,speed:1.5},1590:{no:53,probability:.3,speed:1},1620:{no:54,probability:.3,speed:.9},1650:{no:55,probability:.3,speed:2},1680:{no:56,probability:.3,speed:2.5},1710:{no:57,probability:.3,speed:3},1740:{no:58,probability:.3,speed:.8},1770:{no:59,probability:.3,speed:.9},1800:{no:60,probability:.3,speed:.8},1830:{no:61,probability:.3,speed:1.4},1860:{no:62,probability:.3,speed:1.5},1890:{no:63,probability:.3,speed:1},1920:{no:64,probability:.3,speed:.9},1950:{no:65,probability:.3,speed:.8},1980:{no:66,probability:.3,speed:1.4},2010:{no:67,probability:.3,speed:1.5},2040:{no:68,probability:.3,speed:1},2070:{no:69,probability:.3,speed:.9},2100:{no:70,probability:.3,speed:2},2130:{no:71,probability:.3,speed:2.5},2160:{no:72,probability:.3,speed:3},2190:{no:73,probability:.3,speed:.8},2220:{no:74,probability:.3,speed:.9},2250:{no:75,probability:.3,speed:.8},2280:{no:76,probability:.3,speed:1.4},2310:{no:77,probability:.3,speed:1.5}},t.exports=i.default,cc._RF.pop()},{}]},{},["Bird","HeroControl","blockSpeed","follow","randomSpeed","Canvas","PlatformMotion","Wall","celerx"]);