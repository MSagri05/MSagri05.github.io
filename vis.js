
document.addEventListener("DOMContentLoaded", () => {
    renderBarChart();
    renderCatFace();
  });
  
  /* ------
     1) HORIZONTAL BAR CHART — my weekly schedule
     - for loop decides the Y position (index-based)
     - width of bar = the hours number (converted to pixels)
    -------- */
  function renderBarChart() {
    // my hours for the week (very simple data)
    const data = [
      { label: "Work", hours: 30 },
      { label: "University", hours: 8 },
      { label: "Studying", hours: 18 },
      { label: "Leisure Activities", hours: 8 }
    ];
  
    // basic sizes for the svg
    const svgW = 700;
    const svgH = 220;
  
    // margins so text/bars don’t touch the edges
    const margin = { top: 20, right: 20, bottom: 20, left: 140 };
  
    // bar height and gap between bars
    const barH = 28;
    const gap = 12;
  
    // how many pixels does 1 hour equal (so bars are visible)
    const pxPerHour = 12; // 30h -> 360px width
  
    // make the SVG (nothing fancy)
    const svg = createSVG(svgW, svgH);
    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.background = "#ffffff";
    svg.style.border = "1px solid #e5e7eb";
  
    // title at top
    svg.appendChild(textEl(svgW / 2, margin.top, "My Weekly Schedule (hours)", "middle", 16, "#111", true));
  
    // loop through data and draw each bar
    for (let i = 0; i < data.length; i++) {
      // y position = top margin + (index * (barH + gap)) + a tiny offset
      const y = margin.top + 16 + i * (barH + gap);
  
      // width of bar = hours * pixels-per-hour
      const w = data[i].hours * pxPerHour;
  
      // x position is fixed (left margin) so we have room for labels
      const x = margin.left;
  
      // left-side label: just the activity name
      svg.appendChild(textEl(margin.left - 10, y + barH * 0.7, data[i].label, "end", 13, "#444"));
  
      // the bar itself (a simple rect)
      const bar = rect(x, y, w, barH, "#2563eb");
      svg.appendChild(bar);
  
      // value text at the end of the bar (e.g., "30h")
      const val = textEl(x + w + 6, y + barH * 0.7, data[i].hours + "h", "start", 12, "#333");
      svg.appendChild(val);
  
      // tiny interaction: when I hover, make it lighter; when I leave, go back
      bar.addEventListener("mouseenter", () => bar.setAttribute("fill", "#60a5fa"));
      bar.addEventListener("mouseleave", () => bar.setAttribute("fill", "#2563eb"));
    }
  
    // put the svg on the page (in the chart area)
    const wrap = document.getElementById("chart-wrap");
    wrap.innerHTML = ""; // clear first (in case I re-run)
    wrap.appendChild(svg);
  }
  
  /* ----
       CREATIVE SVG — very simple CAT FACE
     - just basic shapes (circle, triangles, lines)
     - hover to blink (eyes become lines)
     - click to change nose color
    ------ */
  function renderCatFace() {
    const w = 500;
    const h = 320;
  
    // make the SVG and style it a bit
    const svg = createSVG(w, h);
    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.background = "#f5f7fa";
    svg.style.border = "1px solid #e5e7eb";
  
    // title
    svg.appendChild(textEl(w / 2, 24, "Cat (hover = blink, click = new nose color)", "middle", 14, "#111", true));
  
    // face/head
    const face = circle(w / 2, h / 2 + 10, 90, "#ffe9c6", "#d6c2a3");
    svg.appendChild(face);
  
    // ears
    const leftEar = polygon(
      `${w / 2 - 80},${h / 2 - 20} ${w / 2 - 40},${h / 2 - 110} ${w / 2 - 10},${h / 2 - 10}`,
      "#ffe9c6",
      "#d6c2a3"
    );
    const rightEar = polygon(
      `${w / 2 + 80},${h / 2 - 20} ${w / 2 + 40},${h / 2 - 110} ${w / 2 + 10},${h / 2 - 10}`,
      "#ffe9c6",
      "#d6c2a3"
    );
    svg.appendChild(leftEar);
    svg.appendChild(rightEar);
  
    // eyes..open..two small circles
    const eyeL = circle(w / 2 - 35, h / 2 - 5, 8, "#111");
    const eyeR = circle(w / 2 + 35, h / 2 - 5, 8, "#111");
  
    // eyes ..closed
    const eyeLClosed = line(w / 2 - 45, h / 2 - 5, w / 2 - 25, h / 2 - 5, "#111", 3);
    const eyeRClosed = line(w / 2 + 45, h / 2 - 5, w / 2 + 25, h / 2 - 5, "#111", 3);
    eyeLClosed.style.display = "none";
    eyeRClosed.style.display = "none";
  
    svg.appendChild(eyeL);
    svg.appendChild(eyeR);
    svg.appendChild(eyeLClosed);
    svg.appendChild(eyeRClosed);
  
    // nose +  mouth 
    const nose = triangle(w / 2, h / 2 + 15, 12, "#e86d6d");
    const mouthL = path(`M ${w / 2 - 8} ${h / 2 + 28} Q ${w / 2 - 2} ${h / 2 + 34} ${w / 2} ${h / 2 + 34}`, "#111", 2);
    const mouthR = path(`M ${w / 2} ${h / 2 + 34} Q ${w / 2 + 2} ${h / 2 + 34} ${w / 2 + 8} ${h / 2 + 28}`, "#111", 2);
    svg.appendChild(nose);
    svg.appendChild(mouthL);
    svg.appendChild(mouthR);
  
    // whiskers...3 left, 3 right
    svg.appendChild(line(w / 2 - 60, h / 2 + 16, w / 2 - 20, h / 2 + 16, "#111", 2));
    svg.appendChild(line(w / 2 - 60, h / 2 + 22, w / 2 - 20, h / 2 + 20, "#111", 2));
    svg.appendChild(line(w / 2 - 60, h / 2 + 28, w / 2 - 20, h / 2 + 24, "#111", 2));
    svg.appendChild(line(w / 2 + 20, h / 2 + 16, w / 2 + 60, h / 2 + 16, "#111", 2));
    svg.appendChild(line(w / 2 + 20, h / 2 + 20, w / 2 + 60, h / 2 + 22, "#111", 2));
    svg.appendChild(line(w / 2 + 20, h / 2 + 24, w / 2 + 60, h / 2 + 28, "#111", 2));
  
    // INTERACTION #1: when I hover over the cat, it "blinks"
    svg.addEventListener("mouseenter", () => {
      eyeL.style.display = "none";
      eyeR.style.display = "none";
      eyeLClosed.style.display = "block";
      eyeRClosed.style.display = "block";
    });
    svg.addEventListener("mouseleave", () => {
      eyeL.style.display = "block";
      eyeR.style.display = "block";
      eyeLClosed.style.display = "none";
      eyeRClosed.style.display = "none";
    });
  
    // INTERACTION #2: click to change the nose color randomly
    svg.addEventListener("click", () => {
      const colors = ["#e86d6d", "#ff9cad", "#f79d65", "#7dd3fc", "#a3e635"];
      const pick = colors[Math.floor(Math.random() * colors.length)];
      nose.setAttribute("fill", pick);
    });

    const art = document.getElementById("art-wrap");
    art.innerHTML = ""; 
    art.appendChild(svg);
  }
  

