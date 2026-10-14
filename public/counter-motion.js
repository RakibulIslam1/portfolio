function ordinal(number) {
  if (number === 0) return '0';
  const lastTwo = number % 100;
  const ending = lastTwo >= 11 && lastTwo <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] || 'th');
  return number + ending;
}

// Accessible values stay final; only the decorative visible numbers count up.
export function animateCounters(elements) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const counters = [...elements].flatMap((element, index) => {
    const final = element.textContent;
    const match = final.match(/^(\d+)(.*)$/);
    if (!match || !Number.isSafeInteger(Number(match[1]))) return [];
    const number = document.createElement('span');
    number.className = 'counter-number';
    number.setAttribute('aria-hidden', 'true');
    const accessible = document.createElement('span');
    accessible.className = 'sr-only';
    accessible.textContent = final;
    element.replaceChildren(number, accessible);
    const suffix = match[2];
    const format = /^(st|nd|rd|th)$/.test(suffix) ? ordinal : value => value + suffix;
    const animate = element.dataset.animate !== 'false';
    number.textContent = preference.matches || !animate ? final : format(0);
    if (!animate) return [];
    return [{ number, final, target: Number(match[1]), format, delay: index * 70 }];
  });
  if (!counters.length || preference.matches) return;

  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  const duration = 1450;
  const end = duration + Math.max(...counters.map(counter => counter.delay));

  function finish() {
    cancelAnimationFrame(frame);
    for (const counter of counters) counter.number.textContent = counter.final;
    preference.removeEventListener('change', onPreference);
    document.removeEventListener('visibilitychange', onVisibility);
  }
  function tick(now) {
    if (previous) elapsed += Math.min(now - previous, 80);
    previous = now;
    for (const counter of counters) {
      const progress = Math.max(0, Math.min(1, (elapsed - counter.delay) / duration));
      const eased = 1 - (1 - progress) ** 3;
      counter.number.textContent = counter.format(Math.min(counter.target, Math.floor(counter.target * eased)));
    }
    if (elapsed >= end) finish();
    else frame = requestAnimationFrame(tick);
  }
  function onPreference() { if (preference.matches) finish(); }
  function onVisibility() {
    cancelAnimationFrame(frame);
    previous = 0;
    if (!document.hidden) frame = requestAnimationFrame(tick);
  }
  preference.addEventListener('change', onPreference);
  document.addEventListener('visibilitychange', onVisibility);
  if (!document.hidden) frame = requestAnimationFrame(tick);
}
