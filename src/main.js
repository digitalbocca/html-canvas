const $ = selector => document.querySelector(selector)

const store = {
  state: {
    context: null,
    nextColorTime: 0,
    color: null
  },
  setContext (ctx) {
    this.state.context = ctx
  },
  setNextColorTime (time) {
    this.state.nextColorTime = time
  },
  setColor (color) {
    this.state.color = color
  }
}

const randomColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `rgb(${r}, ${g}, ${b})`
}

const setupCanvas = () => {
  const canvas = $('#main-canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  return ctx
}

function draw () {
  const ctx = store.state.context

  if (Date.now() > store.state.nextColorTime) {
    store.setColor(randomColor())
    store.setNextColorTime(Date.now() + 5000)
  }

  ctx.fillStyle = store.state.color
  ctx.fillRect(100, 100, 100, 100)
}

function loop () {
  store.setContext(setupCanvas())

  draw()

  requestAnimationFrame(loop)
}

function start () {
  loop()
}

start()

document.onload = () => start()
