```js
// services/verificationService.js

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

const VERIFICATION_CHANNEL_ID = '1509574756008202372';
const VERIFICATION_URL =
    'https://helper-bot-production-95e2.up.railway.app/auth/discord';

const VERIFICATION_MARKER = 'TITANBOT_VERIFICATION_MESSAGE';

export async function ensureVerificationMessage(client) {
  try {
    const channel = await client.channels.fetch(VERIFICATION_CHANNEL_ID);

    if (!channel || !channel.isTextBased()) {
      console.error('Verification channel not found or is not a text channel.');
      return;
    }

    // Letzte Nachrichten des Bots prüfen
    const messages = await channel.messages.fetch({ limit: 50 });

    const existingMessage = messages.find(
      message =>
        message.author.id === client.user.id &&
        message.content.includes(VERIFICATION_MARKER)
    );

    // Nachricht existiert bereits → nichts machen
    if (existingMessage) {
      console.log('Verification message already exists.');
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('🔐 Discord-Verifizierung')
      .setDescription(
        'Klicke auf den Button unten, um dich über Discord zu verifizieren.'
      )
      .setFooter({
        text: 'TitanBot Verification',
      });

    const button = new ButtonBuilder()
      .setLabel('Mit Discord verifizieren')
      .setStyle(ButtonStyle.Link)
      .setURL(VERIFICATION_URL);

    const row = new ActionRowBuilder().addComponents(button);

    const message = await channel.send({
      content: VERIFICATION_MARKER,
      embeds: [embed],
      components: [row],
    });

    console.log(`Verification message sent: ${message.id}`);
  } catch (error) {
    console.error('Failed to create verification message:', error);
  }
}
```
