/* JapanMates – home page 3D touches.
   1. Hero picture: the sky, Mount Fuji, town and front layers move at different speeds with phone tilt,
      mouse or scrolling, so the picture has depth.
   2. Service and tool cards tilt toward your finger or mouse and lift up.
   3. A real 3D low-poly Mount Fuji (drawn with the phone's own WebGL, no download) slowly turns behind the town.
   Everything is switched off when the phone asks for "reduce motion". Loaded only on the home page. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var wrap = document.getElementById("artWrap");
  var layers = wrap ? Array.prototype.slice.call(wrap.querySelectorAll(".ly")) : [];
  var canvas = document.getElementById("fuji3d");

  // ---------- 1. Parallax layers ----------
  var tx = 0, ty = 0, cx = 0, cy = 0, haveTilt = false, running = false, visible = true;
  function setTarget(x, y) { tx = Math.max(-1, Math.min(1, x)); ty = Math.max(-1, Math.min(1, y)); kick(); }
  function kick() { if (!running && visible) { running = true; requestAnimationFrame(step); } }
  function step() {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
    layers.forEach(function (g) {
      var d = +g.getAttribute("data-d") || 0;
      g.style.transform = "translate(" + (-cx * 14 * d).toFixed(2) + "px," + (-cy * 8 * d).toFixed(2) + "px) scale(" + (1 + 0.05 * d).toFixed(3) + ")";
    });
    if (canvas) canvas.style.transform = "translate(" + (-cx * 6).toFixed(2) + "px," + (-cy * 3.6).toFixed(2) + "px)";
    if (fuji) fuji.tilt(cx, cy);
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002) requestAnimationFrame(step); else running = false;
  }
  if (wrap) {
    // Mouse (computers)
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      setTarget(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1);
    }, { passive: true });
    // Phone tilt (Android; iPhone needs a permission pop-up, so iPhone uses scrolling instead)
    window.addEventListener("deviceorientation", function (e) {
      if (e.gamma == null) return;
      haveTilt = true;
      setTarget(e.gamma / 25, (e.beta - 45) / 30);
    }, { passive: true });
    // Scrolling
    window.addEventListener("scroll", function () {
      if (haveTilt) return;
      var r = wrap.getBoundingClientRect();
      setTarget(0, (r.top + r.height / 2) / innerHeight * 2 - 1);
    }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); if (fuji) fuji.run(visible); }).observe(wrap);
    setTarget(0, 0.3);
  }

  // ---------- 2. Tilting cards ----------
  function tiltCards() {
    var cards = document.querySelectorAll(".svc .card, .tools .card");
    Array.prototype.forEach.call(cards, function (c) {
      if (c.dataset.tilt) return; c.dataset.tilt = 1; c.classList.add("tilt");
      function move(e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        var press = e.pointerType !== "mouse" ? " scale(.98)" : " translateY(-3px)";
        c.style.transform = "perspective(700px) rotateX(" + (-y * 8).toFixed(2) + "deg) rotateY(" + (x * 10).toFixed(2) + "deg)" + press;
        c.classList.add("lift");
      }
      function reset() { c.style.transform = ""; c.classList.remove("lift"); }
      c.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") move(e); });
      c.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") move(e); });
      ["pointerleave", "pointerup", "pointercancel"].forEach(function (n) { c.addEventListener(n, reset); });
    });
  }
  tiltCards();
  // Cards are re-drawn when the language changes
  ["svc", "tools"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el && "MutationObserver" in window) new MutationObserver(tiltCards).observe(el, { childList: true });
  });

  // ---------- 3. Real 3D Mount Fuji ----------
  var fuji = null;
  function webglOK() { try { var c = document.createElement("canvas"); return !!(c.getContext("webgl") || c.getContext("experimental-webgl")); } catch (e) { return false; } }
  var conn = navigator.connection || {};
  if (!canvas || conn.saveData || !webglOK()) return;
  if (document.readyState === "complete") setTimeout(build, 400); else window.addEventListener("load", function () { setTimeout(build, 400); });

  // Plain WebGL (no library to download): a low-poly mountain with flat-coloured triangles.
  function build() {
    var gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;
    var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    // Rings of points from the base (r=2.3) to the crater (r=0.32), with bumps
    var SEG = 22, RINGS = 6, H = 2.1, rings = [];
    for (var j = 0; j <= RINGS; j++) {
      var h = j / RINGS, ring = [];
      for (var i = 0; i < SEG; i++) {
        var a = i / SEG * Math.PI * 2, r = 2.3 + (0.32 - 2.3) * Math.pow(h, 0.8), k = (j > 0 && j < RINGS) ? 1 + (rnd() - 0.5) * 0.14 : 1;
        ring.push([Math.cos(a) * r * k, h * H + ((j > 0 && j < RINGS) ? (rnd() - 0.5) * 0.08 : 0), Math.sin(a) * r * k]);
      }
      rings.push(ring);
    }
    var P = [], N = [], C = [];
    var SNOW = [1, 1, 1], MID = [0.62, 0.74, 0.84], ROCK = [0.5, 0.66, 0.78];
    function tri(p1, p2, p3, col) {
      var ux = p2[0] - p1[0], uy = p2[1] - p1[1], uz = p2[2] - p1[2], vx = p3[0] - p1[0], vy = p3[1] - p1[1], vz = p3[2] - p1[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.hypot(nx, ny, nz) || 1;
      [p1, p2, p3].forEach(function (p) { P.push(p[0], p[1], p[2]); N.push(nx / l, ny / l, nz / l); C.push(col[0], col[1], col[2]); });
    }
    for (var j2 = 0; j2 < RINGS; j2++) for (var i2 = 0; i2 < SEG; i2++) {
      var A = rings[j2][i2], B = rings[j2][(i2 + 1) % SEG], Cc = rings[j2 + 1][i2], D = rings[j2 + 1][(i2 + 1) % SEG];
      var hh = (j2 + 0.5) / RINGS, snowLine = 0.6 + (rnd() - 0.5) * 0.25;
      var col = hh > snowLine ? SNOW : (hh > 0.3 ? MID : ROCK);
      tri(A, Cc, B, col); tri(B, Cc, D, hh + 0.08 > snowLine ? SNOW : col);
    }
    var top = rings[RINGS], ctr = [0, H - 0.04, 0];                                   // snowy crater top
    for (var i3 = 0; i3 < SEG; i3++) tri(top[i3], ctr, top[(i3 + 1) % SEG], SNOW);

    function shader(type, src) { var sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; }
    var prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER,
      "attribute vec3 p;attribute vec3 n;attribute vec3 c;uniform mat4 m;uniform mat4 v;varying vec3 col;" +
      "void main(){vec3 nn=normalize((m*vec4(n,0.)).xyz);vec3 L=normalize(vec3(.55,.7,.45));" +
      "float d=max(dot(nn,L),0.);float sky=.5+.5*nn.y;col=c*(.42+.18*sky+.55*d)*vec3(1.,.98,.95);gl_Position=v*m*vec4(p,1.);}"));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, "precision mediump float;varying vec3 col;void main(){gl_FragColor=vec4(min(col,vec3(1.)),1.);}"));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    function buf(data, name) {
      var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    }
    buf(P, "p"); buf(N, "n"); buf(C, "c");
    var COUNT = P.length / 3, uM = gl.getUniformLocation(prog, "m"), uV = gl.getUniformLocation(prog, "v");
    gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE);

    function mul(a, b) { var o = new Float32Array(16); for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) { var s = 0; for (var k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; }
    function persp(fov, asp, nr, fr) { var f = 1 / Math.tan(fov / 2), x = new Float32Array(16); x[0] = f / asp; x[5] = f; x[10] = (fr + nr) / (nr - fr); x[11] = -1; x[14] = 2 * fr * nr / (nr - fr); return x; }
    function trans(x, y, z) { var m = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]); return m; }
    function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]); }
    function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]); }

    var view = null;
    function size() {
      var dpr = Math.min(2, window.devicePixelRatio || 1), w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (!w || !h) return;
      canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h);
      // camera a little above, looking slightly down at the mountain
      view = mul(persp(30 * Math.PI / 180, w / h, 0.1, 100), mul(rotX(0.1), trans(0, -2.05, -8.6)));
    }
    size(); window.addEventListener("resize", size);

    var on = true, last = 0, angle = 0.4, tiltX = 0, tiltY = 0, shown = false;
    function frame(t) {
      if (!on) return;
      var dt = Math.min(50, t - (last || t)); last = t; angle += dt * 0.00018;
      if (!view) size();
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(uV, false, view);
      gl.uniformMatrix4fv(uM, false, mul(rotX(tiltY * 0.05), rotY(angle + tiltX * 0.35)));
      gl.drawArrays(gl.TRIANGLES, 0, COUNT);
      if (!shown) { shown = true; canvas.classList.add("on"); var flat = document.getElementById("fuji2d"); if (flat) flat.classList.add("off"); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    fuji = {
      tilt: function (x, y) { tiltX = x; tiltY = y; },
      run: function (v) { if (v && !on) { on = true; last = 0; requestAnimationFrame(frame); } else if (!v) on = false; }
    };
  }
})();