//helper functions
  function createSVG(w, h) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    return s;
  }
  
  function rect(x, y, w, h, fill = "#ccc") {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r.setAttribute("x", x);
    r.setAttribute("y", y);
    r.setAttribute("width", w);
    r.setAttribute("height", h);
    r.setAttribute("fill", fill);
    return r;
  }
  
  function circle(cx, cy, r, fill = "#000", stroke = "none") {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", cx);
    c.setAttribute("cy", cy);
    c.setAttribute("r", r);
    c.setAttribute("fill", fill);
    if (stroke !== "none") c.setAttribute("stroke", stroke);
    return c;
  }
  
  function line(x1, y1, x2, y2, stroke = "#000", sw = 1) {
    const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
    ln.setAttribute("x1", x1);
    ln.setAttribute("y1", y1);
    ln.setAttribute("x2", x2);
    ln.setAttribute("y2", y2);
    ln.setAttribute("stroke", stroke);
    ln.setAttribute("stroke-width", sw);
    return ln;
  }
  
  function textEl(x, y, str, anchor = "start", size = 12, fill = "#000", bold = false) {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.setAttribute("text-anchor", anchor);
    t.setAttribute("font-size", size);
    t.setAttribute("fill", fill);
    if (bold) t.setAttribute("font-weight", "700");
    t.textContent = str;
    return t;
  }
  
  function polygon(pointsStr, fill = "#ccc", stroke = "none") {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    p.setAttribute("points", pointsStr);
    p.setAttribute("fill", fill);
    if (stroke !== "none") p.setAttribute("stroke", stroke);
    return p;
  }
  
  function path(d, stroke = "#000", sw = 1) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", stroke);
    p.setAttribute("stroke-width", sw);
    return p;
  }
  
  function triangle(cx, cy, size, fill = "#000") {
    // tiny downward triangle (I use it as a nose)
    const half = size / 2;
    const points = `${cx - half},${cy - half} ${cx + half},${cy - half} ${cx},${cy + half}`;
    return polygon(points, fill);
  }
  