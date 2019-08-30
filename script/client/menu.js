// Logout confirmation
$('.logout').on('click', e => {
	if(!confirm('Möchtest du dich wirklich abmelden?\nDadurch werden alle deine Daten auf diesem Gerät gelöscht.')) e.preventDefault();
});
