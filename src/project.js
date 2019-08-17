window.__require=function t(e,i,o){function n(s,c){if(!i[s]){if(!e[s]){var r=s.split("/");if(r=r[r.length-1],!e[r]){var d="function"==typeof __require&&__require;if(!c&&d)return d(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+s+"'")}}var l=i[s]={exports:{}};e[s][0].call(l.exports,function(t){return n(e[s][1][t]||t)},l,l.exports,t,e,i,o)}return i[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<o.length;s++)n(o[s]);return n}({AniRemove:[function(t,e,i){"use strict";cc._RF.push(e,"b8a6aVfgeRFg5ULu5zx5Igf","AniRemove"),cc.Class({extends:cc.Component,properties:{type:{default:0,displayName:"\u52a8\u753b\u7c7b\u578b",type:cc.Enum({"\u6d41\u661f":0,"\u96fe":1,"\u661f\u661f":2,"\u98de\u789f":3,"\u767d\u4e91":4,"\u8fde\u51fb\u7279\u6548":5})}},onLoad:function(){var t=this.node.getComponent(cc.Animation);switch(this.node.x=0,this.type){case 0:case 1:t&&t.once("finished",this.remove,this);break;case 2:case 3:break;case 4:t&&t.once("finished",this.remove,this)}t&&t.play()},remove:function(){this.node.removeFromParent(!0)},start:function(){var t=(new Date).getSeconds()/60;switch(this.type){case 4:case 2:case 1:t<.25?(this.node.scaleX=-.5,this.node.scaleY=-.5):t<.5?(this.node.scaleX=-.5,this.node.scaleY=.5):t<.75?(this.node.scaleX=.5,this.node.scaleY=-.5):(this.node.scaleX=.5,this.node.scaleY=.5);break;case 3:this.node.scaleX=t<.5?-.4:.4}},update:function(t){2!=this.type&&3!=this.type&&5!=this.type||this.node.convertToWorldSpace(this.node.position).y<-800&&this.remove()}}),cc._RF.pop()},{}],Bird:[function(t,e,i){"use strict";cc._RF.push(e,"273baYj5nZF96xONv7M6SF5","Bird"),cc.Class({extends:cc.Component,properties:{moveSpeed:1.2,animation:"am_penican",birdAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.moveAction=this.setMoveAction(),this.node.runAction(this.moveAction),this.moving=!0;var t=this.getComponent(cc.Animation).play(this.animation);t.speed=.25,t.repeatCount=1/0,cc.audioEngine.playEffect(this.birdAudio,!1)},setMoveAction:function(){return cc.moveBy(cc.winSize.width/this.moveSpeed/150,cc.v2(2*-this.node.position.x,0))},onCollisionEnter:function(t,e){this.game.gameOver()},update:function(t){this.moveAction.isDone()&&this.moving&&(this.moving=!1,this.game.birdStoped(this),this.node.destroy())}}),cc._RF.pop()},{}],Canvas:[function(t,e,i){"use strict";cc._RF.push(e,"4e439uzFENNgbliJKpXMaTr","Canvas"),cc.Class({extends:cc.Component,properties:{bgNode:{type:cc.Node,default:null},bgSkyPrefab:{type:cc.Prefab,default:null},bgNightPrefab:{type:cc.Prefab,default:null},bgSpacePrefab:{type:cc.Prefab,default:null}},onLoad:function(){var t=(new Date).getSeconds()/60;this.bgNode.removeAllChildren(!0),t<1/3?this.bgNode.addChild(cc.instantiate(this.bgSkyPrefab),0,"bgPrefab"):t<2/3?this.bgNode.addChild(cc.instantiate(this.bgNightPrefab),0,"bgPrefab"):this.bgNode.addChild(cc.instantiate(this.bgSpacePrefab),0,"bgPrefab")}}),cc._RF.pop()},{}],ComboEffect:[function(t,e,i){"use strict";cc._RF.push(e,"4f503nV3KFKnLc49hzxboTr","ComboEffect"),cc.Class({extends:cc.Component,properties:{frame:cc.Node},start:function(){},setHeight:function(t){this.frame.height=t}}),cc._RF.pop()},{}],HeroControl:[function(t,e,i){"use strict";cc._RF.push(e,"339d2dg1QpEKKxBJBzHiDJ0","HeroControl");var o=function(t){return t&&t.__esModule?t:{default:t}}(t("../../../lib/celerx")),n=t("../Utils/random");cc.Class({extends:cc.Component,properties:{speed:cc.v2(0,0),maxSpeed:cc.v2(2e3,2e3),gravity:-1e3,drag:1e3,direction:0,isSuper:!1,jumpSpeed:300,scoreDisplay:{default:null,type:cc.Label},stop1Sprite:{default:null,type:cc.Sprite},stop2Sprite:{default:null,type:cc.Sprite},stop3Sprite:{default:null,type:cc.Sprite},aeCombobuff:{default:null,type:cc.Sprite},jumpAudio:{default:null,type:cc.AudioClip},startButton:{default:null,type:cc.Node},bgAudio:{default:null,type:cc.AudioClip}},onLoad:function(){var t=cc.Canvas.instance.node;t.on("touchstart",this.onTouchStart,this),t.on("touchend",this.onTouchEnd,this),this.collisionX=0,this.collisionY=0,this.prePosition=cc.v2(),this.preStep=cc.v2(),this.touchingNumber=0,this.playIdleAnimation(),this.aeStop=0;var e=this.startButton.getComponent(cc.Animation),i=e.play("btn_start");i.speed=.1,i.repeatCount=1/0,(i=(e=this.aeCombobuff.getComponent(cc.Animation)).play("ae_combobuff")).speed=.3,i.repeatCount=1/0;var a=o.default.getMatch();(0,n.setSeed)(a?a.sharedRandomSeed:0),this.bottomLine=25,o.default.start()},onEnable:function(){cc.director.getCollisionManager().enabled=!0,cc.director.getCollisionManager().enabledDebugDraw=!1},onDisable:function(){cc.director.getCollisionManager().enabled=!1,cc.director.getCollisionManager().enabledDebugDraw=!1},playIdleAnimation:function(){var t=this.getComponent(cc.Animation),e=this.isSuper?t.play("am_fish_stay_super"):t.play("am_fish_stay");e.speed=.3,e.repeatCount=1/0},onTouchStart:function(t){if(!this.jumping&&this.game.gameOn){this.jumping=!0,this.speed.y=this.jumpSpeed,this.collisionY=0;var e=this.getComponent(cc.Animation),i=this.isSuper?e.play("am_fish_jump_super"):e.play("am_fish_jump");i.speed=.4,i.onStop=this.playIdleAnimation.bind(this),cc.audioEngine.playEffect(this.jumpAudio,!1),parseInt(this.scoreDisplay.string)>20&&cc.director.emit("big_cloud_move_down")}},onTouchEnd:function(t){this.direction=0},startGame:function(){this.game.gameOn||(cc.audioEngine.playMusic(this.bgAudio,!0),this.game.gameOn=!0,this.game.addBlock(),this.game.startTimer(),this.startButton.y=-1e3)},onCollisionEnter:function(t,e){this.touchingNumber++;var i=t.world.aabb,o=t.world.preAabb.clone(),n=e.world.aabb,a=e.world.preAabb.clone();if(a.x=n.x,o.x=i.x,cc.Intersection.rectRect(a,o))return this.speed.x<0&&a.xMax>o.xMax?(this.node.x=o.xMax-this.node.parent.x,this.collisionX=-1):this.speed.x>0&&a.xMin<o.xMin&&(this.node.x=o.xMin-a.width-this.node.parent.x,this.collisionX=1),this.speed.x=0,void(t.touchingX=!0);if(a.y=n.y,o.y=i.y,cc.Intersection.rectRect(a,o)){if(this.game.gameOn){switch(this.aeStop){case 0:this.stop1Sprite.getComponent(cc.Animation).play("ae_stop1").speed=.8,this.aeStop++;break;case 1:this.stop2Sprite.getComponent(cc.Animation).play("ae_stop2").speed=.6,this.aeStop++;break;case 2:this.stop3Sprite.getComponent(cc.Animation).play("ae_stop3").speed=.6,this.aeStop=0}}this.speed.y<0&&a.yMax>o.yMax?(this.node.y=o.yMax-this.node.parent.y,this.jumping=!1,this.collisionY=-1):this.speed.y>0&&a.yMin<o.yMin&&(this.node.y=o.yMin-a.height-this.node.parent.y,this.collisionY=1),this.speed.y=0,t.touchingY=!0}},onCollisionStay:function(t,e){if(-1===this.collisionY&&"Platform"===t.node.group)t.node.getComponent("PlatformMotion")},onCollisionExit:function(t){this.touchingNumber--,0===this.touchingNumber&&(this.node.color=cc.Color.WHITE),t.touchingX?(this.collisionX=0,t.touchingX=!1):t.touchingY&&(t.touchingY=!1,this.collisionY=0,this.jumping=!0)},update:function(t){0===this.collisionY&&(this.speed.y+=this.gravity*t,Math.abs(this.speed.y)>this.maxSpeed.y&&(this.speed.y=this.speed.y>0?this.maxSpeed.y:-this.maxSpeed.y)),this.node.y<this.bottomLine&&(this.speed.y=0,this.collisionY=-1,this.node.y=this.bottomLine,this.jumping=!1,console.log("opp")),0===this.direction?this.speed.x>0?(this.speed.x-=this.drag*t,this.speed.x<=0&&(this.speed.x=0)):this.speed.x<0&&(this.speed.x+=this.drag*t,this.speed.x>=0&&(this.speed.x=0)):(this.speed.x+=(this.direction>0?1:-1)*this.drag*t,Math.abs(this.speed.x)>this.maxSpeed.x&&(this.speed.x=this.speed.x>0?this.maxSpeed.x:-this.maxSpeed.x)),this.speed.x*this.collisionX>0&&(this.speed.x=0),this.prePosition.x=this.node.x,this.prePosition.y=this.node.y,this.preStep.x=this.speed.x*t,this.preStep.y=this.speed.y*t,this.node.x+=this.speed.x*t,this.node.y+=this.speed.y*t,this.stop1Sprite.node.y=this.node.y+45,this.stop2Sprite.node.y=this.node.y+25,this.stop3Sprite.node.y=this.node.y+45,this.aeCombobuff.node.y=this.node.y+55}}),cc._RF.pop()},{"../../../lib/celerx":"celerx","../Utils/random":"random"}],PlatformMotion:[function(t,e,i){"use strict";cc._RF.push(e,"0f761EZmKhNLKJpUXTrb4fF","PlatformMotion");var o=t("../Utils/random");cc.Class({extends:cc.Component,properties:{moveSpeed:0,type:0,isOver:!1,blackcat:{default:null,type:cc.SpriteFrame},licat:{default:null,type:cc.SpriteFrame},nainiucat:{default:null,type:cc.SpriteFrame},sanhuacat:{default:null,type:cc.SpriteFrame},oracat:{default:null,type:cc.SpriteFrame},eatSprite:{default:null,type:cc.Sprite},cat1Audio:{default:null,type:cc.AudioClip},cat2Audio:{default:null,type:cc.AudioClip}},onLoad:function(){this.moveAction=this.setMoveAction(),this.node.runAction(this.moveAction),this.moving=!0,this.isOver=!1;var t=this.node.getComponent(cc.Sprite);switch(this.type){case 4:t.spriteFrame=this.blackcat;break;case 3:t.spriteFrame=this.licat;break;case 2:t.spriteFrame=this.nainiucat;break;case 1:t.spriteFrame=this.sanhuacat;break;default:t.spriteFrame=this.oracat}(0,o.getRandom)()<.5?cc.audioEngine.playEffect(this.cat1Audio,!1):cc.audioEngine.playEffect(this.cat2Audio,!1)},setMoveAction:function(){return cc.moveBy(cc.winSize.width/this.moveSpeed/300,cc.v2(-this.node.position.x,0))},onCollisionStay:function(t,e){if(e.touchingX&&this.moving){var i=this.eatSprite.getComponent(cc.Animation);if(!this.anim){switch(this.type){case 4:this.anim="am_fish_blackate";break;case 3:this.anim="am_fish_limaoate";break;case 2:this.anim="am_fish_nainiuate";break;case 1:this.anim="am_fish_sanhuaate";break;default:this.anim="am_fish_jucatate"}i.play(this.anim).speed=.1,this.game.gameOver()}}e.touchingY&&this.moving&&this.stopBlock()},update:function(t){this.moveAction.isDone()&&this.moving&&this.stopBlock()},stopBlock:function(){this.node.stopAllActions(),this.moving=!1,this.game.blockStoped(this),this.isOver=!0;var t=this.getComponent(cc.Animation),e=void 0;switch(this.type){case 4:e="am_blackcat";break;case 3:e="am_licat";break;case 2:e="am_nainiucat";break;case 1:e="am_sanhuacat";break;default:e="am_oracat"}t.play(e).speed=.3}}),cc._RF.pop()},{"../Utils/random":"random"}],Wall:[function(t,e,i){"use strict";cc._RF.push(e,"1a279oXNoxFFI516fswAbVo","Wall");var o=cc.Enum({Left:0,Right:1,Top:2,Bottom:3});cc.Class({extends:cc.Component,properties:{type:{default:o.Left,type:o},width:5},start:function(){var t=this.getComponent(cc.BoxCollider);if(t){var e=this.node,i=this.type,n=cc.winSize.width,a=cc.winSize.height,s=this.width;i===o.Left?(e.height=a,e.width=s,e.x=0,e.y=a/2):i===o.Right?(e.height=a,e.width=s,e.x=n,e.y=a/2):i===o.Top?(e.width=n,e.height=s,e.x=n/2,e.y=a):i===o.Bottom&&(e.width=n,e.height=s,e.x=0,e.y=0),t.size=e.getContentSize()}}}),cc._RF.pop()},{}],bgControl:[function(t,e,i){"use strict";cc._RF.push(e,"48f9e+meoFGFIj/4sjpMnOj","bgControl"),cc.Class({extends:cc.Component,onLoad:function(){var t=this;switch(this.lastY=this.node.y,this.BackgroundType){case 0:this.addFlowStar(0,150),this.addStar(0,140),this.addFrog(0,50),this.addUFO(223,0);break;case 1:this.addStar(0,100),this.addFrog(0,50),this.addFlowStar(0,150);break;case 2:this.addCloudBack(0,-13),this.addFlowCould(0,41)}cc.director.on("lastBlockY",function(e){t.lastBlockY=e},this)},addStar:function(t,e){var i=cc.instantiate(this.star);i.x=t,i.y=e,this.node.addChild(i)},addCloudBack:function(t,e){var i=this;this.root||(this.root=this.node.getParent()),this.cloudBack||(this.cloudBack=cc.instantiate(this.cloudBgPrefab),this.root.addChild(this.cloudBack)),this.cloudBack.x=t,this.cloudBack.y=e,this.cloudAni=this.cloudBack.getComponent(cc.Animation),cc.director.on("big_cloud_move_down",function(){i.cloudAni&&i.cloudAni.play("move_down")},this)},addFlowCould:function(t,e){var i=cc.instantiate(this.cloud);i.x=t,i.y=e,this.node.addChild(i)},addFlowStar:function(t,e){this.root||(this.root=this.node.getParent());var i=cc.instantiate(this.flowStar);this.root.addChild(i),i.x=t,i.y=e},addFrog:function(t,e){var i=cc.instantiate(this.frogPrefab);i.x=t,i.y=e,this.node.addChild(i)},addUFO:function(t,e){var i=cc.instantiate(this.spaceShip);i.x=t,i.y=e,this.node.addChild(i)},start:function(){cc.director.on("addHeight",this.addBgHeight,this),this.ani=this.node.getComponent(cc.Animation),this.ani&&this.ani.play(),this.root=this.node.getParent()},addBgHeight:function(t){this.bgSprite.node.height+=t},setBgPos:function(t,e){this.node.x=t,this.node.y=e},setBgScale:function(t,e){this.node.scaleX=t,this.node.scaleY=e},properties:{bgSprite:{type:cc.Sprite,default:null},BackgroundType:{default:0,displayName:"\u80cc\u666f\u7c7b\u578b",type:cc.Enum({Space:0,Night:1,Sky:2})},star:{default:null,type:cc.Prefab,displayName:"\u661f\u661f\u52a8\u753b"},flowStar:{default:null,type:cc.Prefab,displayName:"\u6d41\u661f\u52a8\u753b"},cloud:{default:null,type:cc.Prefab,displayName:"\u767d\u4e91\u52a8\u753b"},frogPrefab:{default:null,type:cc.Prefab,displayName:"\u70df\u96fe\u52a8\u753b"},spaceShip:{default:null,type:cc.Prefab,displayName:"\u98de\u789f\u52a8\u753b"},cloudBgPrefab:{default:null,type:cc.Prefab,displayName:"\u767d\u4e91\u5927\u80cc\u666f"},lastY:0,moveTotalY:0,cloudTime:0,cloudRandTime:10,flowStarTime:0,flowStarRandTime:15,frogTime:0,frogRandTime:30,ufoTime:0,ufoRandTime:24,starTime:0,starRandTime:20,lastBlockY:0},update:function(t){this.moveTotalY+=this.lastY-this.node.y,this.lastY=this.node.y,this.moveTotalY<300||(this.cloudTime+=t,this.flowStarTime+=t,this.frogTime+=t,this.ufoTime+=t,this.starTime+=t,this.cloudTime>this.cloudRandTime&&2==this.BackgroundType&&(this.cloudTime=0,this.cloudRandTime=10+10*Math.random(),this.addFlowCould(0,this.lastBlockY+60*Math.random())),this.flowStarTime>this.flowStarRandTime&&2!=this.BackgroundType&&(this.flowStarTime=0,this.flowStarRandTime=15+10*Math.random(),this.addFlowStar(0,150)),this.frogTime>this.frogRandTime&&2!=this.BackgroundType&&(this.frogTime=0,this.frogRandTime=25+10*Math.random(),this.addFrog(0,this.lastBlockY+60*Math.random())),this.starTime>this.starRandTime&&2!=this.BackgroundType&&(this.starTime=0,this.starRandTime=15+10*Math.random(),this.addStar(0,300+this.lastBlockY+60*Math.random())),this.ufoTime>this.ufoRandTime&&0==this.BackgroundType&&(this.ufoTime=0,this.ufoRandTime=20+10*Math.random(),this.addUFO(223,this.lastBlockY+20*Math.random())))}}),cc._RF.pop()},{}],blockSpeed:[function(t,e,i){"use strict";cc._RF.push(e,"97bd2VtYjxOXpAlxWMb4ASm","blockSpeed"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(t){var e={};switch(!0){case t>=330:var i=Math.floor((t-330)/30);e={no:22+i,min:2.5+.1*i,max:2.7+.1*i};break;case t>=305:e={no:21,min:2.4,max:2.6};break;case t>=280:e={no:20,min:2.3,max:2.5};break;case t>=255:e={no:19,min:2.2,max:2.4};break;case t>=230:e={no:18,min:2.1,max:2.3};break;case t>=205:e={no:17,min:2,max:2.2};break;case t>=185:e={no:16,min:1.9,max:2.1};break;case t>=165:e={no:15,min:1.8,max:2};break;case t>=150:e={no:14,min:1.7,max:1.9};break;case t>=135:e={no:13,min:1.6,max:1.8};break;case t>=120:e={no:12,min:1.5,max:1.7};break;case t>=100:e={no:11,min:1.4,max:1.6};break;case t>=80:e={no:10,min:1.3,max:1.5};break;case t>=70:e={no:9,min:1.2,max:1.4};break;case t>=60:e={no:8,min:1.1,max:1.3};break;case t>=50:e={no:7,min:.9,max:1.1};break;case t>=40:e={no:6,min:.8,max:1};break;case t>=30:e={no:5,min:.7,max:.9};break;case t>=20:e={no:4,min:.6,max:.8};break;case t>=12:e={no:3,min:.5,max:.8};break;case t>=5:e={no:2,min:.4,max:.5};break;default:e={no:1,min:.3,max:.4}}return e},e.exports=i.default,cc._RF.pop()},{}],celerx:[function(t,e,i){"use strict";cc._RF.push(e,"f802958FrhFL4LPmY37Shwu","celerx");var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function n(t){for(var e=new Uint8Array(t),i=new Array,o=0,n=0,a=new Array(3),s=new Array(4),c=e.length,d=0;c--;)if(a[o++]=e[d++],3==o){for(s[0]=(252&a[0])>>2,s[1]=((3&a[0])<<4)+((240&a[1])>>4),s[2]=((15&a[1])<<2)+((192&a[2])>>6),s[3]=63&a[2],o=0;o<4;o++)i+=r.charAt(s[o]);o=0}if(o){for(n=o;n<3;n++)a[n]=0;for(s[0]=(252&a[0])>>2,s[1]=((3&a[0])<<4)+((240&a[1])>>4),s[2]=((15&a[1])<<2)+((192&a[2])>>6),s[3]=63&a[2],n=0;n<o+1;n++)i+=r.charAt(s[n]);for(;o++<3;)i+="="}return i}function a(t){var e,i,o,n,a,s,c=new Array,r=0;if(t!=(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,""))&&alert("Warning! Characters outside Base64 range in input string ignored."),t.length%4)return alert("Error: Input length is not a multiple of 4 bytes."),"";for(var l=0;r<t.length;)e=d.indexOf(t.charAt(r++))<<2|(n=d.indexOf(t.charAt(r++)))>>4,i=(15&n)<<4|(a=d.indexOf(t.charAt(r++)))>>2,o=(3&a)<<6|(s=d.indexOf(t.charAt(r++))),c[l++]=e,64!=a&&(c[l++]=i),64!=s&&(c[l++]=o);return c}var s="function"==typeof Symbol&&"symbol"==o(Symbol.iterator)?function(t){return void 0===t?"undefined":o(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":void 0===t?"undefined":o(t)},c={default:void 0,call:function(t,e,i){var o="";if("function"==typeof e&&(i=e,e={}),e={data:void 0===e?null:e},"function"==typeof i){var n="dscb"+window.dscb++;window[n]=i,e._dscbstub=n}return e=JSON.stringify(e),window._dsbridge?o=_dsbridge.call(t,e):(window._dswk||-1!=navigator.userAgent.indexOf("_dsbridge"))&&(o=prompt("_dsbridge="+t,e)),JSON.parse(o||"{}").data},register:function(t,e,i){i=i?window._dsaf:window._dsf,window._dsInit||(window._dsInit=!0,setTimeout(function(){c.call("_dsb.dsinit")},0)),"object"==(void 0===e?"undefined":s(e))?i._obs[t]=e:i[t]=e},registerAsyn:function(t,e){this.register(t,e,!0)},hasNativeMethod:function(t,e){return this.call("_dsb.hasNativeMethod",{name:t,type:e||"all"})},disableJavascriptDialogBlock:function(t){this.call("_dsb.disableJavascriptDialogBlock",{disable:!1!==t})}};!function(){if(!window._dsf){var t,e={_dsf:{_obs:{}},_dsaf:{_obs:{}},dscb:0,celerx:c,close:function(){c.call("_dsb.closePage")},_handleMessageFromNative:function(t){var e=JSON.parse(t.data),i={id:t.callbackId,complete:!0},o=this._dsf[t.method],n=this._dsaf[t.method],a=function(t,o){i.data=t.apply(o,e),c.call("_dsb.returnValue",i)},s=function(t,o){e.push(function(t,e){i.data=t,i.complete=!1!==e,c.call("_dsb.returnValue",i)}),t.apply(o,e)};if(o)a(o,this._dsf);else if(n)s(n,this._dsaf);else if(!(2>(o=t.method.split(".")).length)){t=o.pop();o=o.join(".");var r=(n=(n=this._dsf._obs)[o]||{})[t];r&&"function"==typeof r?a(r,n):(r=(n=(n=this._dsaf._obs)[o]||{})[t])&&"function"==typeof r&&s(r,n)}}};for(t in e)window[t]=e[t];c.register("_hasJavascriptMethod",function(t,e){return 2>(e=t.split(".")).length?!(!_dsf[e]&&!_dsaf[e]):(t=e.pop(),e=e.join("."),(e=_dsf._obs[e]||_dsaf._obs[e])&&!!e[t])})}}();var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.exports={onStateReceived:function(t){return c.register("onStateReceived",function(e){var i=a(e);return t(new Uint8Array(i))})},onCourtModeStarted:function(t){return c.register("onCourtModeStarted",t)},getMatch:function(){var t=c.call("getMatch","123");try{t=JSON.parse(t)}catch(t){}return t},showCourtModeDialog:function(){return c.call("showCourtModeDialog")},start:function(){return c.call("start")},sendState:function(t){return c.call("sendState",n(t))},draw:function(t){return c.call("draw",n(t))},win:function(t){return c.call("win",n(t))},lose:function(t){return c.call("lose",n(t))},surrender:function(t){return c.call("surrender",n(t))},applyAction:function(t,e){return c.call("applyAction",n(t),e)},getOnChainState:function(t){return c.call("getOnChainState","123",function(e){var i=a(e);return t(new Uint8Array(i))})},getOnChainActionDeadline:function(t){return c.call("getOnChainActionDeadline","123",t)},getCurrentBlockNumber:function(){return c.call("getCurrentBlockNumber","123")},finalizeOnChainGame:function(t){return c.call("finalizeOnChainGame","123",t)},submitScore:function(t){return c.call("submitScore",t)}},cc._RF.pop()},{}],follow:[function(t,e,i){"use strict";cc._RF.push(e,"d96400vNFFPIpzg48kPuXVc","follow");var o=c(t("./blockSpeed")),n=c(t("./randomSpeed")),a=c(t("../../../lib/celerx")),s=t("../Utils/random");function c(t){return t&&t.__esModule?t:{default:t}}cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},blockPrefab:{default:null,type:cc.Prefab},birdPrefab:{default:null,type:cc.Prefab},seagullPrefab:{default:null,type:cc.Prefab},scoreDisplay:{default:null,type:cc.Label},scoreLabel:{default:null,type:cc.Label},gameoverSprite:{default:null,type:cc.Sprite},hp:1,doubleAudio:{default:null,type:cc.AudioClip},highAudio:{default:null,type:cc.AudioClip},hurtAudio:{default:null,type:cc.AudioClip},idleAudio:{default:null,type:cc.AudioClip},gameoverAudio:{default:null,type:cc.AudioClip},bgSprite:{default:null,type:cc.Node},gameoverFont:{default:null,type:cc.Node},comboFont:{default:null,type:cc.Node},muteButton:{default:null,type:cc.Sprite},isMuteSprite:{default:null,type:cc.SpriteFrame},notMuteSprite:{default:null,type:cc.SpriteFrame},aeCombobuff:{default:null,type:cc.Node},flyHoursePrefab:{default:null,type:cc.Prefab},blockRoot:{default:null,type:cc.Animation,displayName:"\u5c0f\u732b\u6839\u8282\u70b9"},comboPrefab:{type:cc.Prefab,default:null},gameOverFishNormal:{type:cc.SpriteFrame,default:null},gameOverFishSuper:{type:cc.SpriteFrame,default:null}},onLoad:function(){this.level=0,this.gameOn=!1,this.score=0,this.target&&(this.target.getComponent("HeroControl").game=this,this.timer=1,this.lastBird=0,this.isMute=!1,this.combo=0)},start:function(){},startTimer:function(){this.schedule(function(){this.timer++,this.timer%10==0&&cc.audioEngine.playEffect(this.idleAudio,!1)},1)},addBlock:function(){var t=cc.instantiate(this.blockPrefab),e=(0,s.getRandom)()<.5?-1:1,i=t.getComponent("PlatformMotion");t.setPosition(this.getNewStarPosition(e,!0)),i.type=Math.floor((0,s.getRandom)()/.2),i.game=this;var a={no:0,probability:0,speed:0};for(var c in n.default){if(c>this.timer)break;a=n.default[c]}var r=(0,o.default)(this.timer),d=r.min,l=r.max;(0,s.getRandom)()<a.probability&&(d=a.speed,l=a.speed),i.moveSpeed=(0,s.getRandom)()*(l-d)+d,t.scaleX=e,this.newBlock=t,this.score>5&&cc.director.emit("lastBlockY",t.y),this.node.addChild(t,this.score+1)},addHourse:function(){var t=cc.instantiate(this.flyHoursePrefab);t.setPosition(-267,450+50*Math.random()+40*(this.level-5));var e=t.getComponent(cc.Animation);e&&(e.play(),e.once("finished",function(){t.removeFromParent(!0)}),this.node.addChild(t,-10))},addBird:function(t){var e=cc.instantiate(t),i=(0,s.getRandom)()<.5?-1:1;e.setPosition(this.getNewStarPosition(i,!1)),e.getComponent("Bird").game=this,e.scaleX=i,this.node.addChild(e)},getNewStarPosition:function(t,e){var i=this.blockPrefab.data.width,o=(cc.winSize.width+i)*t/2,n=20+40*this.level+25;return e&&this.level++,cc.v2(o,n)},changeBlockParent:function(t){var e=this;setTimeout(function(){t.node.parent=e.blockRoot.node},2e3)},blockStoped:function(t){if(this.lastBlock&&this.changeBlockParent(this.lastBlock),this.lastBlock=t,this.gameOn){var e=this.target.getComponent("HeroControl");Math.abs(this.lastX-t.node.x)<2?(this.addScore(2),cc.audioEngine.playEffect(this.doubleAudio,!1),this.combo++,this.combo>=4&&(this.comboEffect||(this.comboEffect=cc.instantiate(this.comboPrefab),this.comboEffect.x=this.lastBlock.node.x),this.comboEffect.y=50,this.comboEffect.parent=this.lastBlock.node,this.comboEffect.getComponent("ComboEffect").setHeight(this.lastBlock.node.y+50))):(this.comboEffect=null,this.addScore(1),this.combo=0),e&&(e.isSuper=this.combo>=3),e&&e.playIdleAnimation(),e&&(e.bottomLine+=40),this.lastX=t.node.x,this.addComponent(),this.score>5&&(this.node.runAction(cc.jumpBy(.6,cc.v2(0,-40),-5,1)),cc.director.emit("addHeight",100))}},birdStoped:function(t){this.gameOn&&(this.addScore(3),this.addComponent())},addScore:function(t){var e=this;this.score+=t,this.score%100==0&&cc.audioEngine.playEffect(this.highAudio,!1),this.score%50==0&&this.addHourse(),this.score>20&&this.blockRoot.play(),this.scoreLabel.string="/"+t;var i=this.scoreLabel.node.getComponent(cc.Animation);i?(i.stop(),i.play()):setTimeout(function(){e.scoreLabel.string=""},700),this.scoreDisplay.string=this.score},addComponent:function(){var t=0,e=0;switch(!0){case this.timer>=70:t=.5;case this.timer>=40:e=.3}var i=(0,s.getRandom)();this.timer<this.lastBird+10||i>t+e?this.addBlock():(this.lastBird=this.timer,i>t?this.addBird(this.seagullPrefab):this.addBird(this.birdPrefab))},gameOver:function(){var t=this;if(this.hp--,this.hp<1&&this.gameOn){this.newBlock&&(this.newBlock.parent=this.blockRoot.node,this.blockRoot.node.zIndex=1/0),cc.audioEngine.setFinishCallback(cc.audioEngine.playEffect(this.hurtAudio,!1),function(){cc.audioEngine.playEffect(t.gameoverAudio,!1)}),this.target.opacity=0;var e=this.gameoverSprite.getComponent(cc.Animation);if(this.combo>=3?this.gameoverSprite.spriteFrame=this.gameOverFishSuper:this.gameoverSprite.spriteFrame=this.gameOverFishNormal,e.play("am_fish_ate"),this.gameOn=!1,this.gameoverFont.opacity=255,this.combo=0,this.score>=20){var i=cc.Camera.findCamera(this.node);if(i){var o=i.node.getComponent(cc.Animation);o&&o.play()}}setTimeout(function(){a.default.submitScore(t.score)},5e3)}},muteButtonClick:function(){this.isMute=!this.isMute,this.isMute?(cc.audioEngine.setMusicVolume(0),cc.audioEngine.setEffectsVolume(0),this.muteButton.spriteFrame=this.isMuteSprite):(cc.audioEngine.setMusicVolume(1),cc.audioEngine.setEffectsVolume(1),this.muteButton.spriteFrame=this.notMuteSprite)},update:function(){this.combo<3?(this.aeCombobuff.opacity=0,this.comboFont.opacity=0):(this.aeCombobuff.opacity=255,this.comboFont.opacity=255)},lateUpdate:function(){this.bgRoot?this.bgRoot.y=this.node.y-10:this.bgRoot=this.bgSprite.getChildByName("bgPrefab")}}),cc._RF.pop()},{"../../../lib/celerx":"celerx","../Utils/random":"random","./blockSpeed":"blockSpeed","./randomSpeed":"randomSpeed"}],randomSpeed:[function(t,e,i){"use strict";cc._RF.push(e,"c54a843p3ZLsKUtUpMQeyce","randomSpeed"),Object.defineProperty(i,"__esModule",{value:!0}),i.default={30:{no:1,probability:.1,speed:1},90:{no:3,probability:.1,speed:.9},120:{no:4,probability:.1,speed:.8},180:{no:6,probability:.2,speed:1.4},210:{no:7,probability:.2,speed:1.5},240:{no:8,probability:.2,speed:1},270:{no:9,probability:.2,speed:.9},300:{no:10,probability:.2,speed:2},330:{no:11,probability:.2,speed:2.5},360:{no:12,probability:.25,speed:3},390:{no:13,probability:.25,speed:.8},420:{no:14,probability:.25,speed:.9},450:{no:15,probability:.25,speed:.8},480:{no:16,probability:.25,speed:1.4},510:{no:17,probability:.25,speed:1.5},540:{no:18,probability:.25,speed:1},570:{no:19,probability:.3,speed:.9},600:{no:20,probability:.3,speed:.8},630:{no:21,probability:.3,speed:1.4},660:{no:22,probability:.3,speed:1.5},690:{no:23,probability:.3,speed:1},720:{no:24,probability:.3,speed:.9},750:{no:25,probability:.3,speed:2},780:{no:26,probability:.3,speed:2.5},810:{no:27,probability:.3,speed:3},840:{no:28,probability:.3,speed:.8},870:{no:29,probability:.3,speed:.9},900:{no:30,probability:.3,speed:.8},930:{no:31,probability:.3,speed:3},960:{no:32,probability:.3,speed:1.5},990:{no:33,probability:.3,speed:1},1020:{no:34,probability:.3,speed:.9},1050:{no:35,probability:.3,speed:.8},1080:{no:36,probability:.3,speed:1.4},1110:{no:37,probability:.3,speed:1.5},1140:{no:38,probability:.3,speed:1},1170:{no:39,probability:.3,speed:.9},1200:{no:40,probability:.3,speed:2},1230:{no:41,probability:.3,speed:2.5},1260:{no:42,probability:.3,speed:3},1290:{no:43,probability:.3,speed:.8},1320:{no:44,probability:.3,speed:2},1350:{no:45,probability:.3,speed:.8},1380:{no:46,probability:.3,speed:1.4},1410:{no:47,probability:.3,speed:1.5},1440:{no:48,probability:.3,speed:1},1470:{no:49,probability:.3,speed:.9},1500:{no:50,probability:.3,speed:.8},1530:{no:51,probability:.3,speed:1.4},1560:{no:52,probability:.3,speed:1.5},1590:{no:53,probability:.3,speed:1},1620:{no:54,probability:.3,speed:.9},1650:{no:55,probability:.3,speed:2},1680:{no:56,probability:.3,speed:2.5},1710:{no:57,probability:.3,speed:3},1740:{no:58,probability:.3,speed:.8},1770:{no:59,probability:.3,speed:.9},1800:{no:60,probability:.3,speed:.8},1830:{no:61,probability:.3,speed:1.4},1860:{no:62,probability:.3,speed:1.5},1890:{no:63,probability:.3,speed:1},1920:{no:64,probability:.3,speed:.9},1950:{no:65,probability:.3,speed:.8},1980:{no:66,probability:.3,speed:1.4},2010:{no:67,probability:.3,speed:1.5},2040:{no:68,probability:.3,speed:1},2070:{no:69,probability:.3,speed:.9},2100:{no:70,probability:.3,speed:2},2130:{no:71,probability:.3,speed:2.5},2160:{no:72,probability:.3,speed:3},2190:{no:73,probability:.3,speed:.8},2220:{no:74,probability:.3,speed:.9},2250:{no:75,probability:.3,speed:.8},2280:{no:76,probability:.3,speed:1.4},2310:{no:77,probability:.3,speed:1.5}},e.exports=i.default,cc._RF.pop()},{}],random:[function(t,e,i){"use strict";cc._RF.push(e,"cab50QLmFNPqoJCwUzjzV40","random"),Object.defineProperty(i,"__esModule",{value:!0});var o=0;function n(t,e,i){return e+(t=(9301*t+49297)%233280)/233280*(i-e)}i.default={setSeed:function(t){o=t},getRandom:function(t,e){var i=o,a=n(i,t=t||0,e=e||1);return o+=Math.floor(n(i,1,1e5)),a}},e.exports=i.default,cc._RF.pop()},{}]},{},["AniRemove","Bird","ComboEffect","HeroControl","bgControl","blockSpeed","follow","randomSpeed","Canvas","PlatformMotion","Wall","random","celerx"]);