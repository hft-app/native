class Menu {	
	get menus() {
		return [
			{
				group: 'Weitere Inhalte',
				color: 'red',
				items: [
					{
						url: '/courses',
						icon: 'book',
						title: 'Kurse auswählen'
					},{
						url: '/tips',
						icon: 'lightbulb-o',
						title: 'Tipps und Tricks'
					},{
						url: '/printers',
						icon: 'print',
						title: 'Druckerstandorte'
					},{
						url: '/professors',
						icon: 'list-ul',
						title: 'Professorenverzeichnis'
					}
				]
			},{
				group: 'App unterstützen',
				color: 'green',
				items: [
					{
						url: 'whatsapp://send?text='+encodeURI("https://hft-app.de"),
						icon: 'whatsapp',
						title: 'Freunde einladen'
					},{
						url: 'mailto:info@hft-app.de?subject=Feedback',
						icon: 'star-o',
						title: 'Feedback senden'
					},{
						url: 'https://github.com/luniverse/hft-app/fork',
						icon: 'puzzle-piece',
						title: 'Selbst mitwirken',
						blank: true
					}
				]
			},{
				group: 'Informationen',
				color: 'blue',
				items: [
					{
						url: '//luniversity.de/info/terms',
						icon: 'handshake-o',
						title: 'Nutzungsbedingungen',
						blank: true
					},{
						url: '//luniversity.de/info/imprint',
						icon: 'bullhorn',
						title: 'Impressum',
						blank: true
					},{
						url: '//luniversity.de/info/privacy',
						icon: 'shield',
						title: 'Datenschutzrichtlinien',
						blank: true
					}
				]
			}
		];
	}
	
	async process() {
		this.displayname = await IDB.server.get('displayname');
	}
}