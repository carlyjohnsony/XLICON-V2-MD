let bot = {};
try {
  bot = global.db.data.settings[conn.user.id] || {};
} catch (e) {
  console.error("Failed to access bot settings:", e);
}

async function handleStatusReaction(m, conn) {
  if (m.key.remoteJid === "status@broadcast" && !m.fromMe) {
    await conn.readMessages([m.key]);

    const xlicon = [
      "🌟", "🚀", "🔥", "💎", "✨", "🎉", "😎", "🤩", "🥳", 
      "💡", "🌈", "🌸", "⚡", "🎶", "🏆", "❤️‍🔥", "🎯", "📸",
      "🪄", "🌍", "🎵", "🧠", "🌌", "🎮", "🪐"
    ];

    const randomEmoji = xlicon[Math.floor(Math.random() * xlicon.length)];
    const me = await conn.decodeJid(conn.user.id);

    await conn.sendMessage(
      m.key.remoteJid,
      { react: { key: m.key, text: randomEmoji } },
      { statusJidList: [m.key.participant, me] }
    );
  }
}

if (process.env.STATUSVIEW?.toLowerCase() === "true" || bot.statusview) {
  await handleStatusReaction(m, conn);
}
