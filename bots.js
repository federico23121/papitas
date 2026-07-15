const { OperationType, VariableType, ConnectionState, AllowFlags, Direction, CollisionFlags, CameraFollow, BackgroundType, GamePlayState, BanEntryType, Callback, Utils, Room, Replay, Query, Library, RoomConfig, Plugin, Renderer, Errors, Language, EventFactory, Impl } = require("node-haxball")();

// Idioma nativo de la API para evitar errores de módulos faltantes
const EnglishLanguage = Language.English || Language; 
if (API && API.Language) {
  API.Language.current = new EnglishLanguage(API);
}

const comba = require("./scripts/followplayer");

// Leemos las variables pasadas desde la interfaz del Workflow
const ROOM_ID = process.env.ROOM_ID;
const ROOM_PASSWORD = process.env.ROOM_PASSWORD;
const PLAYER_NAME_BASE = process.env.PLAYER_NAME;
const PLAYER_AVATAR = process.env.PLAYER_AVATAR;
const currentId = process.env.INSTANCE_ID || "0";

function startSingleBot() {
  console.log(`Iniciando Instancia #${currentId} enviada desde GitHub Actions...`);
  
  Utils.generateAuth().then(([authKey, authObj]) => {
    Room.join({ 
      id: ROOM_ID, 
      password: ROOM_PASSWORD,
      authObj: authObj
    }, {
      storage: {
        player_name: `${PLAYER_NAME_BASE} ${currentId}`,
        avatar: PLAYER_AVATAR,
        player_auth_key: authKey
      },
      onOpen: (room) => {
        console.log(`Instancia #${currentId} conectada con éxito.`);
        if (typeof roomCallbacks === "function") {
          roomCallbacks(room);
        }
      },
      onClose: (msg) => {
        console.log(`Instancia #${currentId} se desconectó:`, msg.toString());
      }
    });
  }).catch(err => {
    console.error(`Error crítico en Instancia #${currentId}:`, err);
  });
}

startSingleBot();

function roomCallbacks(room) {
  // Lógica del bot
}
