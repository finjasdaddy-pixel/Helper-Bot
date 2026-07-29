import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Sendet einem Benutzer eine private Nachricht über den Bot.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Der Benutzer, dem die Nachricht gesendet werden soll.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Die Nachricht, die gesendet werden soll.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const message = interaction.options.getString('message');

        try {
            await user.send(message);

            await interaction.reply({
                content: `✅ Die Nachricht wurde erfolgreich an **${user.tag}** gesendet.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Fehler beim Senden der DM:', error);

            await interaction.reply({
                content: `❌ Ich konnte **${user.tag}** keine DM senden. Möglicherweise hat der Benutzer DMs vom Server deaktiviert.`,
                ephemeral: true
            });
        }
    }
};
