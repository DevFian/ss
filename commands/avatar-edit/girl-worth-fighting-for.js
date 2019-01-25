const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');

module.exports = class GirlWorthFightingForCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'girl-worth-fighting-for',
			aliases: ['a-girl-worth-fighting-for', 'ling'],
			group: 'avatar-edit',
			memberName: 'girl-worth-fighting-for',
			description: 'Draws a user\'s avatar as the object of Ling\'s affection.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to edit the avatar of?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	async run(msg, { user }) {
		const avatarURL = user.displayAvatarURL({ format: 'png', size: 256 });
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'girl-worth-fighting-for.png'));
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 380, 511, 150, 150);
			return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'girl-worth-fighting-for.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
