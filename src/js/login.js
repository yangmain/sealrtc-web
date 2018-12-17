(function (dependencies) {
  const RongSeal = dependencies.RongSeal,
    utils = RongSeal.utils,
    common = RongSeal.common,
    sealAlert = common.sealAlert,
    getDom = utils.getDom,
    Cache = utils.Cache;

  const roomIdDom = getDom('#roomId'),
    userIdDom = getDom('#userId'),
    startBtnDom = getDom('#start');

  const StorageKeys = {
    RoomId: 'rong-sealv2-roomid'
  };

  const setDefaultRTCInfo = () => {
    let roomId = Cache.get(StorageKeys.RoomId);
    if (roomId) {
      roomIdDom.value = roomId;
    }
  };

  const checkRTCValue = () => {
    let isRoomIdEmpty = !roomIdDom.value,
      isUserIdEmpty = !userIdDom.value;
    if (isRoomIdEmpty) {
      sealAlert('房间号不能为空');
      return false;
    }
    if (isUserIdEmpty) {
      sealAlert('用户名不能为空');
      return false;
    }
    return true;
  };

  const startRTC = () => {
    if (checkRTCValue()) {
      const resolutionDom = utils.getSelectedDomByName('resolution'),
        openVideoDom = utils.getSelectedDomByName('isOpenVideo'),
        openAudioDom = utils.getSelectedDomByName('isOpenAudio');
      let roomId = roomIdDom.value,
        userId = userIdDom.value,
        resolution = common.formatResolution(resolutionDom.value),
        isOpenVideo = !!openVideoDom,
        isOpenAudio = !!openAudioDom;
      RongSeal.startRTC({
        userId: userId,
        roomId: roomId,
        resolution: resolution,
        video: isOpenVideo,
        audio: isOpenAudio
      });
      Cache.set(StorageKeys.RoomId, roomId);
    }
  };

  const init = () => {
    setDefaultRTCInfo();
    startBtnDom.onclick = startRTC;
  };

  init();

})({
  win: window,
  RongSeal: window.RongSeal
});