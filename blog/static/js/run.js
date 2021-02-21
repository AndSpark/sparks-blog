initDefine('/model/', '', 'Hiyori'.split(','))
let live2d = document.getElementById('live2d')
let live2dMouseTimer, live2dMoveFunc
live2d.addEventListener('mousedown', (e) => {
  live2d.style.transition = ''
  if (live2dMouseTimer) window.clearTimeout(live2dMouseTimer)
  let offsetX = e.clientX - live2d.offsetLeft
  let offsetY = e.clientY - live2d.offsetTop
  live2dMoveFunc = (e) => {
    live2d.style.left = e.clientX - offsetX + 'px'
    live2d.style.top = e.clientY - offsetY + 'px'
  }
  live2d.addEventListener('mousemove', live2dMoveFunc)
})
document.addEventListener('mouseup', (e) => {
  live2d.removeEventListener('mousemove', live2dMoveFunc)
  if (e.target.id === 'live2d') {
    live2d.style.transition = '1s'
    live2dMouseTimer = setTimeout(() => {
      live2d.style.top = 0
      live2d.style.left = 0
    }, 1000)
  }
})
