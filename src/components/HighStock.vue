<template>
    <div class="highstock" v-show="chartData.length > 0" :style="{height: height+'px'}"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import Exporting from 'highcharts/modules/exporting';
import moment from 'moment'

Highcharts.setOptions({
    colors: ['rgb(208,144,92)', 'rgb(30,81,153)', 'rgb(0,150,123)', 'rgb(244,85,65)', 'rgb(248,183,74)', 'rgb(43,173,215)'],
    lang: {
        months:['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월'],
        shortMonths:['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월']
    }
});

Exporting(Highcharts);



export default {
    name: 'HighStock',
    props: ['chartData', 'type', 'height','legend', 'min', 'max'],
    data () {
        var owner = this
        return {
            chart : null,

            chartOpt : {
                chart: {
                    alignTicks: false,
                },
                legend: {
                    enabled: this.legend
                },
                exporting: {
                    buttons :{
                        enabled: true
                    },
                },
                rangeSelector: 
                {
                    inputDateFormat: '%Y-%m',
                    buttons: [
                        {
                            count: 1,
                            type: 'year',
                            text: '1년'
                        },{
                            count: 3,
                            type: 'year',
                            text: '3년'
                        }, {
                            count: 5,
                            type: 'year',
                            text: '5년'
                        },{
                            count: 10,
                            type: 'year',
                            text: '10년'
                        }, {
                            type: 'all',
                            text: '전체'
                        }
                    ],
                    selected: 5
                },
                title: {
                    text: this.seriesTitle
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            if(owner.type == 'M') {
                                return  Highcharts.dateFormat('%Y년 \ %b', this.value)
                            } else if(owner.type == 'Q') {
                                
                                var s = "";
                                if (Highcharts.dateFormat('%b', this.value) == '01월' || Highcharts.dateFormat('%b', this.value) == '02월' || Highcharts.dateFormat('%b', this.value) == '03월') {
                                    s = "1분기"
                                };
                                if (Highcharts.dateFormat('%b', this.value) == '04월' || Highcharts.dateFormat('%b', this.value) == '05월' || Highcharts.dateFormat('%b', this.value) == '06월') {
                                    s = "2분기"
                                };
                                if (Highcharts.dateFormat('%b', this.value) == '07월' || Highcharts.dateFormat('%b', this.value) == '08월' || Highcharts.dateFormat('%b', this.value) == '09월') {
                                    s = "3분기"
                                };
                                if (Highcharts.dateFormat('%b', this.value) == '10월' || Highcharts.dateFormat('%b', this.value) == '11월' || Highcharts.dateFormat('%b', this.value) == '12월') {
                                    s = "4분기"
                                };
                                s = Highcharts.dateFormat('%Y년', this.value)+" "+s;
                                
                                return s;
                            } else if(owner.type == 'A') {
                                return  Highcharts.dateFormat('%Y년', this.value)
                            }
                        }
                    },
                    min: this.min,
                    max: this.max
                },
                yAxis: [
                { 
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '기본축',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    opposite:false
                }, 
                {
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },  
                    title: {
                        text: '보조축',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    gridLineWidth: 0,
                    opposite: true
                }
                ],
                series: []
            }
        }
    },
    mounted () {
        this.chartOpt.series = this.chartData
        this.initChart()
    },

    watch: {
        chartData ( d ) {
            this.chartOpt.series = this.chartData
            this.initChart()
        }
    },
    
    methods: {
        initChart() {
            this.chart = Highcharts.stockChart(this.$el, this.chartOpt)
        },

        changeMinMax (min, max) {
            this.initChart()
            this.chart.xAxis[0].update({
                min: min,
                max: max
            })
            
        }
    },
    beforeDestroy () {
        if(this.chart) {
            this.chart.destroy()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.highstock{
    height:400px;
}

</style>
