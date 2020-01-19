<template>
    <div :class="'lecture '+ event.color">
        <div class="title">
            {{event.title}}
        </div>
        <div class="time">
            {{$d(event.start, 'time')}} - {{$d(event.end, 'time')}}
        </div>
        <div class="info">
            <div class="professor data icon-prepend icon">
                <fa-icon icon="user-alt"/>
                {{event.professor}}
            </div>
            <div class="room data icon-prepend icon">
                <fa-icon icon="map-marker-alt"/>
                {{event.room}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["event"],
        created() {
            console.log(this.event)
        }
    }

</script>
<style lang="scss" scoped>

</style>
