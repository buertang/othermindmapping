export default {
  // 彩虹色系
  primary: {
    name: 'primary',
    backgroundColor: '#fff',
    thumbColor: '#FF1493',
    relationStyle: {
      lineColor: '#00CED1',
      textColor: '#00CED1'
    },
    0: {
      getStyle: function () {
        return {
          rx: 4,
          ry: 4,
          fill: '#FF0000',
          stroke: '#FF0000',
          strokeWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          },
          lineStyle: {
            fill: '#FF0000',
            lineWidth: 'a-5'
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 24,
          linkSize: 18,
          tagSize: 12,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'],
          spacing: 36
        }
      }
    },
    1: {
      getStyle: function () {
        return {
          colors: ['#F9423A', '#F6A04D', '#F3D321', '#00BC7B', '#486AFF', '#4D49BE'],
          rx: 4,
          ry: 4,
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal'
          },
          lineStyle: {
            fill: '#f9423a',
            lineWidth: 2
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 18,
          linkSize: 16,
          tagSize: 10,
          tagColors: ['#3dff03', '#03a3ff', '#e6a23c', '#034fff']
        }
      }
    },
    normal: {
      getStyle: function () {
        return {
          colors: ['#F9423A', '#F6A04D', '#F3D321', '#00BC7B', '#486AFF', '#4D49BE'],
          rx: 4,
          ry: 4,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#4c4c4c',
            fontSize: 14
          },
          lineStyle: {
            fill: '#000',
            lineWidth: 2
          },
          margin: {
            _t: 6,
            _r: 8,
            _b: 6,
            _l: 8
          },
          expandColor: '#fff',
          markSize: 15,
          linkSize: 15,
          tagSize: 10,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
        }
      }
    },
    select: {
      strokeWidth: 2,
      stroke: '#2EBDFF'
    },
    summaryLineColor: '#4c4c4c',
    summaryTextColor: '#4c4c4c'
  },

  // 简约系
  simplicity: {
    name: 'simplicity',
    backgroundColor: '#fff',
    thumbColor: '#68a0e5',
    relationStyle: {
      lineColor: '#548FD8',
      textColor: '#548FD8'
    },
    0: {
      getStyle: function () {
        return {
          rx: 6,
          ry: 6,
          fill: '#DCE6F8',
          stroke: '#548FD8',
          strokeWidth: 3,
          textStyle: {
            color: '#406290',
            fontSize: 18,
            fontWeight: 'bold'
          },
          lineStyle: {
            fill: '#548FD8',
            lineWidth: 'a-5'
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 24,
          linkSize: 18,
          tagSize: 12,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'].reverse(),
          spacing: 36
        }
      }
    },
    1: {
      getStyle: function () {
        return {
          rx: 4,
          ry: 4,
          fill: '#DCE6F8',
          stroke: 'rgb(84,143,216)',
          strokeWidth: 2,
          textStyle: {
            color: '#406290',
            fontSize: 14,
            fontWeight: 'bold'
          },
          lineStyle: {
            fill: '#659be7',
            lineWidth: 2
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 18,
          linkSize: 16,
          tagSize: 10,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'].reverse()
        }
      }
    },
    normal: {
      getStyle: function () {
        return {
          rx: 4,
          ry: 4,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#406290',
            fontSize: 14
          },
          lineStyle: {
            fill: '#659be7',
            lineWidth: 2
          },
          margin: {
            _t: 6,
            _r: 8,
            _b: 6,
            _l: 8
          },
          expandColor: '#fff',
          markSize: 15,
          linkSize: 15,
          tagSize: 10,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'].reverse()
        }
      }
    },
    select: {
      strokeWidth: 2,
      stroke: 'rgb(46,189,255)'
    },
    summaryLineColor: '#548FD8',
    summaryTextColor: '#548FD8'
  },

  // 浅蓝色系
  lightBlue: {
    name: 'lightBlue',
    backgroundColor: '#fff',
    thumbColor: '#00868B',
    relationStyle: {
      lineColor: '#008B8B',
      textColor: '#008B8B'
    },
    0: {
      getStyle: function () {
        return {
          rx: 4,
          ry: 4,
          fill: '#008B8B',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          },
          lineStyle: {
            fill: '#008B8B',
            lineWidth: 'a-5'
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 24,
          linkSize: 18,
          tagSize: 12,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'],
          spacing: 36
        }
      }
    },
    1: {
      getStyle: function () {
        return {
          colors: ['#00868B', '#008B8B', '#528B8B'],
          rx: 4,
          ry: 4,
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal'
          },
          lineStyle: {
            fill: '#f9423a',
            lineWidth: 2
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 18,
          linkSize: 16,
          tagSize: 10,
          tagColors: ['#3dff03', '#03a3ff', '#e6a23c', '#034fff']
        }
      }
    },
    normal: {
      getStyle: function () {
        return {
          colors: ['#00868B', '#008B8B', '#528B8B'],
          rx: 4,
          ry: 4,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#4c4c4c',
            fontSize: 14
          },
          lineStyle: {
            fill: '#000',
            lineWidth: 2
          },
          margin: {
            _t: 6,
            _r: 8,
            _b: 6,
            _l: 8
          },
          expandColor: '#fff',
          markSize: 15,
          linkSize: 15,
          tagSize: 10,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
        }
      }
    },
    select: {
      strokeWidth: 2,
      stroke: '#00868B'
    },
    summaryLineColor: '#008B8B',
    summaryTextColor: '#008B8B'
  },

  // 深紫色系
  deepPurple: {
    name: 'lightBlue',
    backgroundColor: '#fff',
    thumbColor: '#9370DB',
    relationStyle: {
      lineColor: '#9370DB',
      textColor: '#9370DB'
    },
    0: {
      getStyle: function () {
        return {
          rx: 4,
          ry: 4,
          fill: '#9400D3',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          },
          lineStyle: {
            fill: '#9400D3',
            lineWidth: 'a-5'
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 24,
          linkSize: 18,
          tagSize: 12,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'],
          spacing: 36
        }
      }
    },
    1: {
      getStyle: function () {
        return {
          colors: ['#9932CC', '#8A2BE2'],
          rx: 4,
          ry: 4,
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal'
          },
          lineStyle: {
            fill: '#f9423a',
            lineWidth: 2
          },
          margin: {
            _t: 10,
            _r: 20,
            _b: 10,
            _l: 20
          },
          expandColor: '#fff',
          markSize: 18,
          linkSize: 16,
          tagSize: 10,
          tagColors: ['#3dff03', '#03a3ff', '#e6a23c', '#034fff']
        }
      }
    },
    normal: {
      getStyle: function () {
        return {
          colors: ['#9932CC', '#8A2BE2'],
          rx: 4,
          ry: 4,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 0,
          textStyle: {
            color: '#4c4c4c',
            fontSize: 14
          },
          lineStyle: {
            fill: '#000',
            lineWidth: 2
          },
          margin: {
            _t: 6,
            _r: 8,
            _b: 6,
            _l: 8
          },
          expandColor: '#fff',
          markSize: 15,
          linkSize: 14,
          tagSize: 10,
          tagColors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
        }
      }
    },
    select: {
      strokeWidth: 2,
      stroke: '#9400D3'
    },
    summaryLineColor: '#9370DB',
    summaryTextColor: '#9370DB'
  }
}
