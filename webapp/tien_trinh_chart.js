let x = ['x'];
let y = ['lit_xang'];
var line_chart = c3.generate({
    bindto: '#c3-line-chart', // c3-line-chart la id the div can ve bieu do
    point: { 
        r: 4   
    },
    size: { height: 400 },
    color: {
        pattern: ['#4CAF50']
    },
    data: {
        x: 'x',
        columns: [ // columns: array
            // data example: [['12m','24m'],[5,8]] tuc la x = '12m' tuong ung vs y = 5, x = '24m' tuong ung vs y = 8
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

function updateDataChart(quang_duong,lit_xang){ // ham se duoc goi khi co du lieu moi tu esp
    x.push(`${quang_duong}m`); // truc x se them du lieu moi
    y.push(lit_xang); // truc y se them du lieu moi
    line_chart.load({ // load lai data cho bieu do
        columns: [ // columns tuong tu o tren
            x,
            y
        ]
    });
}