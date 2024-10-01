 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JnSDVqaDk3TWNKRWYvRWtNY1NyN2YwMG03aUhDd3ZUcXRUcVd6RlZGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWd5d3hpKzZxaUZuMkQzMGJkVGZlbXBlZXRlRFN3MWh1OG93WldLUFEyRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPS1ZhL0QwQ3F4b3E0Q3MxY25GMWRFZEpuMkVITEdGMzAxS2RaS1loZmt3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPOXQ2c1Uzek1uWlJ6ZFJtcXloVDk4Y1JGSi9UazBpWWlQaEVSbXJpQVZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBOMVVKbzBLeitYREs0S3FHRHMybDQ2cTI1aDRPL1V3U3lCRkdJTTBKMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9HeFNDRkUwbloxZm95aE5OZ3lRbWY1MUhsakZHdktIeWxESE9DVW9XMDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMElsN292UUVQdlUxWGhaekZsbkMyc2p0dEQxZ2FVR2VDSnNzRko3STVHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUE9Fall5d2tLZGRzbHl3aGNMeVI4czVEMVRldXRGYTNFVERqNWZSVkdCbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBDeG5WYWRsRVI0dkJRc050ZXBlZ21qQytVK1h5UGtRZVRjdkwzTHNUNUZOY0xodXFSVGVhTVBmaTR4dnlhWVhadG1WczZMbmpDYy9qTkFmWVpNb0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiJNc1AvY29hZVpyZEZGbWNqdTdNUklLMTdLelYxU1dndjExR0REeDllV2tFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwNDIxOTUzMDlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzRBNzkyM0ZCRDYyN0E3QTNEMDFBRUNDQzdFNTVEMjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzc5ODMwNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWUFsU3VSSGFUUDJTV3loRmJWZm9FdyIsInBob25lSWQiOiI5OWJlMmRmYS1mYWU5LTQwMGUtODE2Yi1iNTNlMTE4YTdkMzMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXk0cWxycDd2K09EMis5QmV3V3FmNmFLeUhVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpZenpVcmFyZTFOZFNzZXc5Y1RyaER2cGFjMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJXRTdLSFQ1VyIsIm1lIjp7ImlkIjoiMjM0OTA0MjE5NTMwOTo4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuG0oiDhtI8gyoAg4bSPICAgIOG0m+G0oCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmlCc1p3REVJZTQ4TGNHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSmk2Y2I2Zm55TEFwUlFGU1ZBa0VyYjdGSmxaejg0OS80bFpmWjBGUDNVaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieWlRQnVUM20wRW91Z052d1lzMmc3VFMyNThQL2dIaCtmVlJVbEVvMDEycDFBbExPb3hiSVdINzdqS1dJTEZXMndZSTdNQXlQWWZuWE0zUm9wZTRtQVE9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9oaFViMUFCTzFUTk5BNXdGWG5jbS84UWRIa0k2VWZ1bjNlbU1OSEpYMXpkY1RUdzZrSmEvdml4dGRJWm1KQVI2Rk1jQkhCTkJsVFpKeHl4MEtSOUJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTA0MjE5NTMwOTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNZdW5HK241OGl3S1VVQlVsUUpCSzIreFNaV2MvT1BmK0pXWDJkQlQ5MUoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc3OTgyOTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRUxLIn0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'off',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "Zoro-Kun",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349069784612",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "non",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
