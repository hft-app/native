<template>
    <div class="wrapper">
        <div class="list">
            <div class="container">
                <a v-for="tip in tips" class="tip article" :href="tip.link" target="_blank">
                    <div :class="'strip ' + tip.color">
                        <fa-icon :icon="tip.icon"/>
                    </div>
                    <div class="text">
                        <div class="title">{{tip.title}}</div>
                        <div class="description">
                            <p>{{tip.description}}</p>
                        </div>
                    </div>
                    <div class="arrow">
                        <fa-icon v-if="tip.link" icon="chevron-right"/>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                tips: [
                    {
                        title: "Push-Mails empfangen",
                        description: "Erfahre, wie du HFT-Mails auf dein Smartphone synchronisieren kannst.",
                        icon: "envelope",
                        color: "red",
                        link: "https://confluence.hft-stuttgart.de/display/DFST/Clienteinrichtung+mit+Autodiscover"
                    },
                    {
                        title: "WLAN Eduroam",
                        description: "Folge den Anweisungen, um dich mit dem WLAN der HFT zu verbinden.",
                        icon: "rss",
                        color: "orange",
                        link: "https://confluence.hft-stuttgart.de/display/DFST/Internet+und+WLAN#InternetundWLAN-Eduroam"
                    },
                    {
                        title: "Termine exportieren",
                        description: "Tippe auf das Datum von Terminen, um sie in deinen Kalender einzutragen.",
                        icon: "calendar-plus",
                        color: "yellow",
                    },
                    {
                        title: "Microsoft Office",
                        description: "Installiere Office 365 ProPlus für nur 3,99€/Jahr auf all deinen Geräten.",
                        icon: "file-alt",
                        color: "blue",
                        link: "https://confluence.hft-stuttgart.de/display/DFST/Microsoft+Office+365+Installation"
                    }
                ]
            }
        }
    }
</script>
<style lang="scss">
    @import '../colors';

    .tip {
        display: flex;

        .strip {
            padding: 0.5em 0;
            color: #FFF;
            font-size: 1.6em;
            width: 2.5em;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .text {
            flex-grow: 1;
            padding: 12px 16px;
        }

        .title {
            margin-bottom: 8px;
        }

        .description {
            font-size: 14px;
            color: $secondary;
        }

        .arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 0.5em;;
            color: $icon;
            flex-shrink: 0;

        }
    }
</style>
