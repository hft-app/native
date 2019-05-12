// Register A2HS installer
$(window).on('beforeinstallprompt', e => {
	const $installer = $('.installer');
	$installer.toggleClass('hidden', false);
	$installer.on('click', () => {
		$installer.toggleClass('hidden', true);
		e.prompt();
	});
}, {once: true});

// Logout confirmation
$('.logout').on('click', e => {
	if(!confirm('Möchtest du dich wirklich abmelden?\nDadurch werden alle deine Daten auf diesem Gerät gelöscht.')) e.preventDefault();
});
