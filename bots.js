const { OperationType, VariableType, ConnectionState, AllowFlags, Direction, CollisionFlags, CameraFollow, BackgroundType, GamePlayState, BanEntryType, Callback, Utils, Room, Replay, Query, Library, RoomConfig, Plugin, Renderer, Errors, Language, EventFactory, Impl } = require("node-haxball")();

// Usamos el lenguaje por defecto de la API para evitar el error de modulo no encontrado
const EnglishLanguage = Language.English || Language; 
if (API && API.Language) {
  API.Language.current = new EnglishLanguage(API);
}

// Opcional: si comba da error en GitHub, asegúrate de que el archivo './scripts/followplayer' realmente exista en tu repo.
const comba = require("./scripts/followplayer");

// ¡Sube el límite a 200 instancias!
const N = 200;

const ROOM_ID = process.env.ROOM_ID || "-Rh4xBAYzkQ";
const ROOM_PASSWORD = process.env.ROOM_PASSWORD || "#FFC";
const PLAYER_NAME_BASE = process.env.PLAYER_NAME || "wxyz-abcd";
const PLAYER_AVATAR = process.env.PLAYER_AVATAR || "👽";

// Función auxiliar para esperar unos milisegundos entre conexiones
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startBots() {
  for (let currentId = 0; currentId < N; currentId++) {
    console.log(`Iniciando bot #${currentId}...`);
    
    try {
      const [authKey, authObj] = await Utils.generateAuth();
      
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
        onOpen: (room) => {
          console.log(`Bot #${currentId} conectado exitosamente.`);
          if (typeof roomCallbacks === "function") {
            roomCallbacks(room);
          }
        },
        onClose: (msg) => {
          console.log(`Bot #${currentId} ha salido de la sala:`, msg.toString());
        }
      });
    } catch (err) {
      console.error(`Error al conectar el bot #${currentId}:`, err);
    }

    // Esperamos 500ms entre cada bot para no saturar la conexión ni el servidor de Haxball
    await sleep(500); 
  }
}

// Iniciamos la masa de bots
startBots();

function roomCallbacks(room) {
  // Tu lógica de comportamiento para cada bot aquí
}
