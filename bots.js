const { OperationType, VariableType, ConnectionState, AllowFlags, Direction, CollisionFlags, CameraFollow, BackgroundType, GamePlayState, BanEntryType, Callback, Utils, Room, Replay, Query, Library, RoomConfig, Plugin, Renderer, Errors, Language, EventFactory, Impl } = require("node-haxball")();
// Nota: EnglishLanguage y comba asumen rutas relativas correctas según tu estructura
const EnglishLanguage = require("../languages/englishLanguage");
API.Language.current = new EnglishLanguage(API); 
const comba = require("./scripts/followplayer");

const N = 3;

// Leemos las variables del entorno (inyectadas por el workflow de GitHub)
const ROOM_ID = process.env.ROOM_ID || "-Rh4xBAYzkQ";
const ROOM_PASSWORD = process.env.ROOM_PASSWORD || "#FFC";
const PLAYER_NAME_BASE = process.env.PLAYER_NAME || "wxyz-abcd";
const PLAYER_AVATAR = process.env.PLAYER_AVATAR || "👽";

var joinFunc = function (currentId) {
  if (currentId >= N)
    return;
  Utils.generateAuth().then(([authKey, authObj])=>{
    Room.join({ 
      id: ROOM_ID, 
      password: ROOM_PASSWORD,
      authObj: authObj
    },{
      storage: {
        player_name: `${PLAYER_NAME_BASE} ${currentId}`,
        avatar: PLAYER_AVATAR,
        player_auth_key: authKey
      },
      onOpen: (room)=>{
        roomCallbacks(room);
        joinFunc(currentId+1);
      },
      onClose: (msg)=>{
        console.log("Bot has left the room:", msg.toString());
      }
    });
  });
};

joinFunc(0);

function roomCallbacks(room){ // "roomCallbacks" examples start from here. // look at examples/roomConfigs/method1 folder for related examples.
  console.log("joined room " + room.name);
}
