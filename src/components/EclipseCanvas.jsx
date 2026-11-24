import React, { useEffect, useRef } from 'react'

const VERT_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG_SRC = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform sampler2D u_logo;
uniform float u_logoReady;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float starLayer(vec2 uv, float scale, float timeShift, float brightness) {
  vec2 gv = fract(uv * scale) - 0.5;
  vec2 id = floor(uv * scale);
  float n = hash21(id);
  if (n < 0.86) return 0.0;
  vec2 offset = vec2(fract(n * 34.12) - 0.5, fract(n * 71.73) - 0.5) * 0.72;
  float d = length(gv - offset);
  float twinkle = 0.65 + 0.35 * sin(u_time * (1.2 + fract(n * 19.3) * 2.4) + n * 62.83);
  float star = smoothstep(0.055, 0.004, d) * twinkle * brightness;
  return star;
}

void main() {
  vec2 fragCoord = v_uv * u_res;
  float minDim = min(u_res.x, u_res.y);
  vec2 p = (fragCoord - 0.5 * u_res) / minDim;

  // Deep Pedasenticom navy space backdrop (#030812 -> #061121 -> #0c1d35)
  vec3 col = mix(vec3(0.014, 0.032, 0.072), vec3(0.026, 0.072, 0.145), smoothstep(-0.6, 0.75, v_uv.y));

  // Subtle parallaxed 3-layer starfield with slow cosmic drift
  vec2 par = (u_mouse - 0.5) * 0.045;
  vec2 drift = vec2(u_time * 0.0035, -u_time * 0.0018 - u_scroll * 0.08);
  float stars = 0.0;
  stars += starLayer(p + par * 0.4 + drift * 0.6, 14.0, u_time, 0.55);
  stars += starLayer(p + par * 0.85 + drift * 1.1 + vec2(4.2, 1.7), 24.0, u_time, 0.45);
  stars += starLayer(p + par * 1.3 + drift * 1.7 + vec2(9.1, 6.4), 38.0, u_time, 0.35);

  vec3 starTint = mix(vec3(0.75, 0.91, 1.0), vec3(0.95, 0.84, 0.62), hash21(floor(p * 18.0)));
  col += starTint * stars;

  // Eclipsed Emblem Sphere Geometry (rises slightly as you scroll through Citadel hero runway)
  vec2 planetCenter = vec2(0.0, -0.44 + u_scroll * 0.16) - par * 0.55;
  float planetRadius = 0.56 + u_scroll * 0.05;
  vec2 dp = p - planetCenter;
  float dist = length(dp);

  // Top solar crown position (Pedasenticom gold #e0b45c + cyan #38bdf8)
  vec2 sunDir = normalize(vec2(0.18 * sin(u_time * 0.25) + (u_mouse.x - 0.5) * 0.35, 1.0));
  vec2 normDir = dist > 0.0001 ? dp / dist : vec2(0.0, 1.0);
  float sunAlign = max(0.0, dot(normDir, sunDir));

  // Atmospheric bloom behind the eclipse
  float coronaDist = max(0.0, dist - planetRadius);
  float cyanHalo = exp(-coronaDist * 7.5) * (0.34 + 0.58 * pow(sunAlign, 2.2));
  float goldFlare = exp(-coronaDist * 14.0) * pow(sunAlign, 5.5) * 0.88;
  float wideNebula = exp(-coronaDist * 2.8) * (0.14 + 0.14 * sunAlign);

  vec3 cyanCol = vec3(0.22, 0.74, 0.97);   // #38bdf8
  vec3 navyCol = vec3(0.086, 0.259, 0.478); // #16427a
  vec3 goldCol = vec3(0.878, 0.706, 0.361); // #e0b45c

  // Draw exterior atmospheric glow
  if (dist >= planetRadius - 0.004) {
    col += navyCol * wideNebula * 1.15;
    col += cyanCol * cyanHalo * 0.92;
    col += goldCol * goldFlare * 1.15;
  }

  // Dark eclipsed orb mapped with the Pedasenticom logo emblem + Fresnel rim light
  float sphereMask = smoothstep(planetRadius + 0.0035, planetRadius - 0.0035, dist);
  if (sphereMask > 0.0) {
    float rNorm = clamp(dist / planetRadius, 0.0, 1.0);
    float z = sqrt(max(0.0, 1.0 - rNorm * rNorm));
    float fresnel = pow(1.0 - z, 3.6);
    float rimThin = pow(1.0 - z, 9.0);

    vec3 planetBody = vec3(0.012, 0.032, 0.068);

    // Map Pedasenticom emblem smoothly onto the orb with subtle spherical lens curvature
    vec2 nd = dp / planetRadius;
    float sphereCurve = 1.0 - 0.11 * (1.0 - z);
    vec2 logoUv = (nd - vec2(0.0, 0.08)) * 0.58 * sphereCurve + 0.5;
    float inBounds =
      step(0.0, logoUv.x) * step(logoUv.x, 1.0) *
      step(0.0, logoUv.y) * step(logoUv.y, 1.0);

    vec3 rawLogo = texture2D(u_logo, clamp(logoUv, 0.0, 1.0)).rgb;
    // Deepen dark backdrop of the mark so its glowing hexagonal emblem blends seamlessly
    vec3 shapedLogo = pow(max(rawLogo, vec3(0.0)), vec3(1.18));
    // Soft radial fade near the rim so the logo integrates naturally into the crescent edge
    float edgeFeather = smoothstep(0.98, 0.78, rNorm);
    // Gentle eclipse illumination lift toward the glowing top crescent
    float eclipseLit = mix(0.62, 0.94, pow(sunAlign, 1.35));
    vec3 emblemLayer = shapedLogo * eclipseLit * edgeFeather * inBounds * u_logoReady;

    vec3 rimLight = cyanCol * fresnel * (0.45 + 0.95 * pow(sunAlign, 1.8));
    rimLight += goldCol * rimThin * pow(sunAlign, 3.5) * 1.65;

    vec3 sphereColor = max(planetBody, emblemLayer) + rimLight;
    col = mix(col, sphereColor, sphereMask);
  }

  // Sharp popping solar eclipse crescent peak right along the top horizon
  float ringEdge = exp(-abs(dist - planetRadius) * 115.0);
  col += mix(cyanCol, goldCol, pow(sunAlign, 2.5)) * ringEdge * (0.35 + 1.05 * pow(sunAlign, 3.0));

  // Subtle architectural vignette so foreground serif typography stays crystal clear
  float vig = smoothstep(1.35, 0.25, length(p * vec2(0.82, 1.0)));
  col *= (0.74 + 0.26 * vig);

  gl_FragColor = vec4(col, 1.0);
}
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function EclipseCanvas({ scrollProgressRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: 0.5, y: 0.42, tx: 0.5, ty: 0.42 }
    let disposed = false

    const onPointerMove = (e) => {
      mouse.tx = e.clientX / Math.max(1, window.innerWidth)
      mouse.ty = 1.0 - e.clientY / Math.max(1, window.innerHeight)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'high-performance' })

    let rafId = null

    if (gl) {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
      const program = vs && fs ? gl.createProgram() : null

      if (program) {
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
      }

      if (program && gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        )

        const aPos = gl.getAttribLocation(program, 'a_pos')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        // Create NPOT-safe WebGL texture for /pedasenticom-mark.png
        const logoTex = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, logoTex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          1,
          1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          new Uint8Array([3, 8, 18, 255])
        )

        const uRes = gl.getUniformLocation(program, 'u_res')
        const uTime = gl.getUniformLocation(program, 'u_time')
        const uMouse = gl.getUniformLocation(program, 'u_mouse')
        const uScroll = gl.getUniformLocation(program, 'u_scroll')
        const uLogo = gl.getUniformLocation(program, 'u_logo')
        const uLogoReady = gl.getUniformLocation(program, 'u_logoReady')
        gl.uniform1i(uLogo, 0)

        let logoLoaded = false
        let logoFade = 0

        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          const w = Math.floor(canvas.clientWidth * dpr)
          const h = Math.floor(canvas.clientHeight * dpr)
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = Math.max(1, w)
            canvas.height = Math.max(1, h)
            gl.viewport(0, 0, canvas.width, canvas.height)
          }
        }

        const start = performance.now()
        const drawFrame = (now) => {
          const elapsed = reducedMotion ? 0 : (now - start) * 0.001
          mouse.x += (mouse.tx - mouse.x) * 0.05
          mouse.y += (mouse.ty - mouse.y) * 0.05

          if (logoLoaded) {
            logoFade = reducedMotion ? 1 : Math.min(1, logoFade + 0.05)
          }

          const sp = scrollProgressRef?.current ?? 0
          gl.uniform2f(uRes, canvas.width, canvas.height)
          gl.uniform1f(uTime, elapsed)
          gl.uniform2f(uMouse, mouse.x, mouse.y)
          gl.uniform1f(uScroll, sp)
          gl.uniform1f(uLogoReady, logoFade)
          gl.drawArrays(gl.TRIANGLES, 0, 6)
        }

        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          if (disposed) return
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, logoTex)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          logoLoaded = true
          if (reducedMotion) {
            drawFrame(performance.now())
          }
        }
        img.src = '/pedasenticom-mark.png'

        resize()
        window.addEventListener('resize', resize, { passive: true })

        const render = (now) => {
          drawFrame(now)
          if (!reducedMotion) {
            rafId = window.requestAnimationFrame(render)
          }
        }
        rafId = window.requestAnimationFrame(render)

        return () => {
          disposed = true
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('resize', resize)
          if (rafId) window.cancelAnimationFrame(rafId)
          gl.deleteTexture(logoTex)
          gl.deleteProgram(program)
        }
      }
    }

    // Graceful 2D Canvas fallback (if WebGL is disabled)
    const ctx = canvas.getContext('2d')
    if (!ctx) return () => window.removeEventListener('pointermove', onPointerMove)

    const stars = Array.from({ length: 140 }, (_, i) => ({
      x: ((i * 73.13) % 100) / 100,
      y: ((i * 37.71) % 100) / 100,
      r: 0.7 + ((i * 19) % 15) / 10,
      a: 0.25 + ((i * 29) % 60) / 100,
    }))

    const fallbackImg = new Image()
    let fallbackImgReady = false

    const draw2d = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, '#030812')
      bg.addColorStop(1, '#07162b')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      stars.forEach((s) => {
        ctx.fillStyle = `rgba(200, 232, 255, ${s.a})`
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
        ctx.fill()
      })

      const radius = Math.min(w, h) * 0.56
      const cx = w * 0.5
      const cy = h * 0.94
      const halo = ctx.createRadialGradient(cx, cy - radius * 0.3, radius * 0.72, cx, cy, radius * 1.45)
      halo.addColorStop(0, 'rgba(224, 180, 92, 0.45)')
      halo.addColorStop(0.32, 'rgba(56, 189, 248, 0.32)')
      halo.addColorStop(1, 'rgba(6, 17, 33, 0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = '#040b16'
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)
      if (fallbackImgReady) {
        ctx.globalAlpha = 0.68
        const logoSize = radius * 1.88
        ctx.drawImage(fallbackImg, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize)
        ctx.globalAlpha = 1
      }
      ctx.restore()
    }

    fallbackImg.onload = () => {
      if (disposed) return
      fallbackImgReady = true
      draw2d()
    }
    fallbackImg.src = '/pedasenticom-mark.png'

    draw2d()
    window.addEventListener('resize', draw2d, { passive: true })
    return () => {
      disposed = true
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', draw2d)
    }
  }, [scrollProgressRef])

  return <canvas ref={canvasRef} className="eclipse-canvas" aria-hidden="true" />
}
