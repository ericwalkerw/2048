// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    _isLock: false,
    mGrid: require("grid"),
  },

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onKeyDown(event) {
    if (this._isLock) return;
    this._isLock = true;

    switch (event.keyCode) {
      case cc.macro.KEY.a:
        cc.log("press A");
        this.mGrid.slideL();
        break;
      case cc.macro.KEY.d:
        cc.log("press D");
        this.mGrid.slideR();
        break;
      case cc.macro.KEY.w:
        cc.log("press W");
        this.mGrid.slideU();
        break;
      case cc.macro.KEY.s:
        cc.log("press S");
        this.mGrid.slideD();
        break;
    }
  },

  onKeyUp() {
    this._isLock = false;
  },
});
