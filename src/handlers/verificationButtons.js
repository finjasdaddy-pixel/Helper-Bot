import { handleInteractionError, replyUserError, ErrorTypes } from '../utils/errorHandler.js';
import { logger } from '../utils/logger.js';
export async function handleVerificationButton(interaction, client) {
console.log("VERIFY BUTTON AUSGELOEST:", interaction.customId);
    try {
await interaction.deferReply({ ephemeral: true });

        if (!interaction.guild) {
            return await replyUserError(interaction, { type: ErrorTypes.UNKNOWN, message: 'This button can only be used in a server.' });
        }

        const guild = interaction.guild;
        const userId = interaction.user.id;

        logger.debug('User clicked verify button', {
            guildId: guild.id,
            userId,
            userTag: interaction.user.tag
        });

       const oauthUrl = `${process.env.DISCORD_REDIRECT_URI.replace('/auth/discord/callback', '/auth/discord')}`;

return await interaction.editReply({
    content: `🔐 Bitte bestätige deine Discord-Identität:\n${oauthUrl}`
});

    } catch (error) {
        logger.error('Error in verification button handler', {
            error: error.message,
            guildId: interaction.guild?.id,
            userId: interaction.user.id
        });

        await handleInteractionError(
            interaction,
            error,
            { command: 'verify_button', action: 'verification' }
        );
    }
}

export default {
    customId: "verify_user",
    execute: handleVerificationButton
};
