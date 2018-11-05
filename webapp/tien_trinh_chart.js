let x = ['x'];
let y = ['lit_xang'];
var line_chart = c3.generate({
    bindto: '#c3-line-chart',
    point: { 
        r: 4   
    },
    size: { height: 400 },
    color: {
        pattern: ['#4CAF50']
    },
    data: {
        x: 'x',
        columns: [
            x,
            y
        ],
        type: 'spline'
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    },
    grid: {
        y: {
            show: true
        }
    }
});

function updateDataChart(quang_duong,lit_xang){
    x.push(`${quang_duong}m`);
    y.push(lit_xang);
    line_chart.load({
        columns: [
            x,
            y
        ]
    });
}